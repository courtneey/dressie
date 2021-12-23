import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput, Checkbox } from "react-native-paper";
import { collection, addDoc, doc } from "firebase/firestore";

const weatherTagOptions = ["snow", "rain", "cloud", "sun"];

const tempTagOptions = ["cold", "hot", "mild"];

export default function CameraFormWeather(props) {
  const { clothingCategory, clothingImage, description } = props.route.params;
  const [weatherTags, setWeatherTags] = useState([]);
  const [tempTags, setTempTags] = useState([]);
  const [sunChecked, setSunChecked] = useState(false);
  const [rainChecked, setRainChecked] = useState(false);
  const [cloudChecked, setCloudChecked] = useState(false);
  const [snowChecked, setSnowChecked] = useState(false);

  const setAllWeatherTags = () => {
    let allTags = [];
    if (sunChecked) allTags.push("sun");
    if (rainChecked) allTags.push("rain");
    if (cloudChecked) allTags.push("cloud");
    if (snowChecked) allTags.push("snow");

    setWeatherTags(allTags);
  };

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

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Checkbox
          status={sunChecked ? "checked" : "unchecked"}
          onPress={() => setSunChecked(!sunChecked)}
        />
        <Text>Sun</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Checkbox
          status={rainChecked ? "checked" : "unchecked"}
          onPress={() => setRainChecked(!rainChecked)}
        />
        <Text>Rain</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Checkbox
          status={cloudChecked ? "checked" : "unchecked"}
          onPress={() => setCloudChecked(!cloudChecked)}
        />
        <Text>Cloud</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Checkbox
          status={snowChecked ? "checked" : "unchecked"}
          onPress={() => setSnowChecked(!snowChecked)}
        />
        <Text>Snow</Text>
      </View>

      <Button
        mode="contained"
        style={{ marginTop: 20 }}
        onPress={() => {
          setAllWeatherTags();
        }}
      >
        Next
      </Button>
    </View>
  );
}
