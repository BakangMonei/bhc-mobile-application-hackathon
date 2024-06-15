import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card } from '../../components/common/Card';

const payments = [
  { id: '1', date: '2023-01-01', amount: '$1000', status: 'Paid' },
  { id: '2', date: '2023-02-01', amount: '$1000', status: 'Pending' },
  // Add more payment records here
];

const PaymentsScreen = () => {
  const renderItem = ({ item }) => (
    <Card>
      <Text style={styles.paymentDate}>{item.date}</Text>
      <Text style={styles.paymentAmount}>{item.amount}</Text>
      <Text style={styles.paymentStatus}>{item.status}</Text>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={payments}
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
  paymentDate: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  paymentAmount: {
    fontSize: 16,
    color: '#333',
  },
  paymentStatus: {
    fontSize: 14,
    color: '#666',
  },
});

export default PaymentsScreen;
