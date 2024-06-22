import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SplashScreen from "./components/auth/SplashScreen";
import LoginScreen from "./components/auth/LoginScreen";
import RegisterScreen from "./components/auth/RegisterScreen";
import PropertyListingsScreen from "./components/properties/PropertyListingsScreen";
import PropertyDetailsScreen from "./components/properties/PropertyDetailsScreen";
import ApplicationFormScreen from "./components/properties/ApplicationFormScreen";
import ProfileScreen from "./components/profile/ProfileScreen";
import EditProfileScreen from "./components/profile/EditProfileScreen";
import ChangePassword from "./components/profile/ChangePassword";
import { AuthProvider } from "./context/AuthContext";
import BottomNav from "./components/common/BottomNav";
import SuperAdminDashboard from "./components/common/SuperAdminBottomNav";
import AdminDashboard from "./components/common/AdminBottomNav";
import AddUserForm from "./components/forms/AddUserForm";
import InformationCenterScreen from "./components/information/InformationCenterScreen";
import InquiryFormScreen from "./components/information/InquiryFormScreen";

const Stack = createStackNavigator();

const App = () => {
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
            name="PropertyListingsScreen"
            component={PropertyListingsScreen}
          />
          <Stack.Screen
            name="PropertyDetailsScreen"
            component={PropertyDetailsScreen}
          />
          <Stack.Screen
            name="ApplicationFormScreen"
            component={ApplicationFormScreen}
          />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen
            name="EditProfileScreen"
            component={EditProfileScreen}
          />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="Home" component={BottomNav} />
          <Stack.Screen
            name="SuperAdminDashboard"
            component={SuperAdminDashboard}
          />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
          <Stack.Screen name="AddUserForm" component={AddUserForm} />
          <Stack.Screen
            name="InformationCenterScreen"
            component={InformationCenterScreen}
          />
          <Stack.Screen
            name="InquiryFormScreen"
            component={InquiryFormScreen}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
