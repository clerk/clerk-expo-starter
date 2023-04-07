import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { log } from "../logger";
import { RootStackScreenProps } from "../types";
import { OAuthButtons } from "../components/OAuth";
import { styles } from "../components/Styles";

export default function SignInScreen({
  navigation,
}: RootStackScreenProps<"SignIn">) {
  const { signIn, setSession, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignInPress = async () => {
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
  };

  const onSignUpPress = () => navigation.replace("SignUp");

  return (
    <View style={styles.container}>
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

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onSignUpPress}
        >
          <Text style={styles.secondaryButtonText}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
