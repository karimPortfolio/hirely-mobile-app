import { PageLayout } from "@/components/PageLayout";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function SetupScreen() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const isDark = colorScheme === "dark";
  const logoImageSrc = isDark
    ? require("../../../assets/images/logo-dark.png")
    : require("../../../assets/images/logo.png");

  const handleFinishOnboarding = async () => {
    try {
      await AsyncStorage.setItem("HAS_LAUNCHED", "true");
      router.replace("/(auth)/register");
    } catch (error) {
      Alert.alert("Error", "Failed to save onboarding state.");
    }
  };

  return (
    <PageLayout>
      <Box style={StyleSheet.absoluteFill} className="pt-30 bg-primary-dark">
        <View
          style={{
            ...StyleSheet.absoluteFill,
            experimental_backgroundImage:
              "linear-gradient(to bottom, #0a1633 0%, #2550ad 45%, #050b1a 85%)",
          }}
        />
        <Box className="relative h-2/3">
          <Box className="flex justify-center items-center">
            <Image
              source={logoImageSrc}
              alt="logo image"
              resizeMode="contain"
              className="z-10 w-60 h-40"
            />
          </Box>
          <Image
            source={require("../../../assets/images/onboarding/professional-woman.png")}
            resizeMode="contain"
            className="w-full z-0 absolute top-30"
          />
        </Box>
        <View
          style={{
            ...StyleSheet.absoluteFill,
            experimental_backgroundImage:
              "linear-gradient(to bottom, rgba(5, 11, 26, 0) 50%, rgba(5, 11, 26, 0.8) 64%, #050b1a 80%)",
            backdropFilter: "blur(90px)",
          }}
        />
        <Box className="w-full flex-1 relative -top-5 will-change-variable px-5">
          <Text className="text-white text-5xl mb-4">
            Ready to Land Your Next Role?
          </Text>
          <Text className="text-gray-400 text-lg mb-6">
            Join thousands of professionals finding meaningful work every day.
            Your perfect match is just a few taps away.
          </Text>
          <Box className="flex flex-row items-center gap-2 mb-6">
            <View className="h-2 w-2 rounded-full bg-primary/50" />
            <View className="h-2 w-2 rounded-full bg-primary/50" />
            <View className="h-2 w-7 rounded-full bg-primary" />
          </Box>
          <Button
            size="lg"
            className="rounded-xl"
            onPress={handleFinishOnboarding}
          >
            <ButtonText className="text-lg font-medium">Get Started</ButtonText>
          </Button>
        </Box>
      </Box>
    </PageLayout>
  );
}
