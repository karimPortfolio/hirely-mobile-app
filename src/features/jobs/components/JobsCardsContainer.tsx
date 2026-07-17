import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { memo } from "react";
import { ScrollView, Text } from "react-native";
import { Job } from "../types/jobs.types";
import { JobCard } from "./JobCard";

interface JobsCardsContainerProps {
  jobs: Job[];
  loading: boolean;
  refetch: () => void;
}

export function JobsCardsContainer({
  jobs,
  loading,
  refetch,
}: JobsCardsContainerProps) {
  if (loading) {
    return <JobLoadingSkeleton />;
  }

  if (!jobs || !jobs.length) {
    return (
      <Box>
        <Card className="w-full shadow-none">
          <Text className="font-medium text-lg text-center text-black dark:text-white">
            No jobs found
          </Text>
          <Text className="text-gray-600 dark:text-gray-400 text-center">
            Try changing your search or filters to discover more roles.
          </Text>
        </Card>
      </Box>
    );
  }

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Box className="flex flex-row items-center gap-4">
        {jobs?.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            refetch={refetch}
            refetching={loading}
          />
        ))}
      </Box>
    </ScrollView>
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
