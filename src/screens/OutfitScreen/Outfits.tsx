import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
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

  let renderOutfit:object[] = [];
  if (randomOutfit) {
    renderOutfit = [randomOutfit.top, randomOutfit.bottoms, randomOutfit.shoes, randomOutfit.outerwear]
  }

  const renderItem = ({ item }) => (
    <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
      <Avatar.Text
        size={100}
        label={item.category}
        style={{ justifyContent: 'center', marginBottom: 15, marginRight: 15, backgroundColor: '#fff' }}
        labelStyle={{ fontSize: 20, color: '#000' }}
      />
      <Avatar.Image
        size={100}
        style={{ marginBottom: 15 }}
        source={{uri: item.image}}
      />
    </View>
  );

  return (
    <View style={{ height: '80%', width: 300 }}>
      <View style={{ width: 150, alignSelf: 'center', marginBottom: 30, marginTop: -25 }}>
        <Button mode="contained" onPress={() => {
              getOutfits();
            }}>
              Get Dressed
        </Button>
      </View>


      { renderOutfit.length ? (
          <FlatList
            data={renderOutfit}
            keyExtractor={(item) => item.category}
            renderItem={renderItem}
          />
      ) : null}


      {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        { randomOutfit ?
          (
            <View style={{ display: 'flex', flexDirection: 'row' }}>

              <View style={{ marginRight: 15 }}>
              <Avatar.Text
                size={100}
                label="top"
                style={{ justifyContent: 'center', marginBottom: 15, backgroundColor: '#fff' }}
                labelStyle={{ fontSize: 20, color: '#000' }}
              />
              <Avatar.Text
                size={100}
                label="bottoms"
                style={{ justifyContent: 'center', marginBottom: 15, backgroundColor: '#fff' }}
                labelStyle={{ fontSize: 20, color: '#000' }}
              />
              <Avatar.Text
                size={100}
                label="shoes"
                style={{ justifyContent: 'center', marginBottom: 15, backgroundColor: '#fff' }}
                labelStyle={{ fontSize: 20, color: '#000' }}
              />
              <Avatar.Text
                size={100}
                label="outerwear"
                style={{ justifyContent: 'center', marginBottom: 15, backgroundColor: '#fff' }}
                labelStyle={{ fontSize: 20, color: '#000' }}
              />
              </View>

              <View>
              <Avatar.Image
                size={100}
                style={{ marginBottom: 15 }}
                source={{uri: randomOutfit.top.image}}
              />
              <Avatar.Image
                size={100}
                style={{ marginBottom: 15 }}
                source={{uri: randomOutfit.bottoms.image}}
              />
              <Avatar.Image
                size={100}
                style={{ marginBottom: 15 }}
                source={{uri: randomOutfit.shoes.image}}
              />
              <Avatar.Image
                size={100}
                style={{ marginBottom: 15 }}
                source={{uri: randomOutfit.outerwear.image}}
              />
              </View>

            </View>
          )
          : null
        }
      </View> */}

    </View>
  )

}
