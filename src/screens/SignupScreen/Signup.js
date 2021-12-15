import React, { useState } from "react";
import { Text, TextInput, Button, Subheading, Title } from "react-native-paper";
import { View, Image } from "react-native";
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
      <Image
        style={{ width: 140, height: 140, alignSelf: "center" }}
        source={require("../../../assets/logo.jpg")}
      />
      <Title style={{ alignSelf: "center", marginBottom: 5, marginTop: 10 }}>
        Welcome to Dressie
      </Title>
      <Subheading
        style={{ alignSelf: "center", marginBottom: 20, fontSize: 15 }}
      >
        Sign up to get started!
      </Subheading>
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

      <View style={{ textAlign: "center", marginTop: 15 }}>
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
