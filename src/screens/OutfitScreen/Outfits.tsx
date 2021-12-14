import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { Card, Avatar, Button } from 'react-native-paper';

export default function OutfitScreen({ weather }) {
  const [outfits, setOutfits] = useState<object[]>([]);
  const { temp, category, description, tempType } = weather;

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

  return (
    <>
      <View style={{ width: 150, alignSelf: 'center', marginBottom: 30, marginTop: -25 }}>
        <Button mode="contained" onPress={() => {
              getOutfits();
            }}>
              Get Dressed
        </Button>
      </View>

      <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
        { outfits ?
          (
            outfits.map((outfit) => {
              return (
                <Avatar.Image
                  key={outfit.id}
                  size={100}
                  source={{uri: outfit.image}}
                  style={{ margin: 5 }}
                />
              )
            })
          )
          : null
        }
      </View>
    </>
  )

}
