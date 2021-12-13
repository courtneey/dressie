import React, { useState } from "react";
import { Text, TextInput, Button } from "react-native-paper";
import { View } from "react-native";
import { db, auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "@firebase/auth";
import { addDoc, collection } from "firebase/firestore";

export default function SignupScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Log In");
  };

  const onSignupPress = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = response.user.uid;

      const userData = {
        uid,
        name,
        email,
      };

      addDoc(collection(db, "users"), userData);
      console.log("Sucessfully added to users collection.");
    } catch (err) {
      console.log("There was an issue with adding a user: ", err);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignSelf: "center",
        width: "80%",
        marginTop: 20,
      }}
    >
      <TextInput
        mode="outlined"
        placeholder="Name"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setName(text)}
        value={name}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        mode="outlined"
        placeholder="Email"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        mode="outlined"
        secureTextEntry
        placeholder="Password"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setPassword(text)}
        value={password}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <TextInput
        mode="outlined"
        secureTextEntry
        placeholder="Confirm Password"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setConfirmPassword(text)}
        value={confirmPassword}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
      />

      <Button
        style={{ marginTop: 10 }}
        mode="contained"
        onPress={() => onSignupPress()}
      >
        Create Account
      </Button>

      <View style={{ textAlign: "center", marginTop: 10 }}>
        <Text>
          Already have an account?{" "}
          <Text
            style={{ fontWeight: "bold", color: "#A5668B" }}
            onPress={onFooterLinkPress}
          >
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
}
