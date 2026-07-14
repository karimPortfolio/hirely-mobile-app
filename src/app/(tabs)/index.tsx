import { SearchFiltersBar } from "@/components/filters/SearchFiltersBar";
import { Header } from "@/components/header/Header";
import { PageLayout } from "@/components/PageLayout";
import { SuggestedJobs } from "@/features/jobs/components/SuggestedJobs";
import { usePublicJobsList } from "@/features/jobs/hooks/usePublicJobsList";

export default function HomeScreen() {
  const { jobs, loading, query, setQuery } = usePublicJobsList({
    page: 1,
    limit: 10,
    sortBy: "createdAt",
    order: "desc",
  });

  return (
    <PageLayout>
      <Header />
      <SearchFiltersBar setQuery={setQuery} query={query} />
      <SuggestedJobs jobs={jobs} loading={loading} />
    </PageLayout>
  );
}
