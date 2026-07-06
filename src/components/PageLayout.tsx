import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ padding: 15, flex: 1 }}>{children}</SafeAreaView>
    </SafeAreaProvider>
  );
}
