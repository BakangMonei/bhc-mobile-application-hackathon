import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextField, Button, Typography } from "@mui/material";
import {
  collection,
  addDoc,
  getDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const InquiryFormScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: currentUser ? currentUser.email : "",
    inquiry: "",
    date: serverTimestamp(),
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setForm((prevForm) => ({
              ...prevForm,
              firstName: userData.firstName || "",
              lastName: userData.lastName || "",
            }));
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      }
    };

    fetchUserDetails();
  }, [currentUser]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      await addDoc(collection(db, "inquiries"), form);
      setForm({
        firstName: "",
        lastName: "",
        email: currentUser ? currentUser.email : "",
        inquiry: "",
        date: serverTimestamp(),
      });
      console.log("Inquiry submitted successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error submitting inquiry:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Submit an Inquiry
      </Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={form.firstName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={form.lastName}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled
      />
      <TextField
        label="Email"
        name="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled
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
      <Button variant="contained" onClick={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#FAA21B",
  },
  button: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#FAA21B",
    color: "#fff",
  },
});

export default InquiryFormScreen;
