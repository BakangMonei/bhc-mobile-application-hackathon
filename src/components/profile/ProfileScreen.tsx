import React, { useContext, useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  TextField,
  Button,
  Typography,
  Divider,
  CircularProgress,
  Avatar,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";

const ProfileScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProfile(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUser]);

  const handleEditProfile = () => {
    navigation.navigate("EditProfileScreen");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePassword");
  };

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Typography variant="h4" component="h1" style={styles.title}>
        My Profile
      </Typography> */}
      <Divider style={styles.divider} />
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <View style={styles.avatarContainer}>
            <Avatar style={styles.avatar}>{profile.firstName.charAt(0)}</Avatar>
            <Typography variant="h6" style={styles.name}>
              {profile.firstName} {profile.lastName}
            </Typography>
            <Typography variant="subtitle1">{currentUser?.email}</Typography>
          </View>
          <Divider style={styles.divider} />
          <Typography variant="h6" component="h2" style={styles.sectionTitle}>
            Profile Information
          </Typography>
          <TextField
            label="First Name"
            name="firstName"
            value={profile.firstName}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={profile.lastName}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
          />
          <TextField
            label="Email"
            name="email"
            value={profile.email}
            fullWidth
            margin="normal"
            variant="outlined"
            disabled
          />
          <Button
            variant="contained"
            style={styles.editButton}
            onClick={handleEditProfile}
            startIcon={<EditIcon />}
          >
            Edit Profile
          </Button>
          <Divider style={styles.divider} />
          <Typography variant="h6" component="h2" style={styles.sectionTitle}>
            Password Settings
          </Typography>
          <Button
            variant="contained"
            style={styles.secondaryButton}
            onClick={handleChangePassword}
            startIcon={<LockIcon />}
          >
            Change Password
          </Button>
          <Divider style={styles.divider} />
          <Typography variant="h6" component="h2" style={styles.sectionTitle}>
            Other Settings
          </Typography>
          <Button
            variant="contained"
            style={styles.secondaryButton}
            startIcon={<SettingsIcon />}
          >
            Other Setting 1
          </Button>
          <Button
            variant="contained"
            style={styles.secondaryButton}
            startIcon={<SettingsIcon />}
          >
            Other Setting 2
          </Button>
          <Divider style={styles.divider} />
          <Typography variant="h6" component="h2" style={styles.sectionTitle}>
            Logout
          </Typography>
          <Button
            variant="contained"
            style={styles.logoutButton}
            onClick={handleLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#FAA21B",
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    color: "#FAA21B",
  },
  divider: {
    marginVertical: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatar: {
    marginBottom: 16,
    backgroundColor: "#FAA21B",
    width: 64,
    height: 64,
  },
  name: {
    fontWeight: "bold",
    marginBottom: 8,
    color: "#AD2524",
  },
  editButton: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#FAA21B",
    color: "#fff",
  },
  secondaryButton: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#AD2524",
    color: "#fff",
  },
  logoutButton: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#AD2524",
    color: "#fff",
  },
});

export default ProfileScreen;
