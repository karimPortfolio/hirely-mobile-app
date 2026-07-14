import { Badge, BadgeText } from "@/components/ui/badge";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { VStack } from "@/components/ui/vstack";
import {
    Bookmark,
    BriefcaseBusiness,
    Globe,
    MapPin,
} from "lucide-react-native";
import { useMemo } from "react";
import { Text, useColorScheme } from "react-native";
import { Job } from "../types/jobs.types";

const formatEmploymentType = (value: Job["employmentType"]) =>
  value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("-");

const formatSalaryRange = (salaryMin?: number, salaryMax?: number) => {
  if (!salaryMin || !salaryMax) return "Salary not specified";
  return `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()}`;
};

export function SuggestedJobCard({
  job,
  loading,
}: {
  job: Job;
  loading: boolean;
}) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const bookmarkIcon = useMemo(() => {
    if (!job || loading) return null;

    if (job.saved) {
      return <Bookmark size={20} fill="#2550ad" stroke="#2550ad" />;
    }

    return <Bookmark size={20} color={"gray"} />;
  }, [job?.saved]);

  return (
    <Card
      className="min-w-96 max-w-110 h-full shadow-none bg-white dark:bg-zinc-900 border-0"
      size="default"
    >
      <Box className="flex flex-row items-center justify-between">
        <VStack>
          <Heading size="md">{job.title}</Heading>
          <Text className="text-gray-600 dark:text-gray-400">
            {job.company.name}
          </Text>
        </VStack>
        <Button
          variant="outline"
          className="w-10 h-10 rounded-lg flex flex-row items-center"
        >
          {bookmarkIcon}
        </Button>
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
      </Box>
      <HStack space="sm">
        <Button className="flex-1">
          <ButtonText>Apply Now</ButtonText>
        </Button>
        <Button className="flex-1" variant="outline">
          <ButtonText>View Details</ButtonText>
        </Button>
      </HStack>
    </Card>
  );
}
