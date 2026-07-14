import { User } from "@/features/auth/types";
import { Link } from "expo-router";
import { Avatar, AvatarFallbackText, AvatarImage } from "../ui/avatar";

export function HeaderAvatar({ user }: { user: User }) {
  return (
    <Link href="/profile" className="rounded-full">
      <Avatar>
        <AvatarFallbackText>{user.name}</AvatarFallbackText>
        <AvatarImage
          source={{
            uri: user.avatarUrl || "",
          }}
        />
      </Avatar>
    </Link>
  );
}
