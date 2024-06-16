import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../roles/superadmin/SuperAdminDashboard";
import SuperAdminUserManagementScreen from "../roles/superadmin/SuperAdminUserManagementScreen";
import SuperAdminContentManagementScreen from "../roles/superadmin/SuperAdminContentManagementScreen";
import SuperAdminAnalyticsScreen from "../roles/superadmin/SuperAdminAnalyticsScreen";
import SuperAdminSecurityManagementScreen from "../roles/superadmin/SuperAdminSecurityManagementScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserManagementStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SuperAdminUserManagementScreen" component={SuperAdminUserManagementScreen} />
  </Stack.Navigator>
);

const ContentManagementStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SuperAdminContentManagementScreen" component={SuperAdminContentManagementScreen} />
  </Stack.Navigator>
);

const AnalyticsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SuperAdminAnalyticsScreen" component={SuperAdminAnalyticsScreen} />
  </Stack.Navigator>
);

const SecurityManagementStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SuperAdminSecurityManagementScreen" component={SuperAdminSecurityManagementScreen} />
  </Stack.Navigator>
);

const SuperAdminMainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "User Management") {
          iconName = "people-outline";
        } else if (route.name === "Content Management") {
          iconName = "create-outline";
        } else if (route.name === "Analytics") {
          iconName = "bar-chart-outline";
        } else if (route.name === "Security Management") {
          iconName = "shield-outline";
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
    <Tab.Screen name="User Management" component={UserManagementStack} />
    <Tab.Screen name="Content Management" component={ContentManagementStack} />
    <Tab.Screen name="Analytics" component={AnalyticsStack} />
    <Tab.Screen name="Security Management" component={SecurityManagementStack} />
  </Tab.Navigator>
);

export default SuperAdminMainNavigator;
