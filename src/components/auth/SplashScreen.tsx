import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { CircularProgress, Typography } from '@mui/material';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Login');
    }, 3000); // Redirect to Login screen after 3 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        BHC Smart Housing
      </Typography>
      <CircularProgress color="primary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    marginBottom: 20,
  },
});

export default SplashScreen;
