import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import {
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
} from "@mui/material";
import Icon from "react-native-vector-icons/MaterialIcons";
import { auth, db } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import {
  Email,
  Person,
  Phone,
  Home,
  LocationCity,
  Public,
  Lock,
  Visibility,
  VisibilityOff,
  AccountCircle,
  ConfirmationNumber,
} from "@mui/icons-material";

const RegisterScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
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
    role: "user",
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
    if (password.length > 10) {
      const hasUpperCase = /[A-Z]/.test(password);
      const hasLowerCase = /[a-z]/.test(password);
      const hasNumbers = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

      if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar) {
        strength = "Strong";
      } else {
        strength = "Medium";
      }
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
        role: "user",
      });

      navigation.replace("Home");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/bhc.png")}
          style={styles.logo}
        />
        <Typography variant="h4" component="h1" style={styles.title}>
          Create An Account
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Person />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Phone />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Home />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LocationCity />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Public />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ConfirmationNumber />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Public />
              </InputAdornment>
            ),
          }}
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
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
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
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
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
            startAdornment: (
              <InputAdornment position="start">
                <Lock />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
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
    backgroundColor: "#fff",
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 24,
  },
  title: {
    marginBottom: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 16,
    backgroundColor: "#ff9800",
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
