import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../roles/admin/AdminDashboard";
import AdminUserSupportScreen from "../roles/admin/AdminUserSupportScreen";
import AdminContentManagementScreen from "../roles/admin/AdminContentManagementScreen";
import AdminPaymentManagementScreen from "../roles/admin/AdminPaymentManagementScreen";
import AdminReportingScreen from "../roles/admin/AdminReportingScreen";
import { Ionicons } from "@expo/vector-icons";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const UserSupportStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AdminUserSupportScreen" component={AdminUserSupportScreen} />
  </Stack.Navigator>
);

const ContentManagementStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AdminContentManagementScreen" component={AdminContentManagementScreen} />
  </Stack.Navigator>
);

const PaymentManagementStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AdminPaymentManagementScreen" component={AdminPaymentManagementScreen} />
  </Stack.Navigator>
);

const ReportingStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="AdminReportingScreen" component={AdminReportingScreen} />
  </Stack.Navigator>
);

const AdminMainNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home-outline";
        } else if (route.name === "User Support") {
          iconName = "headset-outline";
        } else if (route.name === "Content Management") {
          iconName = "create-outline";
        } else if (route.name === "Payment Management") {
          iconName = "card-outline";
        } else if (route.name === "Reporting") {
          iconName = "analytics-outline";
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
    <Tab.Screen name="User Support" component={UserSupportStack} />
    <Tab.Screen name="Content Management" component={ContentManagementStack} />
    <Tab.Screen name="Payment Management" component={PaymentManagementStack} />
    <Tab.Screen name="Reporting" component={ReportingStack} />
  </Tab.Navigator>
);

export default AdminMainNavigator;
