import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { collection, getDocs } from "@firebase/firestore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Sign Up");
  };

  const onLoginPress = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const userData = await getDocs(collection(db, "users"));
      const usersArr = userData.docs.map((doc) => ({ ...doc.data() }));
      const correctUser = usersArr.find((doc) => doc.uid === user.user.uid);

      if (correctUser) {
        navigation.navigate("Home");
      } else {
        alert("Invalid email or password.");
      }
    } catch (err) {
      console.log("There was an issue with logging in: ", err);
    }
  };

  return (
    <View
      style={{
        display: "flex",
        alignSelf: "center",
        justifyContent: "center",
        width: "80%",
        marginTop: 20,
      }}
    >
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

      <Button
        style={{ marginTop: 10 }}
        mode="contained"
        onPress={() => onLoginPress()}
      >
        Log In
      </Button>

      <View style={{ textAlign: "center", marginTop: 10 }}>
        <Text>
          Don't have an account?{" "}
          <Text
            style={{ fontWeight: "bold", color: "#A5668B" }}
            onPress={onFooterLinkPress}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}
