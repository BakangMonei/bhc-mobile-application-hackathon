import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { View } from 'react-native';
import { registerRootComponent } from 'expo';
import SplashScreen from '../src/layouts/SplashScreen';
import LoginScreen from '../src/screens/Auth/LoginScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const theme = createTheme({
  // Customize your MUI theme here
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Splash"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

registerRootComponent(App);

