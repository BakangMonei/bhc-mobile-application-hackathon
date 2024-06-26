import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import { TextField, Button, Typography, CircularProgress } from "@mui/material";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../services/firebase";
import { AuthContext } from "@/src/context/AuthContext";

const AdminEditProfileScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const docRef = doc(db, "admin", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        Alert.alert("Error", "Error fetching profile. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const validateInputs = () => {
    let valid = true;
    let firstNameError = "";
    let lastNameError = "";

    if (!profile.firstName) {
      firstNameError = "First name is required";
      valid = false;
    }

    if (!profile.lastName) {
      lastNameError = "Last name is required";
      valid = false;
    }

    setErrors({ firstName: firstNameError, lastName: lastNameError });
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const docRef = doc(db, "admin", currentUser.uid);
      await updateDoc(docRef, profile);
      Alert.alert("Success", "Profile updated successfully");
      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      Alert.alert("Error", "Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Edit Profile
      </Typography>
      <TextField
        label="First Name"
        name="firstName"
        value={profile.firstName}
        onChange={(e) => handleChange("firstName", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.firstName}
        helperText={errors.firstName}
        disabled={loading}
      />
      <TextField
        label="Last Name"
        name="lastName"
        value={profile.lastName}
        onChange={(e) => handleChange("lastName", e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.lastName}
        helperText={errors.lastName}
        disabled={loading}
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
        onClick={handleSubmit}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <CircularProgress color="inherit" size={24} />
        ) : (
          "Save Changes"
        )}
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
    color: "#333",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#ff9800",
  },
});

export default AdminEditProfileScreen;
