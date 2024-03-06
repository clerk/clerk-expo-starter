import { ClerkLoaded, ClerkProvider } from "@clerk/clerk-expo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Slot, SplashScreen } from "expo-router";
import { useEffect } from "react";
import { tokenCache } from "../cache";
import { SafeAreaProvider } from "react-native-safe-area-context";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function Layout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

function RootLayoutNav() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <SafeAreaProvider>
        <ClerkLoaded>
          <Slot />
        </ClerkLoaded>
      </SafeAreaProvider>
    </ClerkProvider>
  );
}
