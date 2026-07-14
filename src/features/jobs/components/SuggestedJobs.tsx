import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { memo } from "react";
import { ScrollView, Text, useColorScheme } from "react-native";
import { Job } from "../types/jobs.types";
import { SuggestedJobCard } from "./SuggestedJobCard";

export function SuggestedJobs({
  jobs,
  loading,
}: {
  jobs: Job[];
  loading: boolean;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  if (loading) {
    return <JobLoadingSkeleton />;
  }

  return (
    <VStack space="md" className="mt-5 px-1">
      <Box className="flex flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-black dark:text-white">
          Suggested Jobs
        </Text>
        <Link href={{ pathname: "/jobs" }}>
          <Text className="text-primary font-medium">See all</Text>
        </Link>
      </Box>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Box className="flex flex-row items-center gap-4">
          {jobs?.map((job) => (
            <SuggestedJobCard job={job} loading={loading} key={job.id} />
          ))}
        </Box>
      </ScrollView>
    </VStack>
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
