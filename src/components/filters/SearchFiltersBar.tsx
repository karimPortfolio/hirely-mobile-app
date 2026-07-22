import { Button } from "@/components/ui/button";
import { useFilters } from "@/features/jobs/hooks/useFilters";
import { JobQuery } from "@/features/jobs/types/jobs.types";
import { Search, Settings2 } from "lucide-react-native";
import { Dispatch, SetStateAction, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { Box } from "../ui/box";
import { FiltersActionsSheet } from "./FiltersActionsSheet";

type FilterValue =
  | string
  | string[]
  | boolean
  | { start?: string; end?: string };

interface SearchFiltersBarProps {
  setQuery: Dispatch<SetStateAction<JobQuery>>;
  query: JobQuery;
  loading: boolean;
  showFilters?: boolean;
  customSearchKey?: string;
}

export function SearchFiltersBar({
  setQuery,
  query,
  loading,
  showFilters = true,
  customSearchKey,
}: SearchFiltersBarProps) {
  const { handleFiltersChange, handleResetFilters, handleSearch } =
    useFilters(setQuery);
  const [alreadySearched, setAlreadySearched] = useState<boolean>(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleToggleActionSheet = () => {
    setShowActionSheet(!showActionSheet);
  };

  const handleSearchPress = () => {
    if (searchValue.trim() === "" && !alreadySearched) return;
    const searchKey = customSearchKey || "search";
    handleSearch(searchKey, searchValue.trim());
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
      {showFilters && (
        <Box>
          <TouchableOpacity
            className="flex flex-row items-center gap-2 bg-white dark:bg-zinc-900 w-fit p-4 rounded-full"
            onPress={handleToggleActionSheet}
          >
            <Settings2 size={20} color={"gray"} />
          </TouchableOpacity>

          <FiltersActionsSheet
            handleFiltersChange={handleFiltersChange}
            handleResetFilters={handleResetFilters}
            showActionSheet={showActionSheet}
            setShowActionSheet={setShowActionSheet}
            loading={loading}
          />
        </Box>
      )}
    </Box>
  );
}
