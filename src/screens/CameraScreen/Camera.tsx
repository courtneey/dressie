import React, { useState } from "react";
import { View, Text, Platform, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageResize from "expo-image-manipulator";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import { Button, IconButton } from "react-native-paper";

export default function CameraScreen() {
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Sorry, we need camera roll permissions to do this!");
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      // upload image to cloud storage
      const finalImage = await uploadImage(result.uri);
      return finalImage;
    }
  };

  const uploadImage = async (uri) => {
    let resizedImage = await ImageResize.manipulateAsync(uri, [
      {
        resize: {
          width: 300,
        },
      },
    ]);

    const resizedUri = resizedImage.uri;

    const resizedResponse = await fetch(resizedUri);
    const resizedBlob = await resizedResponse.blob();

    // extract filename from uri
    const index = resizedUri.lastIndexOf("/") + 1;
    const fileName = resizedUri.substring(index);

    // create a reference to storage and upload resized image
    const imageStorageRef = ref(storage, `images/${fileName}`);
    await uploadBytes(imageStorageRef, resizedBlob);

    return resizedUri;
  };

  const retrieveImage = async (uri) => {
    // extract filename from uri
    const index = uri.lastIndexOf("/") + 1;
    const fileName = uri.substring(index);

    // create a reference to storage and download this image's URL
    const imageStorageRef = ref(storage, `images/${fileName}`);
    const retrievedUrl = await getDownloadURL(imageStorageRef);

    return retrievedUrl;
  };

  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        alignSelf: "center",
        marginTop: 30,
        width: 300,
      }}
    >
      <Text style={{ alignSelf: "center" }}>Customize Your Wardrobe</Text>

      <IconButton icon="wardrobe" size={75} color="gray" />

      <Button
        mode="contained"
        style={{ width: 150, alignSelf: "center" }}
        onPress={() => {}}
      >
        Upload
      </Button>
    </View>
  );
}
