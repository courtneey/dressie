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

LogBox.ignoreLogs(["Warning:..."]);

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

  let screen;
  if (loading) {
    screen = <Stack.Screen name="Loading" component={Loading} />;
  }
  if (user) {
    screen = <Stack.Screen name="Home" component={HomeScreen} />;
  } else {
    screen = (
      <>
        <Stack.Screen name="Sign Up" component={SignupScreen} />
        <Stack.Screen name="Log In" component={LoginScreen} />
      </>
    );
  }

  return (
    <NavigationContainer>
      <PaperProvider theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#A5668B",
            },
            headerTintColor: "#FFFFFF",
            headerTitleAlign: "center",
          }}
        >
          {screen}
        </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}
