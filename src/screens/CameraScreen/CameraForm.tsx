import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button, TextInput, RadioButton } from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { collection, addDoc, doc } from "firebase/firestore";

const clothingCategoryOptions = [
  "top",
  "bottoms",
  "dress",
  "shoes",
  "outerwear",
];

const weatherTagOptions = ["snow", "rain", "cloud", "sun"];

const tempTagOptions = ["cold", "hot", "mild"];

export default function CameraForm({ navigation }) {
  const [description, setDescription] = useState("");
  const [clothingCategory, setClothingCategory] = useState("");
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
        What kind of clothing item is this?
      </Text>

      <TextInput
        mode="outlined"
        placeholder="Item description"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setDescription(text)}
        value={description}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        style={{ marginBottom: 20, height: 50 }}
      />
      <SelectDropdown
        data={clothingCategoryOptions}
        defaultButtonText={"Select a category"}
        onSelect={(option) => setClothingCategory(option)}
        buttonStyle={styles.dropdownButton}
        buttonTextStyle={{ color: "#aaaaaa", textAlign: "left" }}
        renderDropdownIcon={(isOpened) => {
          return (
            <FontAwesome
              name={isOpened ? "chevron-up" : "chevron-down"}
              color={"#707070"}
              size={18}
            />
          );
        }}
        dropdownIconPosition={"right"}
        dropDownStyle={styles.dropdownStyle}
        rowStyle={styles.dropdownRow}
        rowTextStyle={styles.dropdownRowText}
      />

      <Button
        mode="contained"
        onPress={() => navigation.navigate("CameraFormWeather")}
      >
        Next
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  dropdownButton: {
    width: "100%",
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#707070",
    marginBottom: 20,
  },
  dropdownButtonText: { color: "#444", textAlign: "left" },
  dropdownStyle: { backgroundColor: "#EFEFEF" },
  dropdownRow: {
    backgroundColor: "#EFEFEF",
    borderBottomColor: "#C5C5C5",
  },
  dropdownRowText: { color: "#444", textAlign: "left" },
});
