import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as ExpoLocation from 'expo-location';
import { IconButton, Button,ActivityIndicator } from "react-native-paper";
import secrets from "../../../secrets";
import OutfitScreen from '../OutfitScreen/Outfits';


interface Weather {
  temp: number,
  category: string,
  description: string
}

export default function WeatherScreen() {
  const [location, setLocation] = useState<ExpoLocation.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);

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
      const weatherData = await weatherResponse.json();

      // convert temp from Kelvin to Fahrenheit
      let {temp} = weatherData.main;
      temp = Math.floor(((temp - 273.15) * 1.8) + 32);

      const finalWeather = {
        temp,
        category: weatherData.weather[0].main.toLowerCase(),
        description: weatherData.weather[0].description.toLowerCase()
      }

      setCurrentWeather(finalWeather);
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
      {location && currentWeather ?
          <OutfitScreen weather={currentWeather}/> : null
      }
      </View>
    </View>
  );
}
