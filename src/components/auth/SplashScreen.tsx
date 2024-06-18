import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { CircularProgress, Typography } from "@mui/material";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Login");
    }, 3000); // Redirect to Login screen after 5 seconds
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/bhc.png")}
        style={styles.logo}
      />
      <Typography variant="h4" component="h3" style={styles.title}>
        BHC Smart Housing
      </Typography>
      <CircularProgress color="primary" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    color: "#333",
  },
});

export default SplashScreen;
