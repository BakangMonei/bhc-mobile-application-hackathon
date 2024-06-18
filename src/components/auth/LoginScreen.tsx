import React, { useState } from "react";
import { View, StyleSheet, Image } from "react-native";
import { TextField, Button, Typography, Link } from "@mui/material";
import { auth, db } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
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
        collection(db, "admins"),
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
        navigation.replace("AdminDashboard");
      } else if (!userSnapshot.empty) {
        navigation.replace("Home");
      } else {
        console.error("No such document!");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
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
        color="primary"
        fullWidth
        onClick={handleLogin}
        style={styles.button}
        disabled={loading}
      >
        {loading ? "Logging in..." : "Login"}
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
    top: -20,
    left: -20,
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "orange",
  },
  logo: {
    width: 100,
    height: 100,
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
  },
  forgotPasswordLink: {
    marginTop: 4,
    alignSelf: "flex-start",
    zIndex: 2,
  },
  registerLink: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    zIndex: 2,
  },
});

export default LoginScreen;
