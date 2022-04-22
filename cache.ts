import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

//SecureStore.deleteItemAsync("__clerk_client_jwt");

export async function saveToken(key: string, value: string) {
  // console.log("Save token", key, value);
  await SecureStore.setItemAsync(key, value);
}

export async function getToken(key: string) {
  const value = await SecureStore.getItemAsync(key);
  // console.log("Get token", key, value);
  return value;
}

// SecureStore is not supported on the web
// https://github.com/expo/expo/issues/7744#issuecomment-611093485
export const tokenCache =
  Platform.OS !== "web"
    ? {
        getToken,
        saveToken,
      }
    : undefined;
