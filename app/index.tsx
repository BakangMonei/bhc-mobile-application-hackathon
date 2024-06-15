import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Stack = createStackNavigator();

const theme = createTheme({
  // Customize your MUI theme here
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>

    </ThemeProvider>
  );
};

registerRootComponent(App);
