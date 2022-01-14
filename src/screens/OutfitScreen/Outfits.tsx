import React, { useEffect, useState, useContext } from "react";
import { View, FlatList } from "react-native";
import { db } from "../../firebase/config";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { Avatar, Button } from "react-native-paper";
import { Weather } from "../WeatherScreen/Weather";
import { UserContext } from "../../../App";

enum Category {
  top = "top",
  bottoms = "bottoms",
  shoes = "shoes",
  outerwear = "outerwear",
  dress = "dress",
}

enum TempTag {
  cold = "cold",
  hot = "hot",
  mild = "mild",
}

enum WeatherTag {
  snow = "snow",
  sun = "sun",
  rain = "rain",
  clouds = "clouds",
}

interface ClothingItem {
  category: Category;
  color: string;
  id: string;
  image: string;
  material: string;
  modelImage?: string;
  name: string;
  section: string;
  tempTags: TempTag[];
  weatherTags: WeatherTag[];
}

interface CategorizedItems {
  [key: string]: ClothingItem[];
}

interface RealOutfit {
  [key: string]: ClothingItem;
}

export default function OutfitScreen({ weather }: { weather: Weather }) {
  const [outfits, setOutfits] = useState<ClothingItem[] | null>(null);
  const { tempType } = weather;
  const [categorizedItems, setCategorizedItems] =
    useState<CategorizedItems | null>(null);
  const [randomOutfit, setRandomOutfit] = useState<RealOutfit | null>(null);
  const { docId } = useContext(UserContext)!;

  const getOutfits = async () => {
    let tempOutfits: ClothingItem[] = [];

    // search clothing collection for documents containing the applicable tempTag
    const clothingCollRef = collection(db, "clothing");
    const q = query(
      clothingCollRef,
      where("tempTags", "array-contains", `${tempType}`)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempOutfits.push(doc.data() as ClothingItem);
    });

    // search user's wardrobe subcollection for applicable items
    const wardrobeSubRef = collection(db, "users", `${docId}`, "wardrobe");
    const wardrobeQuery = query(
      wardrobeSubRef,
      where("tempTags", "array-contains", `${tempType}`)
    );
    const wardrobeQuerySnapshot = await getDocs(wardrobeQuery);
    wardrobeQuerySnapshot.forEach((doc) =>
      tempOutfits.push(doc.data() as ClothingItem)
    );

    setOutfits(tempOutfits);
  };

  const classifyItems = (items: ClothingItem[]) => {
    const classified: CategorizedItems = {};

    // check if category exists in classified obj
    // if it does, push this item into its category
    items.forEach((item) => {
      const { category } = item;
      if (classified[category] === undefined) {
        classified[category] = [item];
      } else {
        classified[category].push(item);
      }
    });

    setCategorizedItems(classified);
  };

  const randomizeResults = (items: CategorizedItems) => {
    const categories = Object.keys(items);

    let newOutfit: RealOutfit = {};

    // assign a random clothing item to each category
    categories.forEach((category) => {
      if (newOutfit[category] === undefined) {
        newOutfit[category] =
          items[category][Math.floor(Math.random() * items[category].length)];
      }
    });

    setRandomOutfit(newOutfit);
  };

  useEffect(() => {
    if (outfits) {
      // classify items into separate clothing categories
      classifyItems(outfits);
    }
  }, [outfits]);

  useEffect(() => {
    if (categorizedItems) {
      // generate a random outfit
      randomizeResults(categorizedItems);
    }
  }, [categorizedItems]);

  let renderOutfit: ClothingItem[] = [];

  if (randomOutfit) {
    renderOutfit = [
      randomOutfit.top,
      randomOutfit.bottoms,
      randomOutfit.shoes,
      randomOutfit.outerwear,
    ];
  }

  const renderItem = ({ item }: { item: ClothingItem }) => {
    if (!item.category) {
      return <View></View>;
    }
    return (
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Avatar.Text
          size={100}
          label={item.category}
          style={{
            justifyContent: "center",
            marginBottom: 15,
            marginRight: 15,
            backgroundColor: "#fff",
          }}
          labelStyle={{ fontSize: 20, color: "#000" }}
        />
        <Avatar.Image
          size={100}
          style={{ marginBottom: 15 }}
          source={{ uri: item.image }}
        />
      </View>
    );
  };

  return (
    <View style={{ height: "80%", width: 300 }}>
      <View
        style={{
          width: 150,
          alignSelf: "center",
          marginBottom: 30,
          marginTop: -25,
        }}
      >
        <Button
          mode="contained"
          onPress={() => {
            getOutfits();
          }}
        >
          Get Dressed
        </Button>
      </View>

      {renderOutfit.length ? (
        <FlatList
          data={renderOutfit}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
      ) : null}
    </View>
  );
}
