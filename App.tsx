import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignupScreen, LoginScreen, HomeScreen } from './src/screens';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './src/Styles/PaperTheme';

const Stack = createStackNavigator();

export default function App() {

  const [user, setUser] = useState(null);

  return (
  <NavigationContainer>
    <PaperProvider theme={theme}>
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: '#A5668B',
      },
      headerTintColor: '#FFFFFF',
      headerTitleAlign: 'center'
    }}>

      { user ? (
          <Stack.Screen name="Home" component={HomeScreen}/>
        ) : (
          <>
          <Stack.Screen name="Sign Up" component={SignupScreen}/>
          <Stack.Screen name="Log In" component={LoginScreen}/>
          </>
        ) }

    </Stack.Navigator>
    </PaperProvider>
  </NavigationContainer>
  )

}
