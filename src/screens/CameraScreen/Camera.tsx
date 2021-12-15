import React, { useState } from "react";
import { View, Text, Platform, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as ImageResize from "expo-image-manipulator";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../firebase/config";
import {
  Button,
  IconButton,
  Avatar,
  ActivityIndicator,
} from "react-native-paper";

export default function CameraScreen() {
  const [image, setImage] = useState(null);

  const selectImage = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Sorry, we need gallery permissions to do this!");
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) {
      // upload image to cloud storage
      const finalImage = await uploadImage(result.uri);
      return finalImage;
    }
  };

  const useCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera permissions to do this!");
    }

    const result = await ImagePicker.launchCameraAsync({
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
          width: 600,
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
      }}
    >
      <Text style={{ alignSelf: "center" }}>Upload to Your Wardrobe</Text>

      <IconButton icon="wardrobe" size={75} color="gray" />

      <Button
        mode="contained"
        style={{ width: 140, alignSelf: "center", marginBottom: 15 }}
        onPress={async () => {
          const selectedImage = await selectImage();
          if (selectedImage) {
            // retrieve image url from cloud and update local state
            const retrievedUrl = await retrieveImage(selectedImage);
            setImage(retrievedUrl);
            Alert.alert("Added to wardrobe!");
          }
        }}
      >
        Gallery
      </Button>
      <Text>- OR -</Text>
      <Button
        mode="contained"
        style={{ width: 140, alignSelf: "center", marginTop: 15 }}
        onPress={async () => {
          const takenImage = await useCamera();
          if (takenImage) {
            const retrievedUrl = await retrieveImage(takenImage);
            setImage(retrievedUrl);
            Alert.alert("Added to wardrobe!");
          }
        }}
      >
        Camera
      </Button>
      {image ? (
        <View style={{ alignItems: "center", marginTop: 30 }}>
          <Avatar.Image size={260} source={{ uri: image }} />
        </View>
      ) : null}
    </View>
  );
}
