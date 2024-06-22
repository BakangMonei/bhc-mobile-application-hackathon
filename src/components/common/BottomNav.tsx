import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons";
import HomeScreen from "../home/HomeScreen";
import MaintenanceRequestsScreen from "../maintenance/MaintenanceRequestsScreen";
import PaymentsScreen from "../payments/PaymentsScreen";
import PropertyDetailsScreen from "../properties/PropertyDetailsScreen";
import ProfileScreen from "../profile/ProfileScreen";
import PropertyListingsScreen from "../properties/PropertyListingsScreen"; // Import PropertyListingsScreen
import EditProfileScreen from "../profile/EditProfileScreen";
import ChangePassword from "../profile/ChangePassword";
import ApplicationFormScreen from "../properties/ApplicationFormScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const PropertyStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="PropertyDetailsScreen"
        component={PropertyDetailsScreen}
      />
      <Stack.Screen
        name="PropertyListingsScreen"
        component={PropertyListingsScreen}
      />
      <Stack.Screen
        name="ApplicationFormScreen"
        component={ApplicationFormScreen}
      />
    </Stack.Navigator>
  );
};

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
    </Stack.Navigator>
  );
};

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Properties") {
            iconName = "location-city";
          } else if (route.name === "Payments") {
            iconName = "payment";
          } else if (route.name === "Maintenance") {
            iconName = "build";
          } else if (route.name === "Profile") {
            iconName = "person";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "tomato",
        inactiveTintColor: "gray",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Properties" component={PropertyStackNavigator} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Maintenance" component={MaintenanceRequestsScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
};

export default BottomNav;
