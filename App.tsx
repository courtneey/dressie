import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  SignupScreen,
  LoginScreen,
  HomeScreen,
  WeatherScreen,
  CameraScreen,
  WardrobeScreen,
  CameraForm,
  CameraFormWeather,
} from "./src/screens";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/Styles/PaperTheme";
import { onAuthStateChanged, User } from "@firebase/auth";
import { auth, db } from "./src/firebase/config";
import { collection, onSnapshot, DocumentData } from "@firebase/firestore";
import { LogBox } from "react-native";
import Loading from "./src/screens/Loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import LogOut from "./Logout";

LogBox.ignoreAllLogs();

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<DocumentData | null>(null);

  useEffect(() => {
    setLoading(true);
    let userData: DocumentData[] | void;
    // listen to users collection for new users
    onSnapshot(collection(db, "users"), (snapshot) => {
      userData = snapshot.docs.map((doc) => doc.data());

      // listen to sign-in state
      onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
          // if the user is signed in, find their doc
          const correctUser = userData!.find(
            (doc) => doc.uid === currentUser.uid
          );

          // if the user is found, set their data in local state
          if (correctUser) {
            setUser(currentUser);
            setUserData(correctUser);
          }
        } else {
          setUser(null);
        }
      });
    });
    setLoading(false);
  }, []);

  const CameraStack = createNativeStackNavigator();

  const CameraStackScreen = () => {
    return (
      <CameraStack.Navigator>
        <CameraStack.Screen
          name="CameraMain"
          component={CameraScreen}
          options={{
            headerShown: false,
          }}
          initialParams={{ userData }}
        />
        <CameraStack.Screen
          name="CameraForm"
          component={CameraForm}
          // options={{ headerShown: false }}
          initialParams={{ userData }}
        />
        <CameraStack.Screen
          name="CameraFormWeather"
          component={CameraFormWeather}
          initialParams={{ userData }}
        />
      </CameraStack.Navigator>
    );
  };

  const Tab = createBottomTabNavigator();

  let navOptions;
  if (loading) {
    navOptions = <Tab.Screen name="Loading" component={Loading} />;
  }
  if (user && userData) {
    navOptions = (
      <>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerRight: () => LogOut(),
          }}
          initialParams={userData}
        />

        <Tab.Screen
          name="Camera"
          component={CameraStackScreen}
          options={{
            headerRight: () => LogOut(),
          }}
        />

        <Tab.Screen
          name="Wardrobe"
          component={WardrobeScreen}
          options={{
            headerRight: () => LogOut(),
          }}
          initialParams={userData}
        />

        <Tab.Screen
          name="Weather"
          component={WeatherScreen}
          options={{
            headerRight: () => LogOut(),
          }}
        />
      </>
    );
  } else {
    navOptions = (
      <>
        <Tab.Screen name="Sign Up" component={SignupScreen} />
        <Tab.Screen name="Log In" component={LoginScreen} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              switch (route.name) {
                case "Log In":
                  iconName = "log-in";
                  break;
                case "Sign Up":
                  iconName = "clipboard";
                  break;
                case "Home":
                  iconName = "home";
                  break;
                case "Log Out":
                  iconName = "log-out";
                  break;
                case "Weather":
                  iconName = "partly-sunny";
                  break;
                case "Camera":
                  iconName = "camera";
                  break;
                case "Wardrobe":
                  iconName = "shirt";
                  break;
                default:
                  iconName = "help";
              }

              if (!focused) iconName += "-outline";

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "#A5668B",
            tabBarInactiveTintColor: "gray",
            headerTitleAlign: "left",
            headerTitleStyle: {
              fontSize: 18,
            },
          })}
        >
          {navOptions}
        </Tab.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
