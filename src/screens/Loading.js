import React from "react";
import { ActivityIndicator } from "react-native-paper";
import { View } from "react-native";

export default function Loading() {
  return (
    <View style={{ alignSelf: "center" }}>
      <ActivityIndicator animating={true} />
    </View>
  );
}
