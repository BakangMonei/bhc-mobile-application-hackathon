import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserNavigator from './UserNavigator';
import AdminNavigator from './AdminNavigator';
import SuperadminNavigator from './SuperadminNavigator';
import { useAuth } from '../contexts/AuthContext';

const Stack = createStackNavigator();

const MainNavigator = () => {
    const { role } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator>
                {role === 'superadmin' && (
                    <Stack.Screen name="Superadmin" component={SuperadminNavigator} />
                )}
                {role === 'admin' && (
                    <Stack.Screen name="Admin" component={AdminNavigator} />
                )}
                {role === 'user' && (
                    <Stack.Screen name="User" component={UserNavigator} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigator;
