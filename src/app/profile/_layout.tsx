import { AuthGuard } from "@/components/guards/AuthGuard";
import { AuthProvider } from "@/components/providers/AuthProvider";
import { Slot } from "expo-router";

export default function ProfileLayout() {
  return (
    <AuthProvider>
      <AuthGuard>
        <Slot />
      </AuthGuard>
    </AuthProvider>
  );
}
