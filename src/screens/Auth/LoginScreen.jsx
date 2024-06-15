import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email === 'user@mail.com' && password === 'User@12345') {
      navigation.navigate('UserIndex');
    } else if ((email === 'Admin@mail.com' && password === 'Admin@12345') || 
               (email === 'Superadmin@mail.com' && password === 'SuperAdmin@12345')) {
      navigation.navigate('Dashboard');
    } else {
      Alert.alert('Invalid credentials', 'Please check your email and password and try again.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.orangeCircle} />
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/bhc.png")}
          style={styles.logo}
        />
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="envelope" size={20} color="#AD2524" style={styles.icon} />
          <TextInput
            placeholder="Email"
            style={styles.input}
            keyboardType="email-address"
            placeholderTextColor="#AD2524"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon name="lock" size={20} color="#AD2524" style={styles.icon} />
          <TextInput
            placeholder="Password"
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#AD2524"
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text
        style={styles.registerLink}
        onPress={() => navigation.navigate("Register")}
      >
        Don't have an account? Sign Up
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    alignItems: 'center',
  },
  orangeCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 150,
    height: 150,
    backgroundColor: 'orange',
    borderBottomRightRadius: 100,
  },
  header: {
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
    marginTop: 100,
  },
  logo: {
    width: 100,
    marginTop: 100,
    height: 100,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#AD2524',
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 16,
    color: 'black',
  },
  forgotPassword: {
    marginBottom: 20,
    color: '#AD2524',
    alignSelf: 'flex-start',
  },
  loginButton: {
    width: '100%',
    padding: 16,
    backgroundColor: 'orange',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerLink: {
    position: 'absolute',
    bottom: 20,
    color: '#AD2524',
    alignSelf: 'center',
  },
});

export default LoginScreen;
