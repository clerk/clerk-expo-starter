import * as React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useClerk, useSignUp } from "@clerk/clerk-expo";
import { RootStackScreenProps } from "../types";
import { styles } from "../components/Styles";

export default function SignUpScreen({
  navigation,
}: RootStackScreenProps<"VerifyCode">) {
  const clerk = useClerk();
  const signUp = useSignUp();

  const [code, setCode] = React.useState("");

  const onPress = async () => {
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await clerk.setSession(completeSignUp.createdSessionId);
    } catch (err) {
      // @ts-ignore
      log("Error:> " + (err.errors ? err.errors[0].message : err));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputView}>
        <TextInput
          value={code}
          style={styles.textInput}
          placeholder="Code..."
          placeholderTextColor="#000"
          onChangeText={(code) => setCode(code)}
        />
      </View>
      <TouchableOpacity style={styles.primaryButton} onPress={onPress}>
        <Text style={styles.primaryButtonText}>Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
}
