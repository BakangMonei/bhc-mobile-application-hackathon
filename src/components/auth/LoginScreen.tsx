import React, { useState } from "react";
import { View, StyleSheet, Image, Alert } from "react-native";
import {
  TextField,
  Button,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { auth, db } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validateInputs = () => {
    let valid = true;
    let emailError = "";
    let passwordError = "";

    if (!email) {
      emailError = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      emailError = "Email address is invalid";
      valid = false;
    }

    if (!password) {
      passwordError = "Password is required";
      valid = false;
    } else if (password.length < 6) {
      passwordError = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors({ email: emailError, password: passwordError });
    return valid;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const userQuery = query(
        collection(db, "users"),
        where("email", "==", email)
      );
      const adminQuery = query(
        collection(db, "admin"),
        where("email", "==", email)
      );
      const superAdminQuery = query(
        collection(db, "s_admin"),
        where("email", "==", email)
      );

      const userSnapshot = await getDocs(userQuery);
      const adminSnapshot = await getDocs(adminQuery);
      const superAdminSnapshot = await getDocs(superAdminQuery);

      if (!superAdminSnapshot.empty) {
        navigation.replace("SuperAdminDashboard");
      } else if (!adminSnapshot.empty) {
        navigation.replace("AdminDrawerNavigator");
      } else if (!userSnapshot.empty) {
        navigation.replace("DrawerNavigator");
      } else {
        Alert.alert("Error", "No such document!");
      }
    } catch (error) {
      Alert.alert("Error", "Incorrect email or password. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <View style={styles.container}>
      <View style={styles.topLeftCircle}></View>
      <Image
        source={require("../../assets/images/bhc.png")}
        style={styles.logo}
      />
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
      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
              <IconButton onClick={handleClickShowPassword}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Link
        component="button"
        variant="body2"
        onClick={() => navigation.navigate("ForgotPassword")}
        style={styles.forgotPasswordLink}
      >
        Forgot Password?
      </Link>
      <Button
        variant="contained"
        fullWidth
        onClick={handleLogin}
        style={styles.button}
        disabled={loading}
      >
        {loading ? <CircularProgress color="inherit" size={24} /> : "Login"}
      </Button>
      <Link
        component="button"
        variant="body2"
        onClick={() => navigation.navigate("Register")}
        style={styles.registerLink}
      >
        Don't have an account? Register
      </Link>
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
    top: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ff9800",
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
  forgotPasswordLink: {
    marginTop: 4,
    alignSelf: "flex-start",
  },
  registerLink: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
});

export default LoginScreen;