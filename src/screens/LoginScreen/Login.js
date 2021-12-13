import React, { useState } from "react";
import { View } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onFooterLinkPress = () => {
    navigation.navigate("Sign Up");
  };

  const onLoginPress = () => {};

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
