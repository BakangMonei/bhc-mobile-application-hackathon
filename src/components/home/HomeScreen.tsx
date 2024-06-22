import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc, collection, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";

const HomeScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [carouselItems, setCarouselItems] = useState([
    {
      title: "Report Maintenance Issue",
      action: () => navigation.navigate("MaintenanceRequestsScreen"),
    },
    {
      title: "View Properties",
      action: () => navigation.navigate("PropertyListingsScreen"),
    },
    {
      title: "Make a Payment",
      action: () => navigation.navigate("PaymentsScreen"),
    },
  ]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setUserDetails(docSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user details: ", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAnnouncements = () => {
      const unsubscribe = onSnapshot(
        collection(db, "announcements"),
        (snapshot) => {
          const fetchedAnnouncements = [];
          snapshot.forEach((doc) => {
            fetchedAnnouncements.push({ ...doc.data(), id: doc.id });
          });
          setAnnouncements(fetchedAnnouncements);
        }
      );

      return unsubscribe;
    };

    fetchUserDetails();
    const unsubscribeAnnouncements = fetchAnnouncements();

    return () => {
      unsubscribeAnnouncements();
    };
  }, [currentUser]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Welcome,{" "}
        {userDetails
          ? `${userDetails.firstName} ${userDetails.lastName}`
          : "User"}
      </Typography>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Latest Announcements
      </Typography>
      <Carousel>
        {announcements.map((announcement) => (
          <Card key={announcement.id} style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                {announcement.title}
              </Typography>
              <Typography variant="body2" component="p">
                {announcement.content}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Carousel>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Quick Actions
      </Typography>
      <Carousel>
        {carouselItems.map((item, index) => (
          <Card key={index} style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                {item.title}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={styles.button}
                onClick={item.action}
              >
                {item.title}
              </Button>
            </CardContent>
          </Card>
        ))}
      </Carousel>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            My Account
          </Typography>
          <Typography variant="body2" component="p">
            Manage your account settings and preferences.
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={styles.button}
            onClick={() => navigation.navigate("Profile")}
          >
            Go to Profile
          </Button>
        </CardContent>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#3f51b5",
  },
  sectionTitle: {
    marginBottom: 16,
    color: "#3f51b5",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 8,
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
