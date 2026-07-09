import { Button, ButtonText } from "@/components/ui/button";
import { Image, useColorScheme } from "react-native";

export function AppleSigninButton() {
  const colorTheme = useColorScheme();
  const isDark = colorTheme === "dark";
  const imageUrl = "https://img.icons8.com/ios-filled/50/mac-os.png";
  return (
    <Button variant="outline" size="lg" className="flex-1">
      {!isDark && <Image source={{ uri: imageUrl }} width={20} height={20} />}
      {isDark && (
        <Image
          source={require("../../../../assets/images/auth/apple-logo.png")}
          className="w-6 h-6"
        />
      )}
      <ButtonText className="text-black dark:text-white font-medium text-md text-center">
        Apple
      </ButtonText>
    </Button>
  );
}
