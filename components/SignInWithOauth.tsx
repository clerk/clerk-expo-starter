import React from "react";
import { useSignIn } from "@clerk/clerk-expo";
import * as AuthSession from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { Text, TouchableOpacity } from "react-native";
import { log } from "../logger";
import { styles } from "./Styles";
import { useWamUpBrowser } from "../hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

export function SignInWithOauth() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWamUpBrowser();

  const { signIn, setSession, isLoaded } = useSignIn();

  const onPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      // Create a redirect url for the current platform and environment.
      //
      // This redirect URL needs to be whitelisted for your instance via
      // https://clerk.dev/docs/reference/backend-api/tag/Redirect-URLs#operation/CreateRedirectURL
      //
      // For more information go to:
      // https://docs.expo.dev/versions/latest/sdk/auth-session/#authsessionmakeredirecturi
      const redirectUrl = AuthSession.makeRedirectUri({
        path: "/oauth-native-callback",
      });

      await signIn.create({ strategy: "oauth_google", redirectUrl });

      const { externalVerificationRedirectURL } =
        signIn.firstFactorVerification;

      const result = await AuthSession.startAsync({
        authUrl: externalVerificationRedirectURL!.toString(),
        returnUrl: redirectUrl,
      });

      // @ts-ignore
      const { type, params } = result || {};

      // Check all the possible AuthSession results
      // https://docs.expo.dev/versions/latest/sdk/auth-session/#returns-7
      if (type !== "success") {
        throw "Something went wrong during the OAuth flow. Try again.";
      }

      // Get the rotatingTokenNonce from the redirect URL parameters
      const { rotating_token_nonce: rotatingTokenNonce } = params;

      await signIn.reload({ rotatingTokenNonce });

      const { createdSessionId } = signIn;

      if (!createdSessionId) {
        throw "Something went wrong during the Sign in OAuth flow. Please ensure that all sign in requirements are met.";
      }

      await setSession(createdSessionId);
      return;
    } catch (err: any) {
      log("Error:> " + err?.message || "");
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  }, []);

  return (
    <TouchableOpacity
      style={{ ...styles.secondaryButton, marginBottom: 20 }}
      onPress={onPress}
    >
      <Text style={styles.secondaryButtonText}>Sign in with Google</Text>
    </TouchableOpacity>
  );
}
