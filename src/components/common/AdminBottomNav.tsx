import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../roles/admin/AdminHomeScreen";
import AdminPaymentManagementScreen from "../../roles/admin/AdminPaymentManagementScreen";
import AdminPropertyManagementScreen from "../../roles/admin/AdminPropertyManagementScreen";
import Icon from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const AdminBottomNav: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Profile") {
            iconName = "person";
          } else if (route.name === "Admin") {
            iconName = "admin-panel-settings";
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: "red",
        inactiveTintColor: "black",
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={AdminPaymentManagementScreen} />
      <Tab.Screen name="Admin" component={AdminPropertyManagementScreen} />
    </Tab.Navigator>
  );
};

export default AdminBottomNav;
