import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { TextField, Button, Typography } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import BottomNav from "../common/BottomNav";

const ApplicationFormScreen = ({ route, navigation }) => {
  const { property } = route.params;
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    propertyId: property.id,
    date: serverTimestamp(),
    status: "Pending",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "applications"), form);

      Alert.alert("Success", "Application submitted successfully", [
        {
          text: "OK",
          onPress: () => {
            setForm({
              name: "",
              email: "",
              phone: "",
              message: "",
              propertyId: property.id,
              date: serverTimestamp(),
              status: "Pending",
            });
            navigation.navigate("PropertyDetailsScreen");
          },
        },
      ]);
    } catch (error) {
      console.error("Error submitting application:", error);
      Alert.alert("Error", "Error submitting application. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Apply for {property.title}
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
        label="Phone"
        name="phone"
        value={form.phone}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={styles.button}
      >
        Submit Application
      </Button>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  button: {
    marginTop: 16,
  },
});

export default ApplicationFormScreen;
