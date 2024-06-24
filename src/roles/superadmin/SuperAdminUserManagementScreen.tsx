import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  doc,
} from "firebase/firestore";
import {
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { db, auth } from "../../services/firebase";
import Carousel from "react-material-ui-carousel";

const SuperAdminUserManagementScreen = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "user",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchRole, setSearchRole] = useState("all");

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
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        "tempPassword123"
      );
      const user = userCredential.user;

      const userDocData = { ...form, uid: user.uid };
      if (form.role === "admin") {
        await addDoc(collection(db, "admins"), userDocData);
      } else if (form.role === "superadmin") {
        await addDoc(collection(db, "s_admins"), userDocData);
      } else {
        await addDoc(collection(db, "users"), userDocData);
      }

      await sendPasswordResetEmail(auth, form.email);
      alert(
        `User added successfully. Reset password email sent to ${form.email}. Temporary password is tempPassword123.`
      );

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        role: "user",
        address: "",
        city: "",
        state: "",
        zip: "",
        country: "",
        phone: "",
        username: "",
      });
    } catch (error) {
      console.error("Error adding user: ", error);
      alert("Error adding user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setForm(user);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => {
    setOpenEditModal(false);
    setSelectedUser(null);
  };

  const handleUpdateUser = async () => {
    setLoading(true);
    try {
      const userDoc = doc(db, "users", selectedUser.id);
      await updateDoc(userDoc, form);
      alert("User updated successfully");
      handleCloseEditModal();
    } catch (error) {
      console.error("Error updating user: ", error);
      alert("Error updating user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    setLoading(true);
    try {
      const userDoc = doc(db, "users", id);
      await deleteDoc(userDoc);
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user: ", error);
      alert("Error deleting user. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filterUsersByRole = (role) => {
    if (role === "all") {
      return users;
    }
    return users.filter((user) => user.role === role);
  };

  const handleSearchRoleChange = (e) => {
    setSearchRole(e.target.value);
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
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Zip"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Country"
            name="country"
            value={form.country}
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
            label="Username"
            name="username"
            value={form.username}
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
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : "Add User"}
          </Button>
        </CardContent>
      </Card>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Manage Users
      </Typography>
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Filter by Role</InputLabel>
        <Select
          label="Filter by Role"
          value={searchRole}
          onChange={handleSearchRoleChange}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
          <MenuItem value="superadmin">Superadmin</MenuItem>
        </Select>
      </FormControl>
      <Carousel>
        {filterUsersByRole(searchRole).map((user) => (
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
                onClick={() => handleOpenEditModal(user)}
                style={styles.button}
                disabled={loading}
              >
                Edit User
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDeleteUser(user.id)}
                style={styles.button}
                disabled={loading}
              >
                Delete User
              </Button>
            </CardContent>
          </Card>
        ))}
      </Carousel>
      <Dialog open={openEditModal} onClose={handleCloseEditModal}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
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
            disabled
          />
          <TextField
            label="Address"
            name="address"
            value={form.address}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="City"
            name="city"
            value={form.city}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="State"
            name="state"
            value={form.state}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Zip"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Country"
            name="country"
            value={form.country}
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
            label="Username"
            name="username"
            value={form.username}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdateUser} color="primary" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Update User"}
          </Button>
        </DialogActions>
      </Dialog>
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
