import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "@/src/roles/admin/AdminHomeScreen";
import AdminPaymentManagementScreen from "@/src/roles/admin/AdminPaymentManagementScreen";
import AdminPropertyManagementScreen from "@/src/roles/admin/AdminPropertyManagementScreen";
import Icon from "react-native-vector-icons/MaterialIcons";
import AdminProfileScreen from "@/src/roles/admin/adminauth/AdminProfileScreen";
import AdminEditProfileScreen from "@/src/roles/admin/adminauth/AdminEditProfileScreen";
import AdminChangePassword from "@/src/roles/admin/adminauth/AdminChangePassword";


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Profile" component={AdminProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={AdminEditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={AdminChangePassword} />
    </Stack.Navigator>
  );
};


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
          } else if (route.name === "Property List") {
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
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
      <Tab.Screen name="Property List" component={AdminPropertyManagementScreen} />
    </Tab.Navigator>
  );
};

export default AdminBottomNav;
