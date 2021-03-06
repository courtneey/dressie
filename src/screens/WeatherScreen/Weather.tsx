import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as ExpoLocation from "expo-location";
import { IconButton, Button, ActivityIndicator } from "react-native-paper";
import secrets from "../../../secrets";
import OutfitScreen from "../OutfitScreen/Outfits";

export interface Weather {
  temp: number;
  category: string;
  description: string;
  tempType: string;
}

export default function WeatherScreen() {
  const [location, setLocation] = useState<ExpoLocation.LocationObject | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState<Weather | null>(null);

  const getLocation = async () => {
    setLoading(true);

    let { status } = await ExpoLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      console.log("Location permission denied");
    }

    let userLocation = await ExpoLocation.getCurrentPositionAsync({});

    setLocation(userLocation);
    setLoading(false);
  };

  const getWeather = async (geolocation: ExpoLocation.LocationObject) => {
    setLoading(true);
    const { latitude, longitude } = geolocation.coords;
    const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${secrets.WEATHER_API_KEY}`;

    try {
      const weatherResponse = await fetch(url);
      const weatherData = await weatherResponse.json();

      // convert temp from Kelvin to Fahrenheit
      let { temp } = weatherData.main;
      temp = Math.floor((temp - 273.15) * 1.8 + 32);

      // create a tempType for matching weather to clothes in db
      let tempType: string = "";
      if (temp <= 45) tempType = "cold";
      if (temp > 45 && temp <= 65) tempType = "mild";
      if (temp > 65) tempType = "hot";

      const finalWeather = {
        temp,
        category: weatherData.weather[0].main,
        description: weatherData.weather[0].description.toLowerCase(),
        tempType,
      };

      setCurrentWeather(finalWeather);
      setLoading(false);
    } catch (err) {
      console.log("There was an issue with getting weather: ", err);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      getWeather(location);
    }
  }, [location]);

  return (
    <View
      style={{
        display: "flex",
        alignSelf: "center",
        alignItems: "center",
        marginTop: 30,
      }}
    >
      {loading ? <ActivityIndicator style={{ marginTop: 100 }} /> : null}
      {location && currentWeather ? (
        <>
          <Text>
            Today's Forecast: {currentWeather?.category} ({currentWeather?.temp}{" "}
            ??F)
          </Text>
          <IconButton icon="tshirt-crew" size={75} color="gray" />
        </>
      ) : null}

      <View style={{ marginTop: 20 }}>
        {location && currentWeather ? (
          <OutfitScreen weather={currentWeather} />
        ) : null}
      </View>
    </View>
  );
}
