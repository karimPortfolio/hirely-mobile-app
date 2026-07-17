import { SearchFiltersBar } from "@/components/filters/SearchFiltersBar";
import { Header } from "@/components/header/Header";
import { PageLayout } from "@/components/PageLayout";
import { NearbyJobs } from "@/features/jobs/components/NearbyJobs";
import { SuggestedJobs } from "@/features/jobs/components/SuggestedJobs";
import { usePublicJobsList } from "@/features/jobs/hooks/usePublicJobsList";
import { useUserCountry } from "@/hooks/useUserCountry";
import { useEffect } from "react";

export default function HomeScreen() {
  const {
    jobs,
    nearbyJobs,
    fetchNearbyJobs,
    refetch,
    loading,
    loadingNearbyJobs,
    query,
    setQuery,
  } = usePublicJobsList({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    order: "desc",
  });

  const { countryName, isLoading } = useUserCountry("usa");

  useEffect(() => {
    if (!isLoading && countryName) {
      fetchNearbyJobs(countryName);
    }
  }, [countryName, isLoading, setQuery]);

  return (
    <PageLayout>
      <Header />
      <SearchFiltersBar setQuery={setQuery} query={query} loading={loading} />
      <SuggestedJobs jobs={jobs} refetch={refetch} loading={loading} />
      <NearbyJobs jobs={nearbyJobs} loading={loadingNearbyJobs} />
    </PageLayout>
  );
}
