import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import PropertyListingsScreen from './PropertyListingsScreen';
import PaymentsScreen from './PaymentsScreen';
import MaintenanceRequestsScreen from './MaintenanceRequestsScreen';
import ProfileScreen from './ProfileScreen';
import BottomNav from '../../components/navigation/BottomNav';

const Stack = createStackNavigator();

const UserIndex = () => {
  return (
    <View style={styles.container}>
      <View style={styles.screenContainer}>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="PropertyListings" component={PropertyListingsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Payments" component={PaymentsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MaintenanceRequests" component={MaintenanceRequestsScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </View>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  screenContainer: {
    flex: 1,
  },
});

export default UserIndex;
