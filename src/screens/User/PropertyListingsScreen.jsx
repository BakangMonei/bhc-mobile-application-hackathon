import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from '../../components/common/Card';

const properties = [
  { id: '1', name: 'Property 1', description: 'Description 1' },
  { id: '2', name: 'Property 2', description: 'Description 2' },
  // Add more properties here
];

const PropertyListingsScreen = () => {
  const renderItem = ({ item }) => (
    <Card>
      <Text style={styles.propertyName}>{item.name}</Text>
      <Text style={styles.propertyDescription}>{item.description}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={properties}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  propertyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  propertyDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default PropertyListingsScreen;
