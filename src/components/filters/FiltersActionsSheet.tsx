import {
  Accordion,
  AccordionContent,
  AccordionHeader,
  AccordionIcon,
  AccordionItem,
  AccordionTitleText,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, ButtonText } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { ChevronDownIcon, CircleIcon } from "@/components/ui/icon";
import {
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
} from "@/components/ui/radio";
import {
  JOB_EMPLOYMENT_TYPE_OPTIONS,
  JOB_EXPERIENCE_LEVEL_OPTIONS,
  REMOTE_ONLY_OPTIONS,
} from "@/features/jobs/constants/job-constants";
import {
  JobEmploymentTypeOption,
  JobExperienceLevelOption,
  RemoteOnlyOption,
} from "@/features/jobs/types/jobs.types";
import { FunnelX, Settings2 } from "lucide-react-native";
import { useState } from "react";
import { Text, useColorScheme } from "react-native";
import { LoadingButton } from "../common/LoadingButton";
import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
} from "../ui/actionsheet";
import { Box } from "../ui/box";
import { HStack } from "../ui/hstack";
import { VStack } from "../ui/vstack";

type FilterValue =
  | string
  | string[]
  | boolean
  | { start?: string; end?: string };

interface FiltersActionSheetProps {
  handleFiltersChange: (next: Record<string, unknown>) => void;
  handleResetFilters: () => void;
  showActionSheet: boolean;
  setShowActionSheet: any;
  loading: boolean;
}

export function FiltersActionsSheet({
  handleFiltersChange,
  handleResetFilters,
  showActionSheet,
  setShowActionSheet,
  loading,
}: FiltersActionSheetProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [accordionSelectedValues, setAccordionSelectedValues] = useState<
    string[]
  >(["a", "b", "c"]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, FilterValue>
  >({});

  const handleFilterChange = (key: string, value: FilterValue) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getFilterStringValue = (key: string, fallback: string = ""): string => {
    const value = selectedFilters[key];
    return typeof value === "string" ? value : fallback;
  };

  const handleApplyFilters = () => {
    handleFiltersChange(selectedFilters);
    setShowActionSheet(false);
  };

  const resetAllFilters = () => {
    handleResetFilters();
    setSelectedFilters({});
    setShowActionSheet(false);
  };

  return (
    <Actionsheet
      isOpen={showActionSheet}
      onClose={() => setShowActionSheet(false)}
    >
      <ActionsheetBackdrop />
      <ActionsheetContent className="p-7">
        <ActionsheetDragIndicatorWrapper>
          <ActionsheetDragIndicator />
        </ActionsheetDragIndicatorWrapper>
        <HStack space="sm" className="w-full items-center mb-5">
          <Settings2 size={22} />
          <Text className="text-xl font-medium text-black dark:text-white">
            Filters
          </Text>
        </HStack>
        <Accordion
          type="multiple"
          isCollapsible={true}
          value={accordionSelectedValues}
          onValueChange={(val) => setAccordionSelectedValues(val)}
          className=" w-full"
        >
          <FilterAccordionItem title="Employment Type" value="a">
            <RadioGroup
              value={getFilterStringValue("employmentType", "all")}
              onChange={(nextValue: string) =>
                handleFilterChange("employmentType", nextValue)
              }
            >
              <VStack space="sm" className="py-3">
                {JOB_EMPLOYMENT_TYPE_OPTIONS.map(
                  (type: JobEmploymentTypeOption) => (
                    <Radio value={type.value} key={type.value}>
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>{type.label}</RadioLabel>
                    </Radio>
                  ),
                )}
              </VStack>
            </RadioGroup>
          </FilterAccordionItem>
          <Divider className="bg-border" />

          <FilterAccordionItem title="Employment Level" value="b">
            <RadioGroup
              value={getFilterStringValue("experienceLevel", "all")}
              onChange={(nextValue: string) =>
                handleFilterChange("experienceLevel", nextValue)
              }
            >
              <VStack space="sm" className="py-3">
                {JOB_EXPERIENCE_LEVEL_OPTIONS.map(
                  (type: JobExperienceLevelOption) => (
                    <Radio value={type.value} key={type.value}>
                      <RadioIndicator>
                        <RadioIcon as={CircleIcon} />
                      </RadioIndicator>
                      <RadioLabel>{type.label}</RadioLabel>
                    </Radio>
                  ),
                )}
              </VStack>
            </RadioGroup>
          </FilterAccordionItem>
          <Divider className="bg-border" />

          <FilterAccordionItem title="Remote Only" value="c">
            <RadioGroup
              value={getFilterStringValue("isRemote", "inactive")}
              onChange={(nextValue: string) =>
                handleFilterChange("isRemote", nextValue)
              }
            >
              <VStack space="sm" className="py-3">
                {REMOTE_ONLY_OPTIONS.map((type: RemoteOnlyOption) => (
                  <Radio value={type.value} key={type.value}>
                    <RadioIndicator>
                      <RadioIcon as={CircleIcon} />
                    </RadioIndicator>
                    <RadioLabel>{type.label}</RadioLabel>
                  </Radio>
                ))}
              </VStack>
            </RadioGroup>
          </FilterAccordionItem>
        </Accordion>
        <Box className="w-full flex gap-4 mt-5">
          <LoadingButton
            isLoading={loading}
            size="lg"
            loadingLabel="Applying..."
            onPress={handleApplyFilters}
          >
            <ButtonText className="text-md font-medium">
              Apply Filters
            </ButtonText>
          </LoadingButton>
          <Button variant="outline" size="lg" onPress={resetAllFilters}>
            <FunnelX size={20} color={isDark ? "white" : "black"} />
            <ButtonText className="text-md font-medium">
              Clear Filters
            </ButtonText>
          </Button>
        </Box>
      </ActionsheetContent>
    </Actionsheet>
  );
}

const FilterAccordionItem = ({
  title,
  value,
  children,
}: {
  title: string;
  value: string;
  children: React.ReactElement;
}) => {
  return (
    <AccordionItem value={value}>
      <AccordionHeader>
        <AccordionTrigger>
          {() => {
            return (
              <>
                <AccordionTitleText className="text-md">
                  {title}
                </AccordionTitleText>
                <AccordionIcon as={ChevronDownIcon} />
              </>
            );
          }}
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent>{children}</AccordionContent>
    </AccordionItem>
  );
};
