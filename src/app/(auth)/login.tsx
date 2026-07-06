import { AuthPageLayout } from "@/components/AuthPageLayout";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { CheckIcon, EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, Text } from "react-native";

export default function LoginScreen() {
  const [credentials, setCredentials] = useState({
    rememberMe: "false",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
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
          <VStack space="sm">
            <Text className="text-foreground/60">Email</Text>
            <Input isDisabled={false} isInvalid={false} isReadOnly={false}>
              <InputField placeholder="Enter your email..." />
            </Input>
          </VStack>
          <VStack space="sm">
            <Text className="text-foreground/60">Password</Text>
            <Input isDisabled={false} isInvalid={false} isReadOnly={false}>
              <InputField
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password..."
              />
              <InputSlot className="pr-3" onPress={handlePasswordToggle}>
                <InputIcon as={showPassword ? EyeIcon : EyeOffIcon} />
              </InputSlot>
            </Input>
          </VStack>
          <HStack className="flex flex-row justify-between">
            <Checkbox
              value={credentials.rememberMe}
              isDisabled={false}
              isInvalid={false}
            >
              <CheckboxIndicator className="w-5 h-5">
                <CheckboxIcon as={CheckIcon} />
              </CheckboxIndicator>
              <CheckboxLabel className="text-md">Remember me</CheckboxLabel>
            </Checkbox>
            <Link href="/(auth)/login">
              <Text>Forgot password?</Text>
            </Link>
          </HStack>
        </VStack>
        <Button size="lg" className="mb-5">
          <ButtonText className="text-md">Sign In</ButtonText>
        </Button>
        <Box className="flex justify-center items-center">
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
