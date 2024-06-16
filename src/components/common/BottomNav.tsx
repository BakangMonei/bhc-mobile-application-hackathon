import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../home/HomeScreen';
import MaintenanceRequestsScreen from '../maintenance/MaintenanceRequestsScreen';
import PaymentsScreen from '../payments/PaymentsScreen';
import PropertyDetailsScreen from '../properties/PropertyDetailsScreen';
import ProfileScreen from '../profile/ProfileScreen';
import PropertyListingsScreen from '../properties/PropertyListingsScreen';


const Tab = createBottomTabNavigator();

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Properties') {
            iconName = 'location-city';
          } else if (route.name === 'Payments') {
            iconName = 'payment';
          } else if (route.name === 'Maintenance') {
            iconName = 'build';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          // else if (route.name === 'Profile') {
          //   iconName = 'person';
          // }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Properties" component={PropertyDetailsScreen} />
      <Tab.Screen name="Payments" component={PaymentsScreen} />
      <Tab.Screen name="Maintenance" component={MaintenanceRequestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      {/* <Tab.Screen name="PropertyListingsScreen" component={PropertyListingsScreen} /> */}
      {/*
      <Tab.Screen name="Maintenance" component={MaintenanceRequestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default BottomNav;

