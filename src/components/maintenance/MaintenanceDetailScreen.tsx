import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Typography, Card, CardContent } from '@mui/material';

const MaintenanceDetailScreen = ({ route }) => {
  const { requestId, requestDetails } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Maintenance Request Details
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Request ID: {requestId}
          </Typography>
          <Typography variant="body2" component="p">
            {requestDetails}
          </Typography>
        </CardContent>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
});

export default MaintenanceDetailScreen;
