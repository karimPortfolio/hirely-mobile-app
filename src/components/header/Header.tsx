import { useAuth } from "@/features/auth/hooks/useAuth";
import { Link } from "expo-router";
import { Bell } from "lucide-react-native";
import { Text, View } from "react-native";
import { Box } from "../ui/box";
import { VStack } from "../ui/vstack";
import { HeaderAvatar } from "./HeaderAvatar";

export function Header() {
  const { user } = useAuth();

  if (!user) return;

  return (
    <Box className="flex flex-row items-center justify-between">
      <Box className="flex flex-row items-center gap-4">
        <HeaderAvatar user={user} />
        <VStack>
          <Text className="text-gray-600 dark:text-gray-400">
            Welcome back,
          </Text>
          <Text className="font-medium text-lg text-black dark:text-white">
            {user.name}
          </Text>
        </VStack>
      </Box>
      <Link href={"/notifications"} className="p-1">
        <View className="p-3 rounded-full bg-white dark:bg-zinc-900">
          <Bell color={"gray"} size={20} />
        </View>
      </Link>
    </Box>
  );
}
