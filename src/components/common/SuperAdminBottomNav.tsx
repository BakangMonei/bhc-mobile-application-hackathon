import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SuperAdminAnalyticsScreen from '@/src/roles/superadmin/SuperAdminAnalyticsScreen';
import SuperAdminContentManagementScreen from '@/src/roles/superadmin/SuperAdminContentManagementScreen';
import SuperAdminDashboard from '@/src/roles/superadmin/SuperAdminDashboard';
import SuperAdminSecurityManagementScreen from '@/src/roles/superadmin/SuperAdminSecurityManagementScreen';
import SuperAdminUserManagementScreen from '@/src/roles/superadmin/SuperAdminUserManagementScreen';


const Tab = createBottomTabNavigator();

const SuperAdminBottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'SuperAdminDashboard ') {
            iconName = 'home';
          } else if (route.name === 'SuperAdminAnalyticsScreen') {
            iconName = 'location-city';
          } else if (route.name === 'SuperAdminContentManagementScreen') {
            iconName = 'payment';
          } else if (route.name === 'SuperAdminSecurityManagementScreen') {
            iconName = 'build';
          } else if (route.name === 'SuperAdminUserManagementScreen') {
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
      <Tab.Screen name="SuperAdminDashboard " component={SuperAdminDashboard } />
      <Tab.Screen name="SuperAdminAnalyticsScreen" component={SuperAdminAnalyticsScreen} />
      <Tab.Screen name="SuperAdminContentManagementScreen" component={SuperAdminContentManagementScreen} />
      <Tab.Screen name="SuperAdminSecurityManagementScreen" component={SuperAdminSecurityManagementScreen} />
      <Tab.Screen name="SuperAdminUserManagementScreen" component={SuperAdminUserManagementScreen} />
      {/* <Tab.Screen name="PropertyListingsScreen" component={PropertyListingsScreen} /> */}
      {/*
      <Tab.Screen name="Maintenance" component={MaintenanceRequestsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} /> */}
    </Tab.Navigator>
  );
};

export default SuperAdminBottomNav;

