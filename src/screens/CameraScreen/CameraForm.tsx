import React, { useState } from "react";
import { View, Text, Platform, Alert, Image } from "react-native";
import {
  Button,
  IconButton,
  Avatar,
  ActivityIndicator,
} from "react-native-paper";
import { collection, addDoc, doc } from "firebase/firestore";

export default function CameraForm() {
  return (
    <View
      style={{
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      <Text style={{ alignSelf: "center" }}>Camera Form</Text>
    </View>
  );
}
