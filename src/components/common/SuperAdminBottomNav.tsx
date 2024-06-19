import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SuperAdminAnalyticsScreen from "@/src/roles/superadmin/SuperAdminAnalyticsScreen";
import SuperAdminContentManagementScreen from "@/src/roles/superadmin/SuperAdminContentManagementScreen";
import SuperAdminDashboard from "@/src/roles/superadmin/SuperAdminDashboard";
import SuperAdminSecurityManagementScreen from "@/src/roles/superadmin/SuperAdminSecurityManagementScreen";
import SuperAdminUserManagementScreen from "@/src/roles/superadmin/SuperAdminUserManagementScreen";

const Tab = createBottomTabNavigator();

const SuperAdminBottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home";
          } else if (route.name === "Analytics") {
            iconName = "location-city";
          } else if (route.name === "Content Management") {
            iconName = "payment";
          } else if (route.name === "Security Management") {
            iconName = "build";
          } else if (route.name === "User Management") {
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
      <Tab.Screen name="Dashboard" component={SuperAdminDashboard} />
      <Tab.Screen
        name="Analytics"
        component={SuperAdminAnalyticsScreen}
      />
      <Tab.Screen
        name="Content Management"
        component={SuperAdminContentManagementScreen}
      />
      <Tab.Screen
        name="Security Management"
        component={SuperAdminSecurityManagementScreen}
      />
      <Tab.Screen
        name="User Management"
        component={SuperAdminUserManagementScreen}
      />
    </Tab.Navigator>
  );
};

export default SuperAdminBottomNav;