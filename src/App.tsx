import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/auth/SplashScreen';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import BottomNav from './components/common/BottomNav';
import PropertyListingsScreen from './components/properties/PropertyListingsScreen';
import { AuthProvider } from './context/AuthContext';
import SuperAdminDashboard from './roles/superadmin/SuperAdminDashboard';
import AdminDashboard from './roles/admin/AdminDashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={BottomNav} />
          <Stack.Screen name="PropertyListingsScreen" component={PropertyListingsScreen} />
          <Stack.Screen name="SuperAdminDashboard" component={SuperAdminDashboard} />
          <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
