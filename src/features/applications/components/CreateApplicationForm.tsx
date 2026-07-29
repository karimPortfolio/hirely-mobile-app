import { Box } from "@/components/ui/box";
import { CreateApplicationPayload } from "../types/applications.types";
import { SubmitHandler, useForm } from "react-hook-form";
import { useResumeParsing } from "../hooks/useResumeParsing";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApplicationsActions } from "../hooks/useApplicationsActions";
import { useRouter } from "expo-router";
import { createApplicationSchema } from "../schemas/create-application.schema";
import { Text, useColorScheme } from "react-native";
import { VStack } from "@/components/ui/vstack";
import { Field } from "@/components/common/Field";
import { Input, InputField } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { LoadingButton } from "@/components/common/LoadingButton";
import { ButtonText } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react-native";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectItem,
  SelectScrollView,
} from "@/components/ui/select";
import countries from "@/data/countries-phone-code.json";
import { ChevronDownIcon } from "@/components/ui/icon";
import { useEffect } from "react";
import { ResumeField } from "./form-fields/ResumeField";
import { ResumeParsingOverlay } from "./ResumeParsingOverlay";
import { Job } from "@/features/jobs/types/jobs.types";

const createApplicationResolver = zodResolver(createApplicationSchema);

export function CreateApplicationForm({ job }: { job: Job }) {
  const { create, loading, apiError, clearApiError } = useApplicationsActions();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const router = useRouter();

  const form = useForm<CreateApplicationPayload>({
    // resolver: createApplicationResolver,
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      country: "",
      linkedInUrl: "",
      portfolioUrl: "",
      resume: undefined,
      city: "",
    },
  });

  const { parsingResume, handleResumeSelect, cancelParsing } =
    useResumeParsing(form);

  const isFormBusy = loading || parsingResume;
  const errors = form.formState.errors || {};

  const onSubmit = async (values: CreateApplicationPayload) => {
    clearApiError();
    try {
      values.job = job._id;
      await create(values);
      form.reset();
      router.back();
    } catch {
      //errors handled inside hook
    }
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error) => {
        console.log(error.field);
        form.setError(error.field as keyof CreateApplicationPayload, {
          type: "server",
          message: error.errors[0],
        });
      });
    } else {
      form.clearErrors();
    }
  }, [apiError?.validationErrors, form]);

  return (
    <Box className="p-3">
      <Text className="text-xl text-black dark:text-white font-medium">
        Apply for {job.title}
      </Text>
      <VStack space="2xl" className="my-7">
        <ResumeParsingOverlay
          parsingResume={parsingResume}
          cancelParsing={cancelParsing}
          isDark={isDark}
        />

        <ResumeField
          control={form.control as any}
          onFileSelect={handleResumeSelect}
          error={errors.resume}
          disabled={isFormBusy}
        />

        <Field
          control={form.control}
          label="Full Name"
          name="fullName"
          error={errors.fullName}
          isRequired
          space="sm"
          onRender={({ field: { onChange, onBlur, value } }) => (
            <Input
              isRequired={true}
              className={cn(errors.fullName && "!border-red-500")}
            >
              <InputField
                onChangeText={onChange}
                value={value}
                placeholder="e.g. John Doe"
              />
            </Input>
          )}
        />

        <Field
          control={form.control}
          label="Email"
          name="email"
          error={errors.email}
          isRequired
          space="sm"
          onRender={({ field: { onChange, onBlur, value } }) => (
            <Input
              isRequired={true}
              className={cn(errors.email && "!border-red-500")}
            >
              <InputField
                onChangeText={onChange}
                value={value}
                placeholder="email@example.com"
              />
            </Input>
          )}
        />

        <Field
          control={form.control}
          label="Phone Number"
          name="phoneNumber"
          error={errors.phoneNumber}
          isRequired
          space="sm"
          onRender={({ field: { onChange, onBlur, value } }) => (
            <Input
              isRequired={true}
              className={cn(errors.phoneNumber && "!border-red-500")}
            >
              <InputField
                onChangeText={onChange}
                value={value}
                placeholder="+49 000-0000"
              />
            </Input>
          )}
        />

        <Field
          control={form.control}
          label="Country"
          name="country"
          error={errors.country}
          isRequired
          space="sm"
          onRender={({ field: { onChange, onBlur, value } }) => (
            <Select>
              <SelectTrigger
                variant="outline"
                size="md"
                className="h-13 rounded-md"
              >
                <SelectInput placeholder="Select option" />
                <SelectIcon className="ml-auto mr-3" as={ChevronDownIcon} />
              </SelectTrigger>
              <SelectPortal>
                <SelectBackdrop />
                <SelectContent className="h-120">
                  <SelectDragIndicatorWrapper>
                    <SelectDragIndicator />
                  </SelectDragIndicatorWrapper>
                  <SelectScrollView className="w-full">
                    {countries.map((country) => (
                      <SelectItem
                        key={country.value}
                        label={country.label}
                        value={country.value}
                      />
                    ))}
                  </SelectScrollView>
                </SelectContent>
              </SelectPortal>
            </Select>
          )}
        />

        <Field
          control={form.control}
          label="Linkedin URL"
          name="linkedInUrl"
          error={errors.linkedInUrl}
          space="sm"
          onRender={({ field: { onChange, onBlur, value } }) => (
            <Input
              isRequired={true}
              className={cn(errors.linkedInUrl && "!border-red-500")}
            >
              <InputField
                onChangeText={onChange}
                value={value}
                placeholder="e.g. https://www.linkedin.com/in/johndoe"
              />
            </Input>
          )}
        />

        <Field
          control={form.control}
          label="Portfolio URL"
          name="portfolioUrl"
          error={errors.portfolioUrl}
          space="sm"
          onRender={({ field: { onChange, onBlur, value } }) => (
            <Input
              isRequired={true}
              className={cn(errors.portfolioUrl && "!border-red-500")}
            >
              <InputField
                onChangeText={onChange}
                value={value}
                placeholder="e.g. Portfolio website, Github, etc"
              />
            </Input>
          )}
        />

        <LoadingButton
          isLoading={loading}
          loadingLabel="applying..."
          className="py-4"
          onPress={form.handleSubmit(onSubmit)}
        >
          <SendHorizontal size={16} color="white" />
          <ButtonText className="text-md font-medium">Apply</ButtonText>
        </LoadingButton>
      </VStack>
    </Box>
  );
}
