import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { log } from "../logger";
import { RootStackScreenProps } from "../types";
import { styles } from "../components/Styles";

export default function SignUpScreen({
  navigation,
}: RootStackScreenProps<"SignUp">) {
  const signUp = useSignUp();
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [emailAddress, setEmailAddress] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSignUpPress = async () => {
    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // https://docs.clerk.dev/popular-guides/passwordless-authentication
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      navigation.navigate("VerifyCode");
    } catch (err) {
      // @ts-ignore
      log("Error:> " + (err.errors ? err.errors[0].message : err));
    }
  };

  const onSignInPress = () => navigation.replace("SignIn");

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={firstName}
          style={styles.textInput}
          placeholder="First name..."
          placeholderTextColor="#000"
          onChangeText={(firstName) => setFirstName(firstName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          value={lastName}
          style={styles.textInput}
          placeholder="Last name..."
          placeholderTextColor="#000"
          onChangeText={(lastName) => setLastName(lastName)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          autoCapitalize="none"
          value={emailAddress}
          style={styles.textInput}
          placeholder="Email..."
          placeholderTextColor="#000"
          onChangeText={(email) => setEmailAddress(email)}
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

      <TouchableOpacity style={styles.primaryButton} onPress={onSignUpPress}>
        <Text style={styles.primaryButtonText}>Sign up</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text>Have an account?</Text>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={onSignInPress}
        >
          <Text style={styles.secondaryButtonText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
