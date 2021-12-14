
import React, { useState } from "react";
import { View } from "react-native";
import * as ExpoLocation from 'expo-location';
import { IconButton, Button,ActivityIndicator } from "react-native-paper";
import { Text } from "react-native";

export default function WeatherScreen() {
  const [location, setLocation] = useState<ExpoLocation.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);
    console.log('getting location')

    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Location permission denied');
    }

    let userLocation = await ExpoLocation.getCurrentPositionAsync({})

    setLocation(userLocation);
    setLoading(false);

  };


  return (
    <View
      style={{
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 20,
      }}
    >
      <Text>Weather Screen</Text>
      <IconButton icon="tshirt-crew" size={100} color="gray" />
      <Button mode="contained" onPress={() => {
        getLocation();
      }}>
        Press Me
      </Button>


      <View style={{marginTop: 50}}>
      {loading ? <ActivityIndicator/> : null}
      {location ?
        <>
        <Text>Latitude: {location.coords.latitude}</Text>
        <Text>Longitude: {location.coords.longitude}</Text>
        </>
        :
        null
      }
      </View>

    </View>
  );
}
