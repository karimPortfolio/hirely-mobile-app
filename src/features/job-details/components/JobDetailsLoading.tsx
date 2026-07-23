import { StackScreenLayout } from "@/components/StackScreenLayout";
import { memo } from "react";
import { ScreenHeader } from "./ScreenHeader";
import { Box } from "@/components/ui/box";
import { Skeleton } from "@/components/ui/skeleton";

export const JobDetailsLoading = memo(() => (
  <StackScreenLayout>
    <ScreenHeader job={null} loading={true} />
    <Box className="mt-10 p-4 flex-1 bg-white dark:bg-zinc-900 rounded-4xl">
      <Box className="flex justify-center items-center">
        <Skeleton
          variant="sharp"
          className="h-10 w-64 rounded-lg bg-gray-200 dark:bg-zinc-800 mt-4"
        />
      </Box>
      <Box className="flex flex-row items-center justify-center mb-4">
        <Skeleton
          variant="sharp"
          className="h-6 w-96 rounded-lg bg-gray-200 dark:bg-zinc-800 mt-4"
        />
      </Box>
      <Box className="flex flex-row flex-wrap items-center justify-center gap-3 mb-6">
        <Skeleton
          variant="sharp"
          className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-zinc-800 mt-4"
        />
        <Skeleton
          variant="sharp"
          className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-zinc-800 mt-4"
        />
        <Skeleton
          variant="sharp"
          className="h-8 w-32 rounded-lg bg-gray-200 dark:bg-zinc-800 mt-4"
        />
      </Box>
      <Box className="p-3">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton
            key={index}
            variant="sharp"
            className="h-8 w-full rounded-lg bg-gray-200 dark:bg-zinc-800 mt-4"
          />
        ))}
      </Box>
    </Box>
  </StackScreenLayout>
));
