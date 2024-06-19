import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { TextField, Button, Typography, Divider } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const docRef = doc(db, "users", currentUser.uid);
      await updateDoc(docRef, profile);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile. Please try again.");
    }
  };

  const handleChangePassword = () => {
    // Add logic to navigate to Change Password Screen
    navigation.navigate("ChangePassword");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        My Profile
      </Typography>
      <View style={styles.section}>
        <Typography variant="h6" component="h2" style={styles.sectionTitle}>
          Profile Information
        </Typography>
        <TextField
          label="First Name"
          name="firstName"
          value={profile.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={profile.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          label="Email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
          disabled
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          style={styles.button}
        >
          Update Profile
        </Button>
      </View>
      <Divider style={styles.divider} />
      <View style={styles.section}>
        <Typography variant="h6" component="h2" style={styles.sectionTitle}>
          Settings
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleChangePassword}
          style={styles.button}
        >
          Change Password
        </Button>
      </View>
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  divider: {
    marginVertical: 24,
  },
});

export default ProfileScreen;
