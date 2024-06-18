import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import EditIcon from "@mui/icons-material/Edit";

const SuperAdminUserManagementScreen = () => {
  const [users, setUsers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [sAdmins, setSAdmins] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const adminsSnapshot = await getDocs(collection(db, "admins"));
      const sAdminsSnapshot = await getDocs(collection(db, "s_admin"));

      setUsers(
        usersSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setAdmins(
        adminsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
      setSAdmins(
        sAdminsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchUsers();
  }, []);

  const handleEditUser = (user) => {
    // Implement the edit functionality
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        User Management
      </Typography>
      <Typography variant="h5" component="h2" style={styles.sectionTitle}>
        Super Administrators
      </Typography>
      <Carousel>
        {sAdmins.map((user) => (
          <Card key={user.id} style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" component="p">
                {user.email}
              </Typography>
              <IconButton onClick={() => handleEditUser(user)} color="primary">
                <EditIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Carousel>
      <Typography variant="h5" component="h2" style={styles.sectionTitle}>
        Administrators
      </Typography>
      <Carousel>
        {admins.map((user) => (
          <Card key={user.id} style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" component="p">
                {user.email}
              </Typography>
              <IconButton onClick={() => handleEditUser(user)} color="primary">
                <EditIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Carousel>
      <Typography variant="h5" component="h2" style={styles.sectionTitle}>
        Users
      </Typography>
      <Carousel>
        {users.map((user) => (
          <Card key={user.id} style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body2" component="p">
                {user.email}
              </Typography>
              
              <IconButton onClick={() => handleEditUser(user)} color="primary" style={styles.editButton}>
                <EditIcon />
              </IconButton>
            </CardContent>
          </Card>
        ))}
      </Carousel>
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
    marginTop: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 16,
  },
  editButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});

export default SuperAdminUserManagementScreen;
