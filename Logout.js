import React from "react";
import { auth } from "./src/firebase/config";
import { signOut } from "@firebase/auth";
import { IconButton } from "react-native-paper";

export default function LogOut() {
  const logout = async () => {
    try {
      await signOut(auth);
      console.log("Logged out");
    } catch (err) {
      console.log("There was an issue logging out: ", err);
    }
  };

  return <IconButton icon="logout" color="#A5668B" onPress={() => logout()} />;
}
