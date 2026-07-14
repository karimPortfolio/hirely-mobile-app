import { LoadingButton } from "@/components/common/LoadingButton";
import { ButtonText } from "@/components/ui/button";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useEffect, useState } from "react";
import { Alert, Image } from "react-native";
import { useAuth } from "../hooks/useAuth";

export function GoogleSigninButton() {
  const { googleSignin } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID,
      iosClientId: process.env.EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID,
      offlineAccess: true,
    });
  }, []);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      const response = await GoogleSignin.signIn();
      const idToken = response.data?.idToken;
      if (!idToken) throw new Error("No ID Token returned from Google");

      googleSignin(idToken);
    } catch (error: any) {
      Alert.alert("Sign In Failed", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoadingButton
      variant="outline"
      size="lg"
      className="flex-1"
      isLoading={loading}
      onPress={handleGoogleSignIn}
    >
      <Image
        source={{ uri: "https://img.icons8.com/color/48/google-logo.png" }}
        width={20}
        height={20}
      />
      <ButtonText className="text-black dark:text-white font-medium text-md text-center">
        Google
      </ButtonText>
    </LoadingButton>
  );
}
