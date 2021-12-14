import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { Button } from 'react-native-paper';

export default function OutfitScreen({ weather }) {
  const [outfits, setOutfits] = useState<object[]>([]);
  const { temp, category, description } = weather;

  let tempType:string;
  if (temp <= 45) tempType = "cold";
  if (temp > 45 && temp <= 65) tempType = "mild";
  if (temp > 65) tempType = "hot";

  const getOutfits = async () => {
    // search clothing collection for documents containing the applicable tempTag

    let tempOutfits:object[] = [];

    const clothingCollRef = collection(db, "clothing");
    const q = query(clothingCollRef, where("tempTags", "array-contains", `${tempType}`));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempOutfits.push(doc.data());
    })

    setOutfits(tempOutfits);

  }

  useEffect(() => {
    getOutfits();
  }, [])

  return (
    <View>
      { outfits ?
        (
          outfits.map((outfit) => {
            return <Text key={outfit.id}>{outfit.name}</Text>
          })
        )
        : null
      }
    </View>
  )

}
