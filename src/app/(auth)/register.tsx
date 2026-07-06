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
import { Heading } from "@/components/ui/heading";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { registerSchema } from "@/features/auth/schemas/register.schema";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Image, Text } from "react-native";
import z from "zod";

type RegisterFormData = z.infer<ReturnType<typeof registerSchema>>;

export default function RegisterScreen() {
  const { register, apiError, loading, clearApiError } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    // resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      accepted_terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    clearApiError();
    try {
      console.log("Starting Registering...");
      console.log(
        "Env base url: ",
        `${process.env.EXPO_PUBLIC_BACKEND_URL}/api`,
      );
      register(data);
      // router.push("/(tabs)");
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
          <Heading className="text-3xl">Create your account</Heading>
          <Text className="text-gray-600 dark:text-gray-400">
            Sign up to start tracking your job applications and manage your
            career efficiently.
          </Text>
        </VStack>
        <VStack space="2xl" className="mb-7">
          {/* === NAME INPUT === */}
          <Field
            control={control}
            label="Full Name"
            name="name"
            error={errors.name}
            isRequired
            space="sm"
            onRender={({ field: { onChange, onBlur, value } }) => (
              <Input
                isRequired={true}
                isDisabled={false}
                isInvalid={false}
                isReadOnly={false}
              >
                <InputField
                  onChangeText={onChange}
                  value={value}
                  placeholder="Enter your name..."
                />
              </Input>
            )}
          />

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
              >
                <CheckboxIndicator className="w-5 h-5">
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel className="text-md">
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
          className="mb-5"
          isLoading={loading}
          onPress={handleSubmit(onSubmit)}
        />

        <Box className="flex justify-center items-center">
          <Text className="text-center text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/(auth)/login" className="underline">
              <Text className="text-black dark:text-white">Sign in</Text>
            </Link>
          </Text>
        </Box>
      </Box>
    </AuthPageLayout>
  );
}
