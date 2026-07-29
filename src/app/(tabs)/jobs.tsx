import { SearchFiltersBar } from "@/components/filters/SearchFiltersBar";
import { Header } from "@/components/header/Header";
import { TabsScreenLayout } from "@/components/TabsScreenLayout";
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";
import { JobCard } from "@/features/jobs/components/JobCard";
import { JobsList } from "@/features/jobs/components/JobsList";
import { DEPARTMENTS } from "@/features/jobs/constants/job-constants";
import { usePublicJobsList } from "@/features/jobs/hooks/usePublicJobsList";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function JobsScreen() {
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

  const [activeDepartment, setActiveDepartment] = useState<string>("All");

  const handleFilterWithDepartment = useCallback(
    (department: string) => {
      if (activeDepartment === department) return;

      setQuery({
        ...query,
        department,
        page: 1,
      });
      setActiveDepartment(department);
    },
    [query, activeDepartment],
  );

  const clearDepartmentFilter = useCallback(() => {
    if (activeDepartment === "All") return;

    setQuery({
      ...query,
      department: undefined,
      page: 1,
    });
    setActiveDepartment("All");
  }, [query, activeDepartment]);

  return (
    <TabsScreenLayout>
      <Header />
      <SearchFiltersBar setQuery={setQuery} query={query} loading={loading} />
      <Box className="pt-5">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {DEPARTMENTS.map((item: string) => (
            <ListItem
              key={item}
              item={item}
              activeDepartment={activeDepartment}
              handleFilterWithDepartment={handleFilterWithDepartment}
              clearDepartmentFilter={clearDepartmentFilter}
            />
          ))}
        </ScrollView>
      </Box>
      <JobsList
        jobs={jobs}
        loadMore={loadMore}
        loading={loading}
        loadingMore={loadingMore}
        refetch={refetch}
      />
    </TabsScreenLayout>
  );
}

const ListItem = ({
  activeDepartment,
  item,
  handleFilterWithDepartment,
  clearDepartmentFilter,
}: {
  activeDepartment: string;
  item: string;
  handleFilterWithDepartment: (department: string) => void;
  clearDepartmentFilter: () => void;
}) => {
  return (
    <TouchableOpacity
      className={cn(
        "mr-3 p-2 px-4 rounded-full",
        activeDepartment === item ? "bg-primary" : "bg-white dark:bg-zinc-900",
      )}
      onPress={
        item === "All"
          ? clearDepartmentFilter
          : () => handleFilterWithDepartment(item)
      }
    >
      <Text
        className={cn(
          activeDepartment === item
            ? "text-white"
            : "text-black dark:text-white",
        )}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
};
