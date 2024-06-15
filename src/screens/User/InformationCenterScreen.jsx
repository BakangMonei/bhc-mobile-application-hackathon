import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const InformationCenterScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Information Center</Text>
      <Text style={styles.content}>Here you will find all the information about BHC products and services, FAQs, and more.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  content: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default InformationCenterScreen;
