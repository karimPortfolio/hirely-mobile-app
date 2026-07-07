import { useAuth } from "@/features/auth/hooks/useAuth";
import { useEffect } from "react";
import { Text, View } from "react-native";
import { Spinner } from "../ui/spinner";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { fetchUser, initialized } = useAuth();

  useEffect(() => {
    fetchUser();
  }, []);

  if (!initialized)
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <Spinner size="large" color="#2550ad" />
        <Text className="text-lg font-medium text-black dark:text-white mt-5">
          Loading your profile
          <Text className="animate-pulse">...</Text>
        </Text>
      </View>
    );

  return <>{children}</>;
}
