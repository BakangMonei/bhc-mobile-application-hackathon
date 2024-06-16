import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextField, Button, Typography, Link } from '@mui/material';
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        navigation.replace('Home');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <View style={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Login
      </Typography>
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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        style={styles.button}
      >
        Login
      </Button>
      <Link
        component="button"
        variant="body2"
        onClick={() => navigation.navigate('ForgotPassword')}
        style={styles.link}
      >
        Forgot Password?
      </Link>
      <Link
        component="button"
        variant="body2"
        onClick={() => navigation.navigate('Register')}
        style={styles.link}
      >
        Don't have an account? Register
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 16,
  },
  link: {
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
