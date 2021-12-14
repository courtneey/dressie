
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import * as ExpoLocation from 'expo-location';
import { IconButton, Button,ActivityIndicator } from "react-native-paper";
import { Text } from "react-native";
import secrets from "../../../secrets";

export default function WeatherScreen() {
  const [location, setLocation] = useState<ExpoLocation.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<Response | null>(null);

  const getLocation = async () => {
    setLoading(true);

    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Location permission denied');
    }

    let userLocation = await ExpoLocation.getCurrentPositionAsync({})

    setLocation(userLocation);
    setLoading(false);

  };

  const getWeather = async (geolocation:ExpoLocation.LocationObject) => {
    setLoading(true);
    const {latitude, longitude} = geolocation.coords;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${secrets.WEATHER_API_KEY}`;

    try {
      const weatherResponse = await fetch(url);
      console.log('weather response:', weatherResponse);
      setCurrentWeather(await weatherResponse.json());
      setLoading(false);
    } catch (err) {
      console.log('There was an issue with getting weather: ', err);
    }
  }

  useEffect(() => {
    if (location) {
      getWeather(location);
    }
  }, [location])

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


      <View style={{marginTop: 20}}>
      {loading ? <ActivityIndicator/> : null}
      {location ?
        <>
        <Text>Latitude: {location.coords.latitude}</Text>
        <Text>Longitude: {location.coords.longitude}</Text>

        <Text style={{marginTop: 20}}>Current Weather: {JSON.stringify(currentWeather)}</Text>
        </>
        :
        null
      }
      </View>



    </View>
  );
}
