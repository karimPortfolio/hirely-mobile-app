import { AuthPageLayout } from "@/components/AuthPageLayout";
import { Field } from "@/components/common/Field";
import { LoadingButton } from "@/components/common/LoadingButton";
import { Alert, AlertIcon, AlertText } from "@/components/ui/alert";
import { Box } from "@/components/ui/box";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Divider } from "@/components/ui/divider";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CheckIcon, EyeIcon, EyeOffIcon, InfoIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AppleSigninButton } from "@/features/auth/components/AppleSigninButton";
import { GoogleSigninButton } from "@/features/auth/components/GoogleSigninButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, Text } from "react-native";
import z from "zod";

type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;

export default function RegisterScreen() {
  const { register, apiError, loading, clearApiError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      role: "user",
      accepted_terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    clearApiError();
    try {
      register(data);
    } catch (err) {}
  };

  useEffect(() => {
    if (apiError?.validationErrors) {
      apiError.validationErrors.forEach((error: any) => {
        const message = Array.isArray(error.errors)
          ? error.errors[0]
          : String(error.errors);

        setError(error.field, {
          type: "server",
          message,
        });
      });
    } else {
      clearErrors();
    }
  }, [apiError?.validationErrors]);

  return (
    <AuthPageLayout>
      <Box className="flex items-center justify-center">
        <Image
          source={require("../../../assets/images/logo-dark.png")}
          alt="Application Logo"
          resizeMode="contain"
          className="w-60 h-40 relative top-9"
        />
      </Box>
      <ScrollView className="flex-1 bg-white dark:bg-black rounded-t-4xl p-7 mt-5">
        <VStack space="sm">
          <Heading className="text-3xl">Create your account</Heading>
          <Text className="text-gray-600 dark:text-gray-400">
            Sign up to start tracking your job applications and manage your
            career efficiently.
          </Text>
        </VStack>
        {apiError?.message && (
          <Alert variant="destructive" className="mt-5">
            <AlertIcon as={InfoIcon} />
            <AlertText>{apiError.message}</AlertText>
          </Alert>
        )}
        <VStack space="2xl" className="mb-7 mt-10">
          {/* === NAME INPUT === */}
          <HStack className="w-full flex flex-row gap-2">
            <Field
              control={control}
              label="First Name"
              name="first_name"
              error={errors.first_name}
              isRequired
              space="sm"
              className="flex-1"
              onRender={({ field: { onChange, onBlur, value } }) => (
                <Input
                  isRequired={true}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  className={cn(errors.first_name && "!border-red-500")}
                >
                  <InputField
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your first name..."
                  />
                </Input>
              )}
            />

            <Field
              control={control}
              label="Last Name"
              name="last_name"
              error={errors.last_name}
              isRequired
              space="sm"
              className="flex-1"
              onRender={({ field: { onChange, onBlur, value } }) => (
                <Input
                  isRequired={true}
                  isDisabled={false}
                  isInvalid={false}
                  isReadOnly={false}
                  className={cn(errors.last_name && "!border-red-500")}
                >
                  <InputField
                    onChangeText={onChange}
                    value={value}
                    placeholder="Enter your last name..."
                  />
                </Input>
              )}
            />
          </HStack>

          {/* === EMAIL INPUT === */}
          <Field
            control={control}
            label="Email"
            name="email"
            error={errors.email}
            isRequired
            space="sm"
            onRender={({ field: { onChange, onBlur, value } }) => (
              <Input
                isRequired={true}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className={cn(errors.email && "!border-red-500")}
              >
                <InputField
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your email..."
                />
              </Input>
            )}
          />

          {/* === PASSWORD INPUT === */}
          <Field
            control={control}
            label="Password"
            name="password"
            error={errors.password}
            space="sm"
            isRequired
            onRender={({ field: { onChange, onBlur, value } }) => (
              <Input
                isRequired={true}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className={cn(errors.password && "!border-red-500")}
              >
                <InputField
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password..."
                  value={value}
                  onChangeText={onChange}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />

          {/* === CONFIRM PASSWORD INPUT === */}
          <Field
            control={control}
            label="Confirm Password"
            name="password_confirmation"
            error={errors.password_confirmation}
            isRequired
            space="sm"
            onRender={({ field: { onChange, onBlur, value } }) => (
              <Input
                isRequired={true}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
                className={cn(
                  errors.password_confirmation && "!border-red-500",
                )}
              >
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  value={value}
                  placeholder="Confirm your password..."
                  onChangeText={onChange}
                />
                <InputSlot
                  className="pr-3"
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <InputIcon as={showConfirmPassword ? EyeIcon : EyeOffIcon} />
                </InputSlot>
              </Input>
            )}
          />

          {/* === TERMS AND CONDITIONS === */}
          <Field
            control={control}
            name="accepted_terms"
            isRequired
            space="sm"
            onRender={({ field: { onChange, onBlur, value } }) => (
              <Checkbox
                isChecked={value}
                value="accepted"
                isDisabled={false}
                isInvalid={false}
                onChange={(checked) => onChange(checked)}
                className={cn(errors.accepted_terms && "!border-red-500")}
              >
                <CheckboxIndicator
                  className={cn(
                    "w-5 h-5",
                    errors.accepted_terms && "!border-red-500",
                  )}
                >
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel
                  className={cn(
                    "text-md",
                    errors.accepted_terms && "!text-red-500",
                  )}
                >
                  I accept the terms and conditions
                </CheckboxLabel>
              </Checkbox>
            )}
          />
        </VStack>

        <LoadingButton
          label="Sign up"
          loadingLabel="Creating account..."
          size="lg"
          isLoading={loading}
          onPress={handleSubmit(onSubmit)}
        />

        <Box className="flex flex-row justify-center items-center my-5">
          <Divider className="my-0.5 w-20 flex-1" />
          <Text className="mx-4 text-gray-600 dark:text-gray-400">Or</Text>
          <Divider className="my-0.5 w-20 flex-1" />
        </Box>

        <Box className="flex flex-row justify-center items-center gap-4">
          <GoogleSigninButton />
          <AppleSigninButton />
        </Box>

        <Box className="flex justify-center items-center mt-10 mb-5">
          <Text className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/(auth)/login" className="underline">
              <Text className="text-black dark:text-white">Sign in</Text>
            </Link>
          </Text>
        </Box>
      </ScrollView>
    </AuthPageLayout>
  );
}
