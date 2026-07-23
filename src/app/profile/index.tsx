import { TabsScreenLayout } from "@/components/TabsScreenLayout";
import { Text } from "react-native";

export default function NotificationsScreen() {
  return (
    <TabsScreenLayout>
      <Text className="text-3xl text-center text-black dark:text-white">
        Profile
      </Text>
    </TabsScreenLayout>
  );
}
