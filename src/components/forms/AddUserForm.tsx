import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { auth, db } from "../../services/firebase";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";

const generatePassword = () => {
  return Math.random().toString(36).slice(-8);
};

const AddUserForm = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    username: "",
    role: "user", // Default role
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (field, value) => {
    setUserDetails({ ...userDetails, [field]: value });
  };

  const handleAddUser = async () => {
    setLoading(true);
    const password = generatePassword();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        password
      );
      const user = userCredential.user;

      const collectionName =
        userDetails.role === "s_admin"
          ? "s_admin"
          : userDetails.role === "admin"
          ? "admins"
          : "users";
      await addDoc(collection(db, collectionName), {
        ...userDetails,
        uid: user.uid,
      });

      await sendPasswordResetEmail(auth, userDetails.email);

      alert("User added and password reset email sent!");
    } catch (error) {
      console.error(error);
      alert("Error adding user: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h5" component="h2" style={styles.title}>
        Add User
      </Typography>
      <TextField
        label="First Name"
        value={userDetails.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Last Name"
        value={userDetails.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Email"
        value={userDetails.email}
        onChange={(e) => handleChange("email", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Phone"
        value={userDetails.phone}
        onChange={(e) => handleChange("phone", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Address"
        value={userDetails.address}
        onChange={(e) => handleChange("address", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="City"
        value={userDetails.city}
        onChange={(e) => handleChange("city", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="State"
        value={userDetails.state}
        onChange={(e) => handleChange("state", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="ZIP"
        value={userDetails.zip}
        onChange={(e) => handleChange("zip", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Country"
        value={userDetails.country}
        onChange={(e) => handleChange("country", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Username"
        value={userDetails.username}
        onChange={(e) => handleChange("username", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Role</InputLabel>
        <Select
          value={userDetails.role}
          onChange={(e) => handleChange("role", e.target.value)}
          label="Role"
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="s_admin">Super Admin</MenuItem>
        </Select>
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleAddUser}
        style={styles.button}
        disabled={loading}
      >
        {loading ? "Adding..." : "Add User"}
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
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default AddUserForm;
