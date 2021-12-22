import React, { useState } from "react";
import { View, Text, Platform, Alert, Image } from "react-native";
import {
  Button,
  IconButton,
  Avatar,
  ActivityIndicator,
  TextInput,
} from "react-native-paper";
import SelectDropdown from "react-native-select-dropdown";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { collection, addDoc, doc } from "firebase/firestore";

export default function CameraForm() {
  const [description, setDescription] = useState("");
  const [clothingCategory, setClothingCategory] = useState("");
  const [weatherTags, setWeatherTags] = useState([]);
  const [tempTags, setTempTags] = useState([]);
  const clothingCategoryOptions = [
    "top",
    "bottoms",
    "dress",
    "shoes",
    "outerwear",
  ];

  return (
    <View
      style={{
        display: "flex",
        marginTop: 30,
        width: "80%",
        alignSelf: "center",
      }}
    >
      <TextInput
        mode="outlined"
        placeholder="Item description"
        placeholderTextColor="#aaaaaa"
        onChangeText={(text) => setDescription(text)}
        value={description}
        underlineColorAndroid="transparent"
        autoCapitalize="none"
        style={{ marginBottom: 20 }}
      />
      <SelectDropdown
        data={clothingCategoryOptions}
        defaultButtonText={"Select a category"}
        onSelect={(option) => setClothingCategory(option)}
        buttonStyle={{
          width: "100%",
          backgroundColor: "#f6f6f6",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#707070",
        }}
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
        dropDownStyle={{ backgroundColor: "#EFEFEF" }}
        rowStyle={{ backgroundColor: "#EFEFEF", borderBottomColor: "#C5C5C5" }}
        rowTextStyle={{ color: "#444", textAlign: "left" }}
      />
    </View>
  );
}
