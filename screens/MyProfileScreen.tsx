import * as React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  SignedIn,
  SignedOut,
  useClerk,
  useSession,
  useUser,
} from "@clerk/clerk-expo";
import { log } from "../logger";
import { RootStackScreenProps } from "../types";

export default function SafeMyProfileScreen(
  props: RootStackScreenProps<"MyProfile">
) {
  return (
    <>
      <SignedIn>
        <MyProfileScreen {...props} />
      </SignedIn>
      <SignedOut>
        <View style={styles.container}>
          <Text>Unauthorized</Text>
        </View>
      </SignedOut>
    </>
  );
}

function MyProfileScreen({ navigation }: RootStackScreenProps<"MyProfile">) {
  const { signOut } = useClerk();
  const { getToken } = useSession();
  const { firstName } = useUser();

  const [sessionToken, setSessionToken] = React.useState("");

  const onSignOutPress = async () => {
    try {
      await signOut();
    } catch (err) {
      // @ts-ignore
      log("Error:> " + (err.errors ? err.errors[0].message : err));
    }
  };

  React.useEffect(() => {
    const scheduler = setInterval(async () => {
      const token = await getToken();
      setSessionToken(token);
    }, 1000);

    return () => clearInterval(scheduler);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello {firstName}</Text>
      <TouchableOpacity onPress={onSignOutPress} style={styles.link}>
        <Text style={styles.linkText}>Sign out</Text>
      </TouchableOpacity>
      <Text style={styles.token}>{sessionToken}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  token: {
    marginTop: 15,
    paddingVertical: 15,
    fontSize: 15,
  },
});
