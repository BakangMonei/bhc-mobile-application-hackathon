import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Avatar, Button, Drawer, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";

const CustomDrawerContent = (props) => {
  const { currentUser } = useContext(AuthContext);

  const logout = () => {
    // Implement logout functionality
    console.log("User logged out");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Avatar style={styles.avatar} />
        <Typography variant="h6">{currentUser?.displayName}</Typography>
        <Typography variant="subtitle1">{currentUser?.email}</Typography>
      </View>
      <DrawerItemList {...props} />
      <Button variant="contained" color="secondary" onClick={logout} style={styles.logoutButton}>
        Logout
      </Button>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  profileContainer: {
    padding: 16,
    alignItems: "center",
  },
  avatar: {
    marginBottom: 16,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default CustomDrawerContent;
