import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextField, Button, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const PropertyListingsScreen = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    type: 'rent', // or 'sale'
    image: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'properties'), form);
      // Clear the form or navigate back
      console.log('Property added successfully');
    } catch (error) {
      console.error('Error adding property:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Add New Property
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Price"
        name="price"
        value={form.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Image URL"
        name="image"
        value={form.image}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={styles.button}>
        Add Property
      </Button>
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
  button: {
    marginTop: 16,
  },
});

export default PropertyListingsScreen;
