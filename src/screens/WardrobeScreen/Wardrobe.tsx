import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { ActivityIndicator, Avatar } from "react-native-paper";

interface Props {
  route: {
    params: {
      name: string;
      email: string;
      uid: string;
      docId: string;
    };
  };
}

export default function WardrobeScreen(props: Props) {
  const [clothes, setClothes] = useState(null);
  const [loading, setLoading] = useState(false);
  const { docId } = props.route.params;

  useEffect(async () => {
    setLoading(true);
    // load wardrobe items
    const querySnapshot = await getDocs(
      collection(db, "users", docId, "wardrobe")
    );
    let clothesData = [];
    querySnapshot.forEach((doc) => {
      clothesData.push(doc.data());
    });

    setClothes(clothesData);
    setLoading(false);
  }, []);

  return (
    <View style={{ marginTop: 30, alignSelf: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20 }}>Your Wardrobe</Text>

      {loading ? <ActivityIndicator style={{ marginTop: 30 }} /> : null}
      {clothes
        ? clothes.map((item) => (
            <Avatar.Image
              size={150}
              source={{ uri: item.image }}
              style={{ marginBottom: 20 }}
            />
          ))
        : null}
    </View>
  );
}
