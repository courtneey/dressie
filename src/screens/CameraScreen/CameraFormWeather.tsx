import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput, RadioButton } from "react-native-paper";
import { collection, addDoc, doc } from "firebase/firestore";

const weatherTagOptions = ["snow", "rain", "cloud", "sun"];

const tempTagOptions = ["cold", "hot", "mild"];

export default function CameraFormWeather() {
  const [description, setDescription] = useState("");
  const [weatherTags, setWeatherTags] = useState([]);
  const [tempTags, setTempTags] = useState([]);

  return (
    <View
      style={{
        display: "flex",
        marginTop: 30,
        width: "80%",
        alignSelf: "center",
      }}
    >
      <Text style={{ marginBottom: 20, fontSize: 16 }}>
        Which weather can you wear this in?
      </Text>

      <Button mode="contained">Next</Button>
    </View>
  );
}
