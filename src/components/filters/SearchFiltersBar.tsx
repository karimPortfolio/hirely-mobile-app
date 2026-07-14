import { useFilters } from "@/features/jobs/hooks/useFilters";
import { JobQuery } from "@/features/jobs/types/jobs.types";
import { FunnelX, Search, SlidersHorizontal } from "lucide-react-native";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  ActionsheetItemText,
} from "../ui/actionsheet";
import { Box } from "../ui/box";
import { Button } from "../ui/button";
import { VStack } from "../ui/vstack";

type FilterValue =
  | string
  | string[]
  | boolean
  | { start?: string; end?: string };

interface SearchFiltersBarProps {
  setQuery: Dispatch<SetStateAction<JobQuery>>;
  query: JobQuery;
}

export function SearchFiltersBar({ setQuery, query }: SearchFiltersBarProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const { handleFiltersChange, handleResetFilters, handleSearch } =
    useFilters(setQuery);
  const [alreadySearched, setAlreadySearched] = useState<boolean>(false);
  const [showActionsheet, setShowActionsheet] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, FilterValue>
  >({});

  const handleToggleActionSheet = () => {
    setShowActionsheet(!showActionsheet);
  };

  const handleSearchPress = () => {
    if (searchValue.trim() === "" && !alreadySearched) return;
    handleSearch(searchValue.trim());
    setAlreadySearched(true);
  };

  return (
    <Box className="flex flex-row items-center gap-4 mt-5">
      <Box className="flex-1 flex-row items-center justify-between bg-white dark:bg-zinc-900 rounded-full p-2">
        <TextInput
          onChangeText={(text) => setSearchValue(text)}
          placeholder="Search jobs, companies..."
          className="ps-4 text-black dark:text-white"
        />
        <Button className="w-fit rounded-full p-3" onPress={handleSearchPress}>
          <Search color={"white"} size={19} />
          <Text className="text-white font-medium">Search</Text>
        </Button>
      </Box>
      <TouchableOpacity
        className="flex flex-row items-center gap-2 bg-white dark:bg-zinc-900 w-fit p-4 rounded-full"
        onPress={handleToggleActionSheet}
      >
        <SlidersHorizontal size={20} color={"gray"} />
      </TouchableOpacity>
      <Actionsheet
        isOpen={showActionsheet}
        onClose={() => setShowActionsheet(false)}
      >
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <VStack>
            <Text>Job Type</Text>
          </VStack>
          <ActionsheetItem>
            <ActionsheetItemText>Mark Unread</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem>
            <ActionsheetItemText>Remind Me</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem>
            <ActionsheetItemText>Add to Saved Items</ActionsheetItemText>
          </ActionsheetItem>
          <ActionsheetItem isDisabled>
            <ActionsheetItemText>Delete</ActionsheetItemText>
          </ActionsheetItem>
          <Box className="w-full p-3">
            <TouchableOpacity className="w-full bg-gray-100 dark:bg-zinc-800 rounded-lg p-4 flex flex-row justify-center items-center gap-2">
              <FunnelX size={20} color={isDark ? "white" : "black"} />
              <Text className="font-medium text-black dark:text-white">
                Clear Filters
              </Text>
            </TouchableOpacity>
          </Box>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
