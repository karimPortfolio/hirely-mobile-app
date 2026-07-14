import { useAuthStore } from "@/stores/auth.store";
import { Redirect } from "expo-router";
import { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuthStore();

  if (!initialized) return null;

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
}
