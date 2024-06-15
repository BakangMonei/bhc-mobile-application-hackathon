import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';

const HomeScreen = () => {
  const navigation = useNavigation();
  const { role } = useAuth();

  return (
    <View>
      <Text>Welcome to the BHC Smart Housing App!</Text>
      {role === 'user' && (
        <Button title="View Properties" onPress={() => navigation.navigate('PropertyListings')} />
      )}
    </View>
  );
};

export default HomeScreen;
