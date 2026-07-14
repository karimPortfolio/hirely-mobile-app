import { GlobalToastController } from "@/components/GlobalToastController";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Spinner } from "@/components/ui/spinner";
import "@/global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  useRouter,
  useSegments,
} from "expo-router";
import { useEffect, useState } from "react";
import { Text, useColorScheme, View } from "react-native";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    let cancelled = false;

    const init = async () => {
      try {
        const value = await AsyncStorage.getItem("HAS_LAUNCHED");
        const launched = value === "true";

        const inOnboardingGroup = segments[0] === "(onboarding)";
        if (launched && inOnboardingGroup) {
          router.replace("/(tabs)");
        } else if (!launched && !inOnboardingGroup) {
          router.replace("/(onboarding)/welcome");
        }
      } catch (err) {
        console.error("Failed to read HAS_LAUNCHED", err);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    init();

    return () => {
      cancelled = true;
    };
  }, [segments, router]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
        }}
      >
        <Spinner size="large" color="#2550ad" />
        <Text className="text-lg font-medium text-center text-black dark:text-white mt-5">
          Checking app launching...
          <Text className="animate-pulse">...</Text>
        </Text>
      </View>
    );
  }
  return (
    <GluestackUIProvider>
      <GlobalToastController />
      <ThemeProvider value={isDark ? DarkTheme : DefaultTheme}>
        {/* <AnimatedSplashOverlay /> */}
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(onboarding)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </ThemeProvider>
    </GluestackUIProvider>
  );
}
