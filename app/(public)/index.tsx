import { Link, Stack } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../../components/Styles";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import React from "react";

export default function Page() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Home",
        }}
      />
      <Text>Welcome!</Text>
      <SignedIn>
        <Link href={"/profile"} asChild>
          <TouchableOpacity style={{ ...styles.secondaryButton }}>
            <Text style={styles.secondaryButtonText}>Go to Profile</Text>
          </TouchableOpacity>
        </Link>
      </SignedIn>
      <SignedOut>
        <Link href={"/sign-in"} asChild>
          <TouchableOpacity style={{ ...styles.secondaryButton }}>
            <Text style={styles.secondaryButtonText}>Sign In</Text>
          </TouchableOpacity>
        </Link>
        <Link href={"/sign-up"} asChild>
          <TouchableOpacity style={{ ...styles.secondaryButton }}>
            <Text style={styles.secondaryButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </SignedOut>
    </View>
  );
}
