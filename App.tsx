import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "./cache";
import * as SplashScreen from "expo-splash-screen";

// Your publishable Key goes here
const publishableKey = "pk_XXXXXXXXXXXXXXXXXXX";

export default function App() {
  const isLoadingComplete = useCachedResources();

  React.useEffect(() => {
    SplashScreen.preventAutoHideAsync();
  }, []);

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
        <SafeAreaProvider>
          <Navigation />
          <StatusBar />
        </SafeAreaProvider>
      </ClerkProvider>
    );
  }
}
