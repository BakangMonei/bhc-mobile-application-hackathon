import { Image, StyleSheet, Platform } from "react-native";
import { HelloWave } from "@/src/utils/HelloWave";
import ParallaxScrollView from "@/src/utils//ParallaxScrollView";
import { ThemedText } from "@/src/utils/ThemedText";
import { ThemedView } from "@/src/utils/ThemedView";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "@/src/navigation/AppNavigator";
import { AppProvider } from "@/src/statemanagement/AppContext";
import { ThemeProvider } from "@/src/statemanagement/ThemeContext"; // Adjust the import path as per your project structure

export default function HomeScreen() {
  return (
    <ThemeProvider>
      <AppProvider>
        <AppNavigator />
      </AppProvider>
    </ThemeProvider>
  );
}
