import { PaginatedResponse, JobQuery } from "@/features/jobs/types/jobs.types";
import { useCallback, useEffect, useRef, useState } from "react";
import { useApiError } from "@/hooks/useApiError";
import { AppliedJob } from "../types/applied-jobs.type";
import { getAppliedJobs } from "../services/applied-jobs.service";

interface UseAppliedJobsListOptions {
  infiniteScroll?: boolean;
}

export function useAppliedJobsList(
  initialQuery?: JobQuery,
  options?: UseAppliedJobsListOptions,
) {
  const isInfiniteScrollEnabled = options?.infiniteScroll ?? false;

  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [data, setData] = useState<PaginatedResponse<AppliedJob> | null>(null);
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
        const res = await getAppliedJobs(query);
        const freshDocs = res.data?.docs ?? [];

        if (isInfiniteScrollEnabled && !isInitialPage) {
          setAppliedJobs((prev) => [...prev, ...freshDocs]);
        } else {
          setAppliedJobs(freshDocs);
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

  const refetch = useCallback(async () => {
    lastFetchKeyRef.current = null;
    return await getAppliedJobs({ ...queryRef.current, page: 1 }).then((res) => {
      setAppliedJobs(res.data?.docs ?? []);
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
    appliedJobs,
    meta: data,
    loading,
    loadingMore,

    query,
    setQuery,
    loadMore,
    refetch,
  };
}
