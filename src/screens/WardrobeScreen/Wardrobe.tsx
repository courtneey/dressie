import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { db } from "../../firebase/config";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
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

interface WardrobeItem {
  id: string;
  image: string;
}

export default function WardrobeScreen(props: Props) {
  const [clothes, setClothes] = useState<WardrobeItem[] | null>(null);
  const [loading, setLoading] = useState(false);
  const { docId } = props.route.params;
  console.log("props:", props.route.params);
  console.log("hi2");

  const wardrobeSubRef = collection(db, "users", docId, "wardrobe");

  const loadWardrobe = async () => {
    setLoading(true);
    // load wardrobe items
    const querySnapshot = await getDocs(wardrobeSubRef);
    console.log("query snapshot:", querySnapshot);
    const clothesData: WardrobeItem[] = [];
    querySnapshot.forEach((doc) => {
      clothesData.push(doc.data() as WardrobeItem);
    });

    console.log("clothesData:", clothesData);

    setClothes(clothesData);
    setLoading(false);
  };

  useEffect(() => {
    loadWardrobe();

    // listen to updates to wardrobe subcollection
    const unsub = onSnapshot(wardrobeSubRef, (bbb) => {
      console.log(bbb);
      loadWardrobe();
    });

    return unsub;
  }, []);

  return (
    <View style={{ marginTop: 30, alignSelf: "center", alignItems: "center" }}>
      <Text style={{ marginBottom: 20 }}>Your Wardrobe</Text>

      {loading ? <ActivityIndicator style={{ marginTop: 30 }} /> : null}
      {clothes ? (
        <FlatList
          data={clothes}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={({ item }) => (
            <Avatar.Image
              size={150}
              source={{ uri: item.image }}
              style={{ margin: 10 }}
            />
          )}
        />
      ) : null}
    </View>
  );
}
