import { Link } from "expo-router";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <Text className="text-center text-4xl text-white">Home Screen</Text>
      <Link href={{ pathname: "/(auth)/register" }}>
        <Text className="text-white text-center underline">Register</Text>
      </Link>
    </SafeAreaView>
  );
}
