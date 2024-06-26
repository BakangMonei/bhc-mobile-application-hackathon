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
import { signOut } from "firebase/auth";
import { db, auth } from "../../services/firebase";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const UserCustomDrawerContent: React.FC<DrawerContentComponentProps> = (
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
          const docRef = doc(db, "users", currentUser.uid);
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

  const logout = async () => {
    try {
      await signOut(auth);
      props.navigation.navigate("Login");
      console.log("User logged out");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
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
      <View style={styles.footer}>
        <Button
          variant="contained"
          color="primary"
          onClick={logout}
          style={styles.logoutButton}
          startIcon={<ExitToAppIcon />}
        >
          Logout
        </Button>
      </View>
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
    backgroundColor: "#FAA21B",
    width: 64,
    height: 64,
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 16,
  },
  logoutButton: {
    width: "100%",
    backgroundColor: "#AD2524",
    color: "#fff",
  },
});

export default UserCustomDrawerContent;
