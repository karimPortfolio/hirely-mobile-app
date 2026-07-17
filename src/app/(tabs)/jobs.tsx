import { SearchFiltersBar } from "@/components/filters/SearchFiltersBar";
import { Header } from "@/components/header/Header";
import { PageLayout } from "@/components/PageLayout";
import { Box } from "@/components/ui/box";
import { Spinner } from "@/components/ui/spinner";
import { JobCard } from "@/features/jobs/components/JobCard";
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

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View className="py-4 justify-center items-center">
        <Spinner size="small" color="#2550ad" />
      </View>
    );
  };

  return (
    <PageLayout>
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
      <FlatList
        data={jobs}
        renderItem={({ item }) => (
          <JobCard
            job={item}
            refetch={refetch}
            refetching={loading}
            className="!max-w-full mb-5"
          />
        )}
        keyExtractor={(item) => item._id}
        onEndReached={loadMore}
        onEndReachedThreshold={0.3}
        scrollEnabled
        showsVerticalScrollIndicator={false}
        className="mt-5 grow-0 w-full"
        ListFooterComponent={renderFooter}
      />
    </PageLayout>
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
