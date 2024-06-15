import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '../../components/common/Card';

const requests = [
  { id: '1', title: 'Leaky faucet', status: 'Pending' },
  { id: '2', title: 'Broken window', status: 'Completed' },
  // Add more maintenance requests here
];

const MaintenanceRequestsScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <Card>
      <Text style={styles.requestTitle}>{item.title}</Text>
      <Text style={styles.requestStatus}>{item.status}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('NewRequest')}
      >
        <Text style={styles.addButtonText}>Add New Request</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  requestTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  requestStatus: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: 'orange',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MaintenanceRequestsScreen;
