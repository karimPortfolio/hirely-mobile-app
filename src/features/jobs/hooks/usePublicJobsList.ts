import { useApiError } from "@/hooks/useApiError";
import { useCallback, useEffect, useRef, useState } from "react";
import { getPublicJobs } from "../services/jobs.service";
import { Job, JobQuery, PaginatedResponse } from "../types/jobs.types";

interface UsePublicJobsListOptions {
  infiniteScroll?: boolean;
}

export function usePublicJobsList(
  initialQuery?: JobQuery,
  options?: UsePublicJobsListOptions, 
) {
  const isInfiniteScrollEnabled = options?.infiniteScroll ?? false;

  const [jobs, setJobs] = useState<Job[]>([]);
  const [data, setData] = useState<PaginatedResponse<Job> | null>(null);
  const [nearbyJobs, setNearbyJobs] = useState<PaginatedResponse<Job> | null>(
    null,
  );

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingNearbyJobs, setLoadingNearbyJobs] = useState(false);
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
        const res = await getPublicJobs(query);
        const freshDocs = res.data?.docs ?? [];

        if (isInfiniteScrollEnabled && !isInitialPage) {
          setJobs((prev) => [...prev, ...freshDocs]);
        } else {
          setJobs(freshDocs);
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
    return getPublicJobs({ ...queryRef.current, page: 1 })
      .then((res) => {
        setJobs(res.data?.docs ?? []);
        setData(res.data);
        return res;
      })
      .catch((err) => handleError(err));
  }, []);

  const fetchNearbyJobs = async (country: string) => {
    setLoadingNearbyJobs(true);
    try {
      queryRef.current = { ...queryRef.current, country };
      const res = await getPublicJobs(queryRef.current);
      setNearbyJobs(res.data);
      queryRef.current = query;
    } catch (err) {
      handleError(err);
    } finally {
      setLoadingNearbyJobs(false);
    }
  };

  // Safely triggers pagination
  const loadMore = useCallback(() => {
    // If infinite scroll is disabled on this screen, do absolutely nothing
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
    jobs,
    nearbyJobs: nearbyJobs?.docs ?? [],
    meta: data,
    loading,
    loadingMore,
    loadingNearbyJobs,

    query,
    setQuery,
    refetch,
    loadMore,
    fetchNearbyJobs,
  };
}
