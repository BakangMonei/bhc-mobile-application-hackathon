import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { Avatar, Button, Typography, CircularProgress } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminCustomDrawerContent: React.FC<DrawerContentComponentProps> = (
  props
) => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState<{
    firstName: string;
    lastName: string;
  }>({ firstName: "", lastName: "" });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        try {
          const docRef = doc(db, "admin", currentUser.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setProfile(
              docSnap.data() as { firstName: string; lastName: string }
            );
          }
        } catch (error) {
          console.error("Error fetching user profile: ", error);
        } finally {
          setLoading(false);
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
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Avatar style={styles.avatar}>{profile.firstName.charAt(0)}</Avatar>
            <Typography variant="h6">
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="subtitle1">{currentUser?.email}</Typography>
          </>
        )}
      </View>
      <DrawerItemList {...props} />
      <Button
        variant="contained"
        color="secondary"
        onClick={logout}
        style={styles.logoutButton}
      >
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
    backgroundColor: "#3f51b5",
    width: 64,
    height: 64,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default AdminCustomDrawerContent;
