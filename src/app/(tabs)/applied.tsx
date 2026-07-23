import { SearchFiltersBar } from "@/components/filters/SearchFiltersBar";
import { Header } from "@/components/header/Header";
import { TabsScreenLayout } from "@/components/TabsScreenLayout";
import { Box } from "@/components/ui/box";
import { AppliedJobsList } from "@/features/applied-jobs/components/AppliedJobsList";
import { APPLICATION_STATUSES } from "@/features/applied-jobs/constants/applied-jobs.constants";
import { useAppliedJobsList } from "@/features/applied-jobs/hooks/useAppliedJobsList";
import { ApplicationStatus } from "@/features/applied-jobs/types/applied-jobs.type";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import { ScrollView, Text, TouchableOpacity } from "react-native";

export default function AppliedScreen() {
  const { appliedJobs, loading, loadingMore, loadMore, query, setQuery } =
    useAppliedJobsList(
      {
        page: 1,
        limit: 5,
        sortBy: "createdAt",
        order: "desc",
      },
      { infiniteScroll: true },
    );

  const [activeStatus, setActiveStatus] = useState<string>("all");

  const handleFilterWithStatus = useCallback(
    (status: string) => {
      if (activeStatus === status) return;

      setQuery({
        ...query,
        status,
        page: 1,
      });
      setActiveStatus(status);
    },
    [query, activeStatus],
  );

  const clearStatusFilter = useCallback(() => {
    if (activeStatus === "All") return;

    setQuery({
      ...query,
      status: undefined,
      page: 1,
    });
    setActiveStatus("all");
  }, [query, activeStatus]);

  return (
    <TabsScreenLayout>
      <Header />
      <SearchFiltersBar
        setQuery={setQuery}
        query={query}
        loading={loading}
        showFilters={false}
        customSearchKey="job_search"
      />
      <Box className="pt-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {APPLICATION_STATUSES.map((item: ApplicationStatus) => (
            <ListItem
              key={item.value}
              item={item}
              activeStatus={activeStatus}
              handleFilterWithStatus={handleFilterWithStatus}
              clearStatusFilter={clearStatusFilter}
            />
          ))}
        </ScrollView>
      </Box>

      <AppliedJobsList
        appliedJobs={appliedJobs}
        loadMore={loadMore}
        loading={loading}
        loadingMore={loadingMore}
      />
    </TabsScreenLayout>
  );
}

const ListItem = ({
  activeStatus,
  item,
  handleFilterWithStatus,
  clearStatusFilter,
}: {
  activeStatus: string;
  item: ApplicationStatus;
  handleFilterWithStatus: (status: string) => void;
  clearStatusFilter: () => void;
}) => {
  return (
    <TouchableOpacity
      className={cn(
        "mr-3 p-2 px-4 rounded-full",
        activeStatus === item.value
          ? "bg-primary"
          : "bg-white dark:bg-zinc-900",
      )}
      onPress={
        item.value === "all"
          ? clearStatusFilter
          : () => handleFilterWithStatus(item.value)
      }
    >
      <Text
        className={cn(
          activeStatus === item.value
            ? "text-white"
            : "text-black dark:text-white",
        )}
      >
        {item.label}
      </Text>
    </TouchableOpacity>
  );
};
