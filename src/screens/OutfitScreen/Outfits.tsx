import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

export default function OutfitScreen({ weather }) {
  const { temp, category, description } = weather;

  let tempType;
  if (temp <= 45) tempType = "cold";
  if (temp > 45 && temp <= 65) tempType = "mild";
  if (temp > 65) tempType = "hot";

  const getOutfits = async () => {

  }

  return (
    <>
    <Text style={{ marginTop: 20 }}>Outfit Screen</Text>

    <Text>Temperature: {temp}</Text>
    <Text>Category: {category}</Text>
    <Text>Description: {description}</Text>

    </>
  )

}
