import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { TokenCache } from "@clerk/clerk-expo/dist/cache";

const createTokenCache = (): TokenCache => {
    return {
        getToken: (key) => {
            return SecureStore.getItemAsync(key);
        },
        saveToken: (key, token) => {
            return SecureStore.setItemAsync(key, token);
        },
    };
};

// SecureStore is not supported on the web
// https://github.com/expo/expo/issues/7744#issuecomment-611093485
export const tokenCache = Platform.OS !== "web" ? createTokenCache() : undefined;
