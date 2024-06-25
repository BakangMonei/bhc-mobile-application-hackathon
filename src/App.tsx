import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./components/auth/SplashScreen";
import LoginScreen from "./components/auth/LoginScreen";
import RegisterScreen from "./components/auth/RegisterScreen";
import PropertyDetailsScreen from "./components/properties/PropertyDetailsScreen";
import ProfileScreen from "./components/profile/ProfileScreen";
import { AuthProvider } from "./context/AuthContext";
import BottomNav from "./components/common/BottomNav";
// import SuperAdminDashboard from "./components/common/SuperAdminBottomNav";
import SuperAdminDashboard from "./roles/superadmin/SuperAdminDashboard";
import AdminDashboard from "./components/common/AdminBottomNav";
import AddUserForm from "./components/forms/AddUserForm";
import InformationCenterScreen from "./components/information/InformationCenterScreen";
import InquiryFormScreen from "./components/information/InquiryFormScreen";
import AdminHomeScreen from "./roles/admin/AdminHomeScreen";
import AdminDrawerNavigator  from "./navigation/AdminDrawerNavigator";
import AdminBottomNav from "./components/common/AdminBottomNav";

import DrawerNavigator from "./components/drawers/DrawerNavigator";
import ForgotPassword from "./components/auth/ForgotPassword";

import InboxScreen from "./components/messaging/InboxScreen";
import MessageSendScreen from "./components/messaging/MessageSendScreen";
import MessageDetailScreen from "./components/messaging/MessageDetailScreen";

const Stack = createStackNavigator();

const FAQStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="InformationCenterScreen"
        component={InformationCenterScreen}
      />
      <Stack.Screen name="InquiryFormScreen" component={InquiryFormScreen} />
    </Stack.Navigator>
  );
};
const App: React.FC = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="PropertyDetailsScreen"
            component={PropertyDetailsScreen}
          />
          <Stack.Screen name="Profile" component={ProfileScreen} />
          <Stack.Screen name="Home" component={BottomNav} />
          <Stack.Screen
            name="SuperAdminDashboard"
            component={SuperAdminDashboard}
          />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="AddUserForm" component={AddUserForm} />
          <Stack.Screen
            name="FAQStackNavigator"
            component={FAQStackNavigator}
            
          />

          <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
          <Stack.Screen name="AdminDrawerNavigator" component={AdminDrawerNavigator} />
          <Stack.Screen name="AdminBottomNav" component={AdminBottomNav} />
          <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen name="MessageSendScreen" component={MessageSendScreen}/>
          <Stack.Screen name="InboxScreen" component={InboxScreen}/>
          <Stack.Screen name="MessageDetailScreen" component={MessageDetailScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
