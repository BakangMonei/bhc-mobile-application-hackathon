import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { CircularProgress, Typography } from "@mui/material";

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Login");
    }, 3000); // Redirect to Login screen after 3 seconds

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.topLeftCircle}></View>
      <View style={styles.topRightCircle}></View>
      <Image
        source={require("../../assets/images/bhc.png")}
        style={styles.logo}
      />
      {/* <Typography variant="h4" component="h3" style={styles.title}>
        BHC Smart Housing
      </Typography> */}
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
    position: "relative",
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    marginBottom: 20,
    color: "#3f51b5",
    textAlign: "center",
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
  topRightCircle: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#ff9800",
  },
});

export default SplashScreen;
