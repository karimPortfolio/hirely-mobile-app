import { SearchFiltersBar } from "@/components/filters/SearchFiltersBar";
import { Header } from "@/components/header/Header";
import { PageLayout } from "@/components/PageLayout";
import { usePublicJobsList } from "@/features/jobs/hooks/usePublicJobsList";

export default function SavedScreen() {
  const { jobs, refetch, loading, loadingMore, loadMore, query, setQuery } =
    usePublicJobsList(
      {
        page: 1,
        limit: 5,
        sortBy: "createdAt",
        order: "desc",
      },
      { infiniteScroll: true },
    );
  return (
    <PageLayout>
      <Header />
      <SearchFiltersBar setQuery={setQuery} query={query} loading={loading} />
    </PageLayout>
  );
}
