import { StackScreenLayout } from "@/components/StackScreenLayout";
import { TabsScreenLayout } from "@/components/TabsScreenLayout";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { CreateApplicationForm } from "@/features/applications/components/CreateApplicationForm";
import { ScreenHeader } from "@/features/job-details/components/ScreenHeader";
import { usePublicJobActions } from "@/features/jobs/hooks/usePublicJobsActions";
import { Job } from "@/features/jobs/types/jobs.types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { memo, useCallback, useEffect, useState } from "react";
import { ScrollView, Text } from "react-native";

export default function JobApplyScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findJob, loading, clearApiError } = usePublicJobActions();
  const [job, setJob] = useState<Job | null>(null);
  const router = useRouter();

  const fetchJob = useCallback(async () => {
    clearApiError();
    try {
      const data = await findJob(id);
      setJob(data);
    } catch (err) {}
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [id]);

  if (loading) {
    return (
      <TabsScreenLayout>
        <ScreenHeader job={null} loading={loading} onPress={router.back} />
        <Box className="flex-1 items-center justify-center">
          <Spinner size="large" color="#2550ad" />
        </Box>
      </TabsScreenLayout>
    );
  }

  if (!job) {
    return (
      <TabsScreenLayout>
        <ScreenHeader job={null} loading={loading} onPress={router.back} />
        <JobFallbackComponent />
      </TabsScreenLayout>
    );
  }

  return (
    <StackScreenLayout>
      <ScreenHeader job={job} loading={loading} onPress={router.back} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-10 p-4 flex-1 bg-white dark:bg-zinc-900 rounded-4xl"
      >
        <CreateApplicationForm job={job} />
      </ScrollView>
    </StackScreenLayout>
  );
}

const JobFallbackComponent = memo(() => (
  <Box className="mt-5">
    <Card className="w-full shadow-none">
      <Text className="font-medium text-lg text-center text-black dark:text-white">
        No job found
      </Text>
      <Text className="text-gray-600 dark:text-gray-400 text-center">
        Try changing your search or filters to discover more roles.
      </Text>
    </Card>
  </Box>
));
