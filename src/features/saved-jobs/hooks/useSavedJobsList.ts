import { PaginatedResponse, JobQuery } from "@/features/jobs/types/jobs.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { getSavedJobs } from "../services/saved-jobs.service";
import { SavedJob } from "../types/saved-jobs.type";
import { useApiError } from "@/hooks/useApiError";

interface UsePublicJobsListOptions {
  infiniteScroll?: boolean;
}

export function useSavedJobsList(
  initialQuery?: JobQuery,
  options?: UsePublicJobsListOptions,
) {
  const isInfiniteScrollEnabled = options?.infiniteScroll ?? false;

  const [savedJobs, setSavedJobs] = useState<SavedJob[]>([]);
  const [data, setData] = useState<PaginatedResponse<SavedJob> | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const { error, clearError, handleError } = useApiError();

  const [query, setQuery] = useState<JobQuery>({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    order: "desc",
    ...initialQuery,
  });

  const lastFetchKeyRef = useRef<string | null>(null);
  const queryRef = useRef(query);

  useEffect(() => {
    queryRef.current = query;
  }, [query]);

  useEffect(() => {
    const key = JSON.stringify(query);
    if (lastFetchKeyRef.current === key) return;
    lastFetchKeyRef.current = key;

    const fetchJobs = async () => {
      const isInitialPage = (query.page ?? 1) === 1;

      if (isInfiniteScrollEnabled) {
        if (isInitialPage) {
          setLoading(true);
        } else {
          setLoadingMore(true);
        }
      } else {
        setLoading(true);
      }

      try {
        const res = await getSavedJobs(query);
        const freshDocs = res.data?.docs ?? [];

        if (isInfiniteScrollEnabled && !isInitialPage) {
          setSavedJobs((prev) => [...prev, ...freshDocs]);
        } else {
          setSavedJobs(freshDocs);
        }

        setData(res.data);
      } catch (err) {
        handleError(err);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };

    fetchJobs();
  }, [query, isInfiniteScrollEnabled]);

  const refetch = useCallback(() => {
    lastFetchKeyRef.current = null;
    return getSavedJobs({ ...queryRef.current, page: 1 }).then((res) => {
      setSavedJobs(res.data?.docs ?? []);
      setData(res.data);
      return res;
    })
    .catch((err) => handleError(err));
  }, []);

  const loadMore = useCallback(() => {
    if (!isInfiniteScrollEnabled) return;

    if (loading || loadingMore) return;

    const hasMore = data ? data.hasNextPage : false;
    if (!hasMore) return;

    setQuery((prev) => ({
      ...prev,
      page: (prev.page ?? 1) + 1,
    }));
  }, [loading, loadingMore, data, isInfiniteScrollEnabled]);

  return {
    savedJobs,
    meta: data,
    loading,
    loadingMore,

    query,
    setQuery,
    loadMore,
    refetch,
  };
}
