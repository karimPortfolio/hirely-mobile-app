"use client";

import { useAuthStore } from "@/stores/auth.store";
import { Redirect, useRouter } from "expo-router";
import { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { user, initialized } = useAuthStore();
  const router = useRouter();

  // if (!initialized) return <InitializingSpinner />;

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
}
