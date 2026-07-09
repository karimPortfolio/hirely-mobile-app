import { AuthPageLayout } from "@/components/AuthPageLayout";
import { Field } from "@/components/common/Field";
import { LoadingButton } from "@/components/common/LoadingButton";
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
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { AppleSigninButton } from "@/features/auth/components/AppleSigninButton";
import { GoogleSigninButton } from "@/features/auth/components/GoogleSigninButton";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { loginSchema } from "@/features/auth/schemas/login.schema";
import { cn } from "@/lib/utils";
import { Link } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Text } from "react-native";
import z from "zod";

type LoginFormData = z.infer<ReturnType<typeof loginSchema>>;

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, loading, apiError, clearApiError } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm<LoginFormData>({
    // resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember_me: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    clearApiError();
    try {
      login(data);
    } catch (err) {}
  };

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
      <Box className="flex-1 bg-white dark:bg-black rounded-t-4xl p-7 mt-5">
        <VStack space="sm" className="mb-10">
          <Heading className="text-3xl">Sign in</Heading>
          <Text className="text-gray-600 dark:text-gray-400">
            Welcome back! Please sign in to continue.
          </Text>
        </VStack>
        <VStack space="2xl" className="mb-7">
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

          <HStack className="flex flex-row justify-between">
            <Field
              control={control}
              name="remember_me"
              isRequired
              space="sm"
              onRender={({ field: { onChange, onBlur, value } }) => (
                <Checkbox
                  isChecked={value}
                  value="accepted"
                  isDisabled={false}
                  isInvalid={false}
                  onChange={(checked) => onChange(checked)}
                  className={cn(errors.remember_me && "!border-red-500")}
                >
                  <CheckboxIndicator className="w-5 h-5">
                    <CheckboxIcon as={CheckIcon} />
                  </CheckboxIndicator>
                  <CheckboxLabel className="text-md">Remember me</CheckboxLabel>
                </Checkbox>
              )}
            />
            <Link href="/(auth)/login">
              <Text>Forgot password?</Text>
            </Link>
          </HStack>
        </VStack>
        <LoadingButton
          label="Sign In"
          loadingLabel="Signing in..."
          size="lg"
          isLoading={loading}
          onPress={handleSubmit(onSubmit)}
        />
        <Box className="flex flex-row justify-center items-center my-10">
          <Divider className="my-0.5 w-20 flex-1" />
          <Text className="mx-4 text-gray-600 dark:text-gray-400">Or</Text>
          <Divider className="my-0.5 w-20 flex-1" />
        </Box>
        <Box className="flex flex-row justify-center items-center gap-4">
          <GoogleSigninButton />
          <AppleSigninButton />
        </Box>
        <Box className="flex justify-center items-center mt-10">
          <Text className="text-center text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/(auth)/register" className="underline">
              <Text className="text-black dark:text-white">Sign up</Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </AuthPageLayout>
  );
}
