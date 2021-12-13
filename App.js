import "react-native-gesture-handler";
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SignupScreen, LoginScreen, HomeScreen } from "./src/screens";
import { Provider as PaperProvider } from "react-native-paper";
import theme from "./src/Styles/PaperTheme";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./src/firebase/config";
import { collection, onSnapshot, doc, getDoc } from "@firebase/firestore";
import { LogBox } from "react-native";
import Loading from "./src/screens/Loading";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import LogOut from "./Logout";

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(async () => {
    setLoading(true);
    let userData;
    // listen to users collection for new users
    onSnapshot(collection(db, "users"), (snapshot) => {
      userData = snapshot.docs.map((doc) => doc.data());

      // listen to sign-in state
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          // if the user is signed in, find their doc
          const correctUser = userData.find(
            (doc) => doc.uid === currentUser.uid
          );

          // if the user is found, set their data in local state
          if (correctUser) {
            setUser(currentUser);
          }
        } else {
          setUser(null);
        }
      });
    });
    setLoading(false);
  }, []);

  const Tab = createBottomTabNavigator();

  let navOptions;
  if (loading) {
    navOptions = <Tab.Screen name="Loading" component={Loading} />;
  }
  if (user) {
    navOptions = (
      <>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
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

              if (route.name === "Log In") {
                iconName = focused ? "log-in" : "log-in-outline";
              } else if (route.name === "Sign Up") {
                iconName = focused ? "clipboard" : "clipboard-outline";
              } else if (route.name === "Home") {
                iconName = focused ? "home" : "home-outline";
              } else if (route.name === "Log Out") {
                iconName = focused ? "log-out" : "log-out-outline";
              }

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
