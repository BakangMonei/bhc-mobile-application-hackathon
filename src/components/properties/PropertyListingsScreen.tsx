import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextField, Button, Typography } from '@mui/material';

const PropertyListingsScreen = () => {
  return (
    <View style={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Add New Property
      </Typography>
      <TextField label="Title" fullWidth margin="normal" variant="outlined" />
      <TextField label="Description" fullWidth margin="normal" variant="outlined" />
      <TextField label="Price" fullWidth margin="normal" variant="outlined" />
      <Button variant="contained" color="primary" style={styles.button}>
        Add Property
      </Button>
    </View>
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
  button: {
    marginTop: 16,
  },
});

export default PropertyListingsScreen;
