import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import {
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { auth } from "../../../services/firebase";
import { updatePassword } from "firebase/auth";
import { Visibility, VisibilityOff, Lock } from "@mui/icons-material";

const AdminChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validateInputs = () => {
    let valid = true;
    let currentPasswordError = "";
    let newPasswordError = "";
    let confirmPasswordError = "";

    if (!currentPassword) {
      currentPasswordError = "Current password is required";
      valid = false;
    }

    if (!newPassword) {
      newPasswordError = "New password is required";
      valid = false;
    } else if (newPassword.length < 6) {
      newPasswordError = "Password must be at least 6 characters";
      valid = false;
    }

    if (newPassword !== confirmPassword) {
      confirmPasswordError = "Passwords do not match";
      valid = false;
    }

    setErrors({
      currentPassword: currentPasswordError,
      newPassword: newPasswordError,
      confirmPassword: confirmPasswordError,
    });
    return valid;
  };

  const handleChangePassword = async () => {
    if (!validateInputs()) return;

    try {
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      Alert.alert("Success", "Password changed successfully");
      navigation.navigate("Profile");
    } catch (error) {
      console.error("Error changing password:", error);
      Alert.alert("Error", "Error changing password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Change Password
      </Typography>
      <TextField
        label="Current Password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        type={showCurrentPassword ? "text" : "password"}
        error={!!errors.currentPassword}
        helperText={errors.currentPassword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        type={showNewPassword ? "text" : "password"}
        error={!!errors.newPassword}
        helperText={errors.newPassword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        label="Confirm New Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        type={showConfirmPassword ? "text" : "password"}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Lock />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleChangePassword}
        style={styles.button}
      >
        Change Password
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#ff9800",
  },
});

export default AdminChangePassword ;
