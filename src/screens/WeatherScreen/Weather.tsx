
import React, { useEffect, useState } from "react";
import { PermissionsAndroid, Platform, View } from "react-native";
import GetLocation from "react-native-get-location";
import Geolocation from 'react-native-geolocation-service';
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

    console.log('userLocation:', userLocation)

    setLocation(userLocation);
    setLoading(false);

  };

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

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
