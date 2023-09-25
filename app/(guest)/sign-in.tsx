import { useSignIn } from "@clerk/clerk-expo";
import { Link, Stack } from "expo-router";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import React from "react";
import { log } from "../../logger";
import { OAuthButtons } from "../../components/OAuth";
import { styles } from "../../components/Styles";

export default function Page() {
  const { signIn, setSession, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      await setSession(completeSignIn.createdSessionId);
    } catch (err: any) {
      log("Error:> " + err?.status || "");
      log("Error:> " + err?.errors ? JSON.stringify(err.errors) : err);
    }
  }, [isLoaded, emailAddress, password]);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Sign In",
        }}
      />
      <View style={styles.oauthView}>
        <OAuthButtons />
      </View>

      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          style={styles.textInput}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={password}
          style={styles.textInput}
          placeholder="Password..."
          placeholderTextColor="#000"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onSignInPress}>
        <Text style={styles.primaryButtonText}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Have an account?</Text>

        <Link href="/sign-up" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Sign up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
