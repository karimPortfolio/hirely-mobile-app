import { View } from "react-native";
import { Spinner } from "../ui/spinner";

export function InitializingSpinner() {
  return (
    <View className="flex-1 justify-center items-center w-full">
      <Spinner size="large" color="primary" />
    </View>
  );
}
