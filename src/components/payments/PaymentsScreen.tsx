import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextField, Button, Typography, Card, CardContent } from '@mui/material';

const PaymentsScreen = () => {
  const handlePayment = () => {
    // Handle payment logic
    console.log('Payment made');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Payments
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Make a Payment
          </Typography>
          <TextField label="Amount" fullWidth margin="normal" variant="outlined" />
          <TextField label="Payment Method" fullWidth margin="normal" variant="outlined" />
          <Button variant="contained" color="primary" onClick={handlePayment} style={styles.button}>
            Pay Now
          </Button>
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
  button: {
    marginTop: 16,
    width: '100%',
  },
});

export default PaymentsScreen;
