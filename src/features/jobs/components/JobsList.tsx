import { FlatList, Text, View } from "react-native";
import { Spinner } from "@/components/ui/spinner";
import { memo } from "react";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Job } from "../types/jobs.types";
import { JobCard } from "./JobCard";

interface JobsListProps {
  jobs: Job[];
  loadingMore: boolean;
  loading: boolean;
  loadMore: () => void;
  refetch: () => void;
}

export function JobsList({
  jobs,
  loadingMore,
  loading,
  loadMore,
  refetch,
}: JobsListProps) {
  if (loading) {
    return <JobLoadingSkeleton />;
  }

  if (!Array.isArray(jobs) || !jobs.length) {
    return <JobsFallbackComponent />;
  }

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View className="py-4 justify-center items-center">
        <Spinner size="small" color="#2550ad" />
      </View>
    );
  };

  return (
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
  );
}

const JobLoadingSkeleton = memo(() => (
  <Box className="p-3 border border-gray-200 dark:border-zinc-900 rounded-2xl">
    <HStack space="xs" className="align-middle">
      <Skeleton
        variant="circular"
        className="h-7.5 w-7.5 mr-2 bg-gray-200 dark:bg-zinc-900"
      />
      <SkeletonText
        _lines={2}
        gap={1}
        className="h-4 w-2/5 bg-gray-200 dark:bg-zinc-900"
      />
    </HStack>
    <Skeleton
      variant="sharp"
      className="h-25 bg-gray-200 dark:bg-zinc-900 mt-4"
    />
  </Box>
));

const JobsFallbackComponent = memo(() => (
  <Box className="mt-5">
    <Card className="w-full shadow-none">
      <Text className="font-medium text-lg text-center text-black dark:text-white">
        No jobs found
      </Text>
      <Text className="text-gray-600 dark:text-gray-400 text-center">
        Try changing your search or filters to discover more roles.
      </Text>
    </Card>
  </Box>
));
