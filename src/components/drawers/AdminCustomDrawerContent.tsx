import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { Avatar, Button, Typography } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminCustomDrawerContent = (props) => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({ firstName: "", lastName: "" });

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, "admin", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          }
        } catch (error) {
          console.error("Error fetching user profile: ", error);
        }
      }
    };

    fetchProfile();
  }, [currentUser]);

  const logout = () => {
    // Implement logout functionality
    console.log("User logged out");
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.profileContainer}>
        <Avatar style={styles.avatar} />
        <Typography variant="h6">
          {profile.firstName} {profile.lastName}
        </Typography>
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

export default AdminCustomDrawerContent;
