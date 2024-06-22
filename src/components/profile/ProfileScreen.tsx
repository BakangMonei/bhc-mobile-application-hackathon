import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { TextField, Button, Typography, Divider } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
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

  useEffect(() => {
    console.log("Profile data has changed:", profile);
  }, [profile]);

  const handleEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handleGoToDAQ = () => {
    navigation.navigate("InformationCenterScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        My Profile
      </Typography>
      <Divider style={styles.divider} />
      <Typography variant="h6" component="h2">
        Profile Information
      </Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={profile.firstName}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={profile.lastName}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled
      />
      <TextField
        label="Email"
        name="email"
        value={profile.email}
        fullWidth
        margin="normal"
        variant="outlined"
        disabled
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleEditProfile}
        style={styles.button}
      >
        Edit Profile
      </Button>
      <Divider style={styles.divider} />
      <Typography variant="h6" component="h2">
        Password Settings
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleChangePassword}
        style={styles.button}
      >
        Change Password
      </Button>
      <Divider style={styles.divider} />
      <Typography variant="h6" component="h2">
        Other Settings
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleGoToDAQ}
        style={styles.button}
      >
        Other Setting 1
      </Button>
      <Button variant="contained" color="secondary" style={styles.button}>
        Other Setting 2
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
  divider: {
    marginVertical: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default ProfileScreen;
