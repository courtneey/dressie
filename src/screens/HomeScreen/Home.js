import React from "react";
import { View } from "react-native";
import { Text, Button } from "react-native-paper";
import { auth } from "../../firebase/config";
import { signOut } from "@firebase/auth";

export default function HomeScreen() {
  return (
    <View style={{ display: "flex", alignSelf: "center", marginTop: 20 }}>
      <Text>Home Screen</Text>
    </View>
  );
}
