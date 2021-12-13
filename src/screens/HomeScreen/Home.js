import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { auth } from "../../firebase/config";
import { signOut } from "@firebase/auth";

export default function HomeScreen() {
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
    } catch (err) {
      console.log("There was an issue logging out: ", err);
    }
  };

  return (
    <View style={{ display: "flex", alignSelf: "center", marginTop: 20 }}>
      <Text>Home Screen</Text>
      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={() => logout()}
      >
        Log Out
      </Button>
    </View>
  );
}
