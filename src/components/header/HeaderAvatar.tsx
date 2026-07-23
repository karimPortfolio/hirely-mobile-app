import { User } from "@/features/auth/types";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";
import { Box } from "../ui/box";
import {
  Actionsheet,
  ActionsheetContent,
  ActionsheetItem,
  ActionsheetItemText,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetBackdrop,
  ActionsheetIcon,
} from "@/components/ui/actionsheet";
import { Button, ButtonText } from "../ui/button";
import { useState } from "react";
import { ChevronRight, LogOut, Settings, User2Icon } from "lucide-react-native";
import { Divider } from "../ui/divider";
import { useColorScheme } from "react-native";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { LoadingButton } from "../common/LoadingButton";

export function HeaderAvatar({ user }: { user: User }) {
  const { logout, loading } = useAuth();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const [showActionsheet, setShowActionsheet] = useState(false);
  const handleClose = () => setShowActionsheet(false);
  return (
    <Box>
      <Button
        variant="link"
        className="rounded-full ring-1 ring-gray-500 dark:ring-gray-400 p-0"
        onPress={() => setShowActionsheet(true)}
      >
        <Avatar>
          <AvatarFallbackText>{user.name}</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: user.avatarUrl || "",
            }}
          />
        </Avatar>
      </Button>
      <Actionsheet isOpen={showActionsheet} onClose={handleClose}>
        <ActionsheetBackdrop />
        <ActionsheetContent>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <Box className="bg-gray-100 dark:bg-zinc-900 w-full rounded-lg mt-5 p-2">
            <ActionsheetItem
              onPress={handleClose}
              className="flex-row items-center justify-between"
            >
              <Box className="flex flex-row items-center gap-3">
                <ActionsheetIcon
                  className="stroke-background-700"
                  as={User2Icon}
                  size={19}
                />
                <ActionsheetItemText className="text-lg font-medium">
                  Profile
                </ActionsheetItemText>
              </Box>
              <ChevronRight size={20} color={isDark ? "white" : "black"} />
            </ActionsheetItem>
            <ActionsheetItem
              onPress={handleClose}
              className="flex-row items-center justify-between"
            >
              <Box className="flex flex-row items-center gap-3">
                <ActionsheetIcon
                  className="stroke-background-700"
                  as={Settings}
                  size={19}
                />
                <ActionsheetItemText className="text-lg font-medium">
                  Settings
                </ActionsheetItemText>
              </Box>
              <ChevronRight size={20} color={isDark ? "white" : "black"} />
            </ActionsheetItem>
          </Box>
          <Divider className="my-7 w-full" />
          <LoadingButton
            variant="destructive"
            isLoading={loading}
            loadingLabel="Signing out"
            className="w-full py-3"
            onPress={logout}
          >
            <LogOut size={19} color="white" />
            <ButtonText className="text-md">Sign out</ButtonText>
          </LoadingButton>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
}
