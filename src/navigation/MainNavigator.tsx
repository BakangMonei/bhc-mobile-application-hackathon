import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../components/home/HomeScreen";
import PropertyDetailsScreen from "../components/properties/PropertyDetailsScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const RecipesStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="PropertyDetailsScreen" component={PropertyDetailsScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "Recipes") {
          iconName = "book-outline";
        } else if (route.name === "Favorites") {
          iconName = "heart-outline";
        } else if (route.name === "Scales") {
          iconName = "analytics-outline";
        } else if (route.name === "Preferences") {
          iconName = "settings-outline";
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      activeTintColor: "green",
      inactiveTintColor: "black",
    }}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

export default MainNavigator;