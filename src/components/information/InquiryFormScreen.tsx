import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { TextField, Button, Typography } from '@mui/material';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';

const InquiryFormScreen = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    inquiry: '',
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, 'inquiries'), form);
      setForm({ name: '', email: '', inquiry: '' });
      console.log('Inquiry submitted successfully');
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Submit an Inquiry
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Inquiry"
        name="inquiry"
        value={form.inquiry}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit} style={styles.button}>
        Submit
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

export default InquiryFormScreen;
