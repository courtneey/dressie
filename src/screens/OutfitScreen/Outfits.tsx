import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { db } from '../../firebase/config';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { Card, Avatar, Button } from 'react-native-paper';

export default function OutfitScreen({ weather }) {
  const [outfits, setOutfits] = useState(null);
  const { temp, category, description, tempType } = weather;
  const [categorizedItems, setCategorizedItems] = useState(null)
  const [randomOutfit, setRandomOutfit] = useState(null);

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

  const classifyItems = (items:object[]) => {
    let classified = {
      top: [],
      bottoms: [],
      outerwear: [],
      dress: [],
      shoes: []
    }

    items.forEach((item) => {
      const { category } = item;
      classified[category].push(item)
    })

    setCategorizedItems(classified);

  }

  const randomizeResults = (items) => {
    // random outfit should consist of one item from each category

    let newOutfit = {
      top: {},
      bottoms: {},
      outerwear: {},
      dress: {},
      shoes: {}
    }

    newOutfit.top = items.top[Math.floor(Math.random()*items.top.length)];
    newOutfit.bottoms = items.bottoms[Math.floor(Math.random()*items.bottoms.length)];
    newOutfit.outerwear = items.outerwear[Math.floor(Math.random()*items.outerwear.length)];
    newOutfit.dress = items.dress[Math.floor(Math.random()*items.dress.length)];
    newOutfit.shoes = items.shoes[Math.floor(Math.random()*items.shoes.length)];

    setRandomOutfit(newOutfit);

  }


  useEffect(() => {
    if (outfits) {
      // classify items into separate clothing categories
      classifyItems(outfits);
    }

  }, [outfits])

  useEffect(() => {
    if (categorizedItems) {
      // generate a random outfit
      randomizeResults(categorizedItems);
    }

  }, [categorizedItems])

  return (
    <>
      <View style={{ width: 150, alignSelf: 'center', marginBottom: 30, marginTop: -25 }}>
        <Button mode="contained" onPress={() => {
              getOutfits();
            }}>
              Get Dressed
        </Button>
      </View>

      {/* <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
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
      </View> */}

      <View style={{ display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', width: 300 }}>
        { randomOutfit ?
          (
            <>
              <Avatar.Text
                size={100}
                label="top"
                style={{ justifyContent: 'center', marginRight: 15 }}
                labelStyle={{ fontSize: 20 }}
              />
              <Avatar.Image
                size={100}
                source={{uri: randomOutfit.top.image}}
              />

              <Avatar.Image
                size={100}
                source={{uri: randomOutfit.bottoms.image}}
              />
              <Avatar.Text
                size={100}
                label="bottoms"
                style={{ justifyContent: 'center', marginLeft: 15 }}
                labelStyle={{ fontSize: 20 }}
              />

              <Avatar.Text
                size={100}
                label="shoes"
                style={{ justifyContent: 'center', marginRight: 15 }}
                labelStyle={{ fontSize: 20 }}
              />
              <Avatar.Image
                size={100}
                source={{uri: randomOutfit.shoes.image}}
              />

            </>
          )
          : null
        }
      </View>


    </>
  )

}
