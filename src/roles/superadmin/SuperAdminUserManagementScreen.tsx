import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextField, Button, Typography, Card, CardContent, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import { collection, addDoc, updateDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "../../services/firebase";

const SuperAdminUserManagementScreen = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user", // default role
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => usersData.push({ ...doc.data(), id: doc.id }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleAddUser = async () => {
    try {
      await addDoc(collection(db, "users"), form);
      setForm({ firstName: "", lastName: "", email: "", role: "user" });
    } catch (error) {
      console.error("Error adding user: ", error);
    }
  };

  const handleUpdateUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await updateDoc(userDoc, form);
    } catch (error) {
      console.error("Error updating user: ", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
    } catch (error) {
      console.error("Error deleting user: ", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        User Management
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Add New User
          </Typography>
          <TextField
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={form.lastName}
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
          <FormControl fullWidth margin="normal" variant="outlined">
            <InputLabel>Role</InputLabel>
            <Select
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <MenuItem value="user">User</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="superadmin">Superadmin</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            style={styles.button}
          >
            Add User
          </Button>
        </CardContent>
      </Card>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Manage Users
      </Typography>
      {users.map((user) => (
        <Card key={user.id} style={styles.card}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body2" component="p">
              Email: {user.email}
            </Typography>
            <Typography variant="body2" component="p">
              Role: {user.role}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleUpdateUser(user.id)}
              style={styles.button}
            >
              Update User
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteUser(user.id)}
              style={styles.button}
            >
              Delete User
            </Button>
          </CardContent>
        </Card>
      ))}
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
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
});

export default SuperAdminUserManagementScreen;
