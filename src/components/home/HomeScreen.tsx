import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native";
import { Card, CardContent, Typography, Button } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import { AuthContext } from "../../context/AuthContext";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

const HomeScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState([]);
  const [carouselItems, setCarouselItems] = useState([
    {
      title: "Report Maintenance Issue",
      action: () => console.log("Report Maintenance Issue"),
    },
    {
      title: "View Properties",
      action: () => console.log("View Properties"),
    },
    {
      title: "Make a Payment",
      action: () => console.log("Make a Payment"),
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

    const fetchAnnouncements = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "announcements"));
        const fetchedAnnouncements = [];
        querySnapshot.forEach((doc) => {
          fetchedAnnouncements.push({ ...doc.data(), id: doc.id });
        });
        setAnnouncements(fetchedAnnouncements);
      } catch (error) {
        console.error("Error fetching announcements: ", error);
      }
    };

    fetchUserDetails();
    fetchAnnouncements();
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
          ? `${userDetails.fullName} ${userDetails.username}`
          : "User"}
      </Typography>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Latest Announcements
      </Typography>
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
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Quick Actions
      </Typography>
      <Carousel>
        {carouselItems.map((item, index) => (
          <Card key={index} style={styles.card}>
            <CardContent>
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
          <Button variant="contained" color="secondary" style={styles.button}>
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
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    width: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreen;
