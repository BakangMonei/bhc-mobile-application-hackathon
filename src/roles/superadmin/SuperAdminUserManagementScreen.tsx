import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const SuperAdminUserManagementScreen = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    role: "user",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const usersList = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setUserData({
      fullName: user.fullName,
      email: user.email,
      role: user.role,
    });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id));
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSave = async () => {
    if (editingUser) {
      await updateDoc(doc(db, "users", editingUser), userData);
    } else {
      await setDoc(doc(collection(db, "users")), userData);
    }
    setEditingUser(null);
    setUserData({ fullName: "", email: "", role: "user" });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        User Management
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <TextField
            label="Full Name"
            value={userData.fullName}
            onChange={(e) =>
              setUserData({ ...userData, fullName: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={userData.email}
            onChange={(e) =>
              setUserData({ ...userData, email: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Role"
            value={userData.role}
            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
            style={styles.button}
          >
            {editingUser ? "Update User" : "Add User"}
          </Button>
        </CardContent>
      </Card>
      <DataGrid
        rows={users}
        columns={[
          { field: "fullName", headerName: "Full Name", width: 200 },
          { field: "email", headerName: "Email", width: 200 },
          { field: "role", headerName: "Role", width: 150 },
          {
            field: "actions",
            headerName: "Actions",
            width: 150,
            renderCell: (params) => (
              <div>
                <IconButton
                  onClick={() => handleEdit(params.row)}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDelete(params.row.id)}
                  color="secondary"
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ),
          },
        ]}
        pageSize={5}
        style={{ height: 400, width: "100%", marginTop: 16 }}
      />
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
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default SuperAdminUserManagementScreen;
