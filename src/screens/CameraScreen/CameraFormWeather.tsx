import React, { useEffect, useState } from "react";
import { View, Text, Alert } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  route: {
    params: {
      clothingCategory: string;
      imageUri: string;
      description: string;
      docId: string;
    };
  };
}

export default function CameraFormWeather(props: Props) {
  const { clothingCategory, imageUri, description, docId } = props.route.params;
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
  const navigation = useNavigation();

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
    try {
      setLoading(true);
      setAllWeatherTags();
      setAllTempTags();

      console.log("temptags in add to wardrobe function:", tempTags);

      const index = imageUri.lastIndexOf("=") + 1;
      const fileName = imageUri.substring(index);
      await addDoc(collection(db, "users", `${docId}`, "wardrobe"), {
        image: imageUri,
        id: fileName,
        tempTags: tempTags,
        weatherTags: weatherTags,
        category: clothingCategory,
        name: description,
      });
      setLoading(false);
      Alert.alert(
        "Success!",
        `${description} has been added to your wardrobe.`,
        [
          {
            text: "Continue",
            onPress: () => {
              navigation.popToTop();
              navigation.navigate("Wardrobe");
            },
          },
        ]
      );
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
        <Ionicons
          name={sunChecked ? "sunny" : "sunny-outline"}
          size={40}
          style={{ marginRight: 10 }}
          onPress={() => setSunChecked(!sunChecked)}
          color={sunChecked ? "#A5668B" : "gray"}
        />
        <Text>Sun</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons
          name={rainChecked ? "rainy" : "rainy-outline"}
          size={40}
          style={{ marginRight: 10 }}
          onPress={() => setRainChecked(!rainChecked)}
          color={rainChecked ? "#A5668B" : "gray"}
        />
        <Text>Rain</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons
          name={cloudChecked ? "cloudy" : "cloudy-outline"}
          size={40}
          style={{ marginRight: 10 }}
          onPress={() => setCloudChecked(!cloudChecked)}
          color={cloudChecked ? "#A5668B" : "gray"}
        />
        <Text>Cloud</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons
          name={snowChecked ? "snow" : "snow-outline"}
          size={40}
          style={{ marginRight: 10 }}
          onPress={() => setSnowChecked(!snowChecked)}
          color={snowChecked ? "#A5668B" : "gray"}
        />
        <Text>Snow</Text>
      </View>

      <Text style={{ marginTop: 40, marginBottom: 15, fontSize: 16 }}>
        Which temperatures?
      </Text>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons
          name={hotChecked ? "reorder-four" : "reorder-four-outline"}
          size={40}
          style={{ marginRight: 10 }}
          onPress={() => setHotChecked(!hotChecked)}
          color={hotChecked ? "#A5668B" : "gray"}
        />
        <Text>Hot</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons
          name={mildChecked ? "reorder-three" : "reorder-three-outline"}
          size={40}
          style={{ marginRight: 10 }}
          onPress={() => setMildChecked(!mildChecked)}
          color={mildChecked ? "#A5668B" : "gray"}
        />
        <Text>Mild</Text>
      </View>

      <View
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <Ionicons
          name={coldChecked ? "reorder-two" : "reorder-two-outline"}
          size={40}
          style={{ marginRight: 10 }}
          onPress={() => setColdChecked(!coldChecked)}
          color={coldChecked ? "#A5668B" : "gray"}
        />
        <Text>Cold</Text>
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
