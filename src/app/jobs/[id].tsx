import { StackScreenLayout } from "@/components/StackScreenLayout";
import { TabsScreenLayout } from "@/components/TabsScreenLayout";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { ScreenHeader } from "@/features/job-details/components/ScreenHeader";
import { usePublicJobActions } from "@/features/jobs/hooks/usePublicJobsActions";
import { Job } from "@/features/jobs/types/jobs.types";
import { useLocalSearchParams, useRouter } from "expo-router";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  ScrollView,
  Text,
  useColorScheme,
  useWindowDimensions,
} from "react-native";
import {
  Bookmark,
  BriefcaseBusiness,
  Globe,
  MapPin,
} from "lucide-react-native";
import { Badge, BadgeText } from "@/components/ui/badge";
import RenderHtml, { MixedStyleDeclaration } from "react-native-render-html";
import { Button, ButtonText } from "@/components/ui/button";
import { JobDetailsLoading } from "@/features/job-details/components/JobDetailsLoading";
import { LoadingButton } from "@/components/common/LoadingButton";

const formatEmploymentType = (value: Job["employmentType"]) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");

const formatSalaryRange = (salaryMin?: number, salaryMax?: number) => {
  if (!salaryMin || !salaryMax) return "Salary not specified";
  return `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()}`;
};

export default function JobDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { findJob, savePublicJob, unsavePublicJob, loading, clearApiError } =
    usePublicJobActions();
  const [job, setJob] = useState<Job | null>(null);
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { width } = useWindowDimensions();
  const isDark = colorScheme === "dark";

  const fetchJob = useCallback(async () => {
    clearApiError();
    try {
      const data = await findJob(id);
      console.log("New Data:", data);
      setJob(data);
    } catch (err) {}
  }, [id]);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const bookmarkIcon = useMemo(() => {
    if (!job || loading) return null;

    if (job.saved) {
      return <Bookmark size={20} fill="#2550ad" stroke="#2550ad" />;
    }

    return <Bookmark size={20} color={"gray"} />;
  }, [job, loading]);

  const saveOrUnsaveJob = useCallback(async () => {
    if (!job || loading) return;

    const id = job._id;
    if (job.saved) {
      await unsavePublicJob(id);
    } else {
      await savePublicJob(id);
    }
    await fetchJob();
  }, [job, loading]);

  const tagsStyles = useMemo<Record<string, MixedStyleDeclaration>>(() => {
    const textColor = isDark ? "#E5E7EB" : "#374151";
    const headingColor = isDark ? "#FFFFFF" : "#111827";
    const linkColor = isDark ? "#60A5FA" : "#2563EB";

    return {
      body: {
        color: textColor,
        fontSize: 16,
        lineHeight: 24,
      },
      p: {
        marginBottom: 12,
        color: textColor,
      },
      h1: {
        fontSize: 22,
        fontWeight: "700",
        color: headingColor,
        marginTop: 16,
        marginBottom: 8,
      },
      h2: {
        fontSize: 18,
        fontWeight: "600",
        color: headingColor,
        marginTop: 14,
        marginBottom: 6,
      },
      ul: {
        marginBottom: 12,
      },
      li: {
        fontSize: 15,
        color: textColor,
        marginBottom: 4,
      },
      a: {
        color: linkColor,
        textDecorationLine: "none",
      },
      strong: {
        color: headingColor,
        fontWeight: "600",
      },
    };
  }, [isDark]);

  if (loading) {
    return <JobDetailsLoading />;
  }

  if (!job) {
    return (
      <TabsScreenLayout>
        <ScreenHeader job={null} loading={loading} onPress={router.back} />
        <JobFallbackComponent />
      </TabsScreenLayout>
    );
  }

  const source = {
    html: job.description || "<p>No description available.</p>",
  };

  return (
    <StackScreenLayout>
      <ScreenHeader job={job} loading={loading} onPress={router.back} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="mt-10 p-4 flex-1 bg-white dark:bg-zinc-900 rounded-4xl"
      >
        <Text className="text-black dark:text-white text-center text-3xl font-medium mt-2 mb-4">
          {job.title}
        </Text>
        <Box className="flex flex-row items-center justify-center mb-4">
          <Text className="text-gray-600 dark:text-gray-400 text-lg">
            {formatSalaryRange(job.salaryMin, job.salaryMax)}
          </Text>
        </Box>
        <Box className="flex flex-row flex-wrap items-center justify-center gap-3 mb-6">
          <Badge variant="default" className="rounded-full p-1 px-3">
            <BadgeText>{job.experienceLevel}</BadgeText>
          </Badge>
          <Badge variant="outline" className="rounded-full p-1 px-3 gap-2">
            <BriefcaseBusiness size={15} color={isDark ? "white" : "black"} />
            <BadgeText>{formatEmploymentType(job.employmentType)}</BadgeText>
          </Badge>
          {job.country && !job.isRemote && (
            <Badge variant="outline" className="rounded-full p-1 px-3 gap-2">
              <MapPin size={15} color={isDark ? "white" : "black"} />
              <BadgeText>{job.country}</BadgeText>
            </Badge>
          )}
          {job.isRemote && (
            <Badge variant="outline" className="rounded-full p-1 px-3 gap-2">
              <Globe size={15} color={isDark ? "white" : "black"} />
              <BadgeText>Remote</BadgeText>
            </Badge>
          )}
        </Box>
        <Box className="p-3">
          <Text className="text-xl font-medium text-black dark:text-white mb-2">
            Description
          </Text>
          <RenderHtml
            contentWidth={width}
            source={source}
            tagsStyles={tagsStyles}
          />
        </Box>
        <Box className="flex flex-row items-center gap-2 mb-14">
          <LoadingButton
            isLoading={loading}
            variant="outline"
            className="w-11 h-11 rounded-lg flex flex-row items-center"
            onPress={saveOrUnsaveJob}
          >
            {bookmarkIcon}
          </LoadingButton>
          <Button className="flex-1 py-3">
            <ButtonText className="text-md font-medium">Apply Now</ButtonText>
          </Button>
        </Box>
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
