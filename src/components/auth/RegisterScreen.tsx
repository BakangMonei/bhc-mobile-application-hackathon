import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { TextField, Button, Typography, Link, IconButton } from "@mui/material";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

    if (field === "password") {
      evaluatePasswordStrength(value);
    }
  };

  const evaluatePasswordStrength = (password) => {
    let strength = "Weak";
    if (password.length > 8) {
      strength = "Medium";
    }
    if (password.length > 12) {
      strength = "Strong";
    }
    setPasswordStrength(strength);
  };

  const validateForm = () => {
    let formErrors = {};
    Object.keys(form).forEach((key) => {
      if (!form[key]) {
        formErrors[key] = "This field is required";
      }
    });
    if (form.password !== form.confirmPassword) {
      formErrors.confirmPassword = "Passwords don't match";
    }
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        state: form.state,
        zip: form.zip,
        country: form.country,
        username: form.username,
      });

      navigation.replace("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Typography variant="h4" component="h1" style={styles.title}>
          Register
        </Typography>
        <TextField
          label="First Name"
          value={form.firstName}
          onChange={(e) => handleChange("firstName", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          value={form.lastName}
          onChange={(e) => handleChange("lastName", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email}
        />
        <TextField
          label="Phone"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <TextField
          label="Address"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.address}
          helperText={errors.address}
        />
        <TextField
          label="City"
          value={form.city}
          onChange={(e) => handleChange("city", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.city}
          helperText={errors.city}
        />
        <TextField
          label="State"
          value={form.state}
          onChange={(e) => handleChange("state", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.state}
          helperText={errors.state}
        />
        <TextField
          label="ZIP"
          value={form.zip}
          onChange={(e) => handleChange("zip", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.zip}
          helperText={errors.zip}
        />
        <TextField
          label="Country"
          value={form.country}
          onChange={(e) => handleChange("country", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.country}
          helperText={errors.country}
        />
        <TextField
          label="Username"
          value={form.username}
          onChange={(e) => handleChange("username", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.username}
          helperText={errors.username}
        />
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password}
          InputProps={{
            endAdornment: (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <IconButton>
                  <Icon name={showPassword ? "visibility-off" : "visibility"} />
                </IconButton>
              </TouchableOpacity>
            ),
          }}
        />
        <Typography variant="body2" style={styles.passwordStrength}>
          Password strength: {passwordStrength}
        </Typography>
        <TextField
          label="Confirm Password"
          type={showPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
          InputProps={{
            endAdornment: (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <IconButton>
                  <Icon name={showPassword ? "visibility-off" : "visibility"} />
                </IconButton>
              </TouchableOpacity>
            ),
          }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleRegister}
          style={styles.button}
        >
          Register
        </Button>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigation.navigate("Login")}
          style={styles.link}
        >
          Already have an account? Login
        </Link>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 16,
  },
  link: {
    marginTop: 16,
    textAlign: "center",
  },
  passwordStrength: {
    textAlign: "center",
    marginBottom: 12,
  },
});

export default RegisterScreen;
