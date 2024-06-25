import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import { TextField, Button, Typography, CircularProgress, InputAdornment } from "@mui/material";
import { Email } from "@mui/icons-material";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../services/firebase";

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "" });

  const validateEmail = () => {
    let emailError = "";
    if (!email) {
      emailError = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Email address is invalid";
    }
    setErrors({ email: emailError });
    return emailError === "";
  };

  const handleResetPassword = async () => {
    if (!validateEmail()) return;

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Success", "Password reset email sent. Check your inbox.");
      navigation.navigate("Login");
    } catch (error) {
      alert("Error", "Failed to send password reset email. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topLeftCircle}></View>
      <Image source={require("../../assets/images/bhc.png")} style={styles.logo} />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email />
            </InputAdornment>
          ),
        }}
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleResetPassword}
        style={styles.button}
        disabled={loading}
      >
        {loading ? <CircularProgress color="inherit" size={24} /> : "Reset Password"}
      </Button>
      <Button
        variant="text"
        fullWidth
        onClick={() => navigation.navigate("Login")}
        style={styles.link}
      >
        Back to Login
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
  topLeftCircle: {
    position: "absolute",
    top: -25,
    left: -25,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: "orange",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 24,
    zIndex: 2,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
    zIndex: 2,
  },
  button: {
    marginTop: 16,
    zIndex: 2,
    backgroundColor: "orange",
  },
  link: {
    marginTop: 16,
    textAlign: "center",
    zIndex: 2,
  },
});

export default ForgotPassword;
