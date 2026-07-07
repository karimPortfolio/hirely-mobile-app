import { AuthGuard } from "@/components/guards/AuthGuard";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Tabs } from "expo-router";
import { BriefcaseBusiness, CalendarCheck, House } from "lucide-react-native";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  return (
    <AuthProvider>
      <AuthGuard>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: "#2550ad",
            tabBarInactiveTintColor: isDark ? "#99a1af" : "#62748e",
            headerShown: false,
            tabBarStyle: {
              paddingTop: 12,
              height: 90,
            },
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              title: "Home",
              tabBarIcon: ({ color, size }) => (
                <House color={color} size={size} />
              ),
              tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: "light",
                paddingTop: 2,
              },
            }}
          />
          <Tabs.Screen
            name="jobs"
            options={{
              title: "Jobs",
              tabBarIcon: ({ color, size }) => (
                <BriefcaseBusiness color={color} size={size} />
              ),
              tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: "light",
                paddingTop: 2,
              },
            }}
          />
          <Tabs.Screen
            name="saved"
            options={{
              title: "Saved",
              tabBarIcon: ({ color, size }) => (
                <BriefcaseBusiness color={color} size={size} />
              ),
              tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: "light",
                paddingTop: 2,
              },
            }}
          />
          <Tabs.Screen
            name="applied"
            options={{
              title: "Applied",
              tabBarIcon: ({ color, size }) => (
                <CalendarCheck color={color} size={size} />
              ),
              tabBarLabelStyle: {
                fontSize: 13,
                fontWeight: "light",
                paddingTop: 2,
              },
            }}
          />
        </Tabs>
      </AuthGuard>
    </AuthProvider>
  );
}
