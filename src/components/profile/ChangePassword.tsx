import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextField, Button, Typography } from "@mui/material";
import { auth } from "../../services/firebase";
import { updatePassword } from "firebase/auth";

const ChangePassword = ({ navigation }) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    try {
      const user = auth.currentUser;
      await updatePassword(user, newPassword);
      alert("Password changed successfully");
      navigation.navigate("ChangePassword");

    } catch (error) {
      console.error("Error changing password:", error);
      alert("Error changing password. Please try again.");
    }
  };

  return (
    <View>
      <Typography variant="h6" component="h2">
        Change Password
      </Typography>
      <TextField
        label="Current Password"
        name="currentPassword"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
      />
      <TextField
        label="New Password"
        name="newPassword"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
      />
      <TextField
        label="Confirm New Password"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        type="password"
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
  button: {
    marginTop: 16,
  },
});

export default ChangePassword;
