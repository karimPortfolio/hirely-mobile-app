import { Box } from "@/components/ui/box";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { Text } from "react-native";
import { Job } from "../types/jobs.types";
import { JobsCardsContainer } from "./JobsCardsContainer";

export function NearbyJobs({
  jobs,
  loading,
}: {
  jobs: Job[];
  loading: boolean;
}) {
  return (
    <VStack space="md" className="mt-5 px-1">
      <Box className="flex flex-row items-center justify-between">
        <Text className="text-lg font-semibold text-black dark:text-white">
          Nearby Jobs
        </Text>
        <Link href={{ pathname: "/jobs" }}>
          <Text className="text-primary font-medium">See all</Text>
        </Link>
      </Box>

      <JobsCardsContainer jobs={jobs} loading={loading} />
    </VStack>
  );
}
