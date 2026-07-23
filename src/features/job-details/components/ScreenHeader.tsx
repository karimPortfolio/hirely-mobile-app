import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Job } from "@/features/jobs/types/jobs.types";
import { ChevronLeft } from "lucide-react-native";
import { Text } from "react-native";

interface ScreenHeaderProps {
  job: Job | null;
  loading: boolean;
  onPress?: () => void;
}

export function ScreenHeader({ job, loading, onPress }: ScreenHeaderProps) {
  return (
    <Box className="relative flex flex-row items-center justify-center">
      <Button
        variant="ghost"
        className="absolute left-4 rounded-full bg-white dark:bg-zinc-900 p-3"
        onPress={onPress}
      >
        <ChevronLeft size={22} color="gray" />
      </Button>
      {loading && (
        <Skeleton
          variant="sharp"
          className="h-8 w-56 rounded-lg bg-gray-200 dark:bg-zinc-900 mt-4"
        />
      )}
      {job && (
        <Text className="text-black dark:text-white text-2xl font-medium">
          {job.company.name}
        </Text>
      )}
    </Box>
  );
}
