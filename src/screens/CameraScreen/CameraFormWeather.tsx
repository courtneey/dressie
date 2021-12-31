import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import {
  Button,
  TextInput,
  Checkbox,
  ActivityIndicator,
} from "react-native-paper";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";

const weatherTagOptions = ["snow", "rain", "cloud", "sun"];

const tempTagOptions = ["cold", "hot", "mild"];

export default function CameraFormWeather(props) {
  const { clothingCategory, imageUri, description, docId } = props.route.params;
  console.log("imageUri:", imageUri);
  const [loading, setLoading] = useState(false);
  const [weatherTags, setWeatherTags] = useState<string[]>([]);
  const [tempTags, setTempTags] = useState<string[]>([]);
  const [sunChecked, setSunChecked] = useState(false);
  const [rainChecked, setRainChecked] = useState(false);
  const [cloudChecked, setCloudChecked] = useState(false);
  const [snowChecked, setSnowChecked] = useState(false);
  const [hotChecked, setHotChecked] = useState(false);
  const [coldChecked, setColdChecked] = useState(false);
  const [mildChecked, setMildChecked] = useState(false);

  const setAllWeatherTags = () => {
    let chosenWeatherTags = [];
    if (sunChecked) chosenWeatherTags.push("sun");
    if (rainChecked) chosenWeatherTags.push("rain");
    if (cloudChecked) chosenWeatherTags.push("cloud");
    if (snowChecked) chosenWeatherTags.push("snow");

    setWeatherTags(chosenWeatherTags);
  };

  const setAllTempTags = () => {
    let chosenTempTags = [];

    if (hotChecked) chosenTempTags.push("hot");
    if (coldChecked) chosenTempTags.push("cold");
    if (mildChecked) chosenTempTags.push("mild");

    setTempTags(chosenTempTags);
  };

  const addToWardrobe = async () => {
    console.log("image uri:", imageUri);
    try {
      setLoading(true);
      setAllWeatherTags();
      setAllTempTags();

      const index = imageUri.lastIndexOf("=") + 1;
      const fileName = imageUri.substring(index);
      await addDoc(collection(db, "users", `${docId}`, "wardrobe"), {
        image: imageUri,
        id: fileName,
        tempTags,
        weatherTags,
        category: clothingCategory,
        name: description,
      });
      setLoading(false);
      Alert.alert("Added to wardrobe!");
    } catch (e) {
      console.log("There was an issue with adding to wardrobe: ", e);
    }
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
      <Text style={{ marginBottom: 15, fontSize: 16 }}>
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

      <Text style={{ marginTop: 40, marginBottom: 15, fontSize: 16 }}>
        Which temperatures?
      </Text>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Checkbox
          status={hotChecked ? "checked" : "unchecked"}
          onPress={() => setHotChecked(!hotChecked)}
        />
        <Text>Hot</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Checkbox
          status={coldChecked ? "checked" : "unchecked"}
          onPress={() => setColdChecked(!coldChecked)}
        />
        <Text>Cold</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Checkbox
          status={mildChecked ? "checked" : "unchecked"}
          onPress={() => setMildChecked(!mildChecked)}
        />
        <Text>Mild</Text>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} />
      ) : (
        <Button
          mode="contained"
          style={{ marginTop: 40 }}
          onPress={() => {
            addToWardrobe();
          }}
        >
          Add to Wardrobe
        </Button>
      )}
    </View>
  );
}
