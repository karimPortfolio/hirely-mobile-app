import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export function AuthPageLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/auth/silk-background.png")}
          className="absolute -top-14 w-full h-full flex-1"
          resizeMode="none"
        />
        {children}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
});
