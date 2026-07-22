import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { VStack } from "@/components/ui/vstack";
import { cn } from "@/lib/utils";
import { BriefcaseBusiness, Globe, MapPin } from "lucide-react-native";
import { useMemo } from "react";
import { Text, useColorScheme, View } from "react-native";
import { APPLICATION_STATUSES } from "../constants/applied-jobs.constants";
import { AppliedJob } from "../types/applied-jobs.type";

const formatEmploymentType = (value: AppliedJob["job"]["employmentType"]) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");

const formatSalaryRange = (salaryMin?: number, salaryMax?: number) => {
  if (!salaryMin || !salaryMax) return "Salary not specified";
  return `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()} per year`;
};

interface JobCardProps {
  appliedJob: AppliedJob;
  className?: string;
}

export function AppliedJobCard({
  appliedJob,
  className,
}: JobCardProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const job = appliedJob.job;

  const applicationStatus = useMemo(() => {
    const foundedStatus = APPLICATION_STATUSES.find(
      (s) => s.value === appliedJob.status,
    );
    return foundedStatus;
  }, [APPLICATION_STATUSES, appliedJob]);

  return (
    <Card
      className={cn(
        "min-w-96 max-w-110 shadow-none bg-white dark:bg-zinc-900 border-0",
        className,
      )}
      size="default"
    >
      <Box className="flex flex-row items-start justify-between">
        <VStack>
          <Heading size="md">{job.title}</Heading>
          <Text className="text-gray-600 dark:text-gray-400">
            {job.company?.name}
          </Text>
        </VStack>
        <Box className="pt-2">
          <View
            className={cn(
              "p-1 px-3 rounded-md",
              applicationStatus && applicationStatus.bgColorClass,
            )}
          >
            {applicationStatus && (
              <Text
                className={cn(
                  "font-medium text-sm",
                  applicationStatus.textColorClass,
                )}
              >
                {applicationStatus.label}
              </Text>
            )}
            {!applicationStatus && <Text>Draft</Text>}
          </View>
        </Box>
      </Box>
      <Box className="flex flex-row flex-wrap items-center gap-3">
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
      <Box className="flex flex-row items-center justify-between">
        <Text className="font-medium text-black dark:text-white">
          {formatSalaryRange(job.salaryMin, job.salaryMax)}
        </Text>
        {/* <Badge variant="outline" className="flex flex-row items-center gap-2">
          <Paperclip size={13} />
          <Text className="text-sm">Attached resume</Text>
        </Badge> */}
      </Box>
      <Box>
        <Text className="text-sm text-gray-600 dark:text-gray-400">
          Applied {appliedJob.createdAtDiff}
        </Text>
      </Box>
    </Card>
  );
}
