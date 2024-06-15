import { registerRootComponent } from 'expo';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import SplashScreen from '../src/layouts/SplashScreen';
import LoginScreen from '../src/screens/Auth/LoginScreen';
import HomeScreen from '../src/screens/User/HomeScreen';
import PropertyListingsScreen from '../src/screens/User/PropertyListingsScreen';
import PaymentsScreen from '../src/screens/User/PaymentsScreen';
import MaintenanceRequestsScreen from '../src/screens/User/MaintenanceRequestsScreen';
import InformationCenterScreen from '../src/screens/User/InformationCenterScreen';
import ProfileScreen from '../src/screens/User/ProfileScreen';
import DashboardScreen from '../src/screens/SuperAdmin/DashboardScreen';
import ADashboardScreen from '../src/screens/Admin/DashboardScreen';

import { ThemeProvider, createTheme } from '@mui/material/styles';

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
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PropertyListings"
            component={PropertyListingsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payments"
            component={PaymentsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MaintenanceRequests"
            component={MaintenanceRequestsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InformationCenter"
            component={InformationCenterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ADashboard"
            component={ADashboardScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

registerRootComponent(App);
