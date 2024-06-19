import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
} from "@mui/material";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db, auth } from "../../services/firebase";

const MaintenanceRequestsScreen = () => {
  const [request, setRequest] = useState("");
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = () => {
      const user = auth.currentUser;
      if (user) {
        setCurrentUser(user);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    if (currentUser) {
      const fetchRequests = () => {
        const q = query(
          collection(db, "maintenanceRequests"),
          where("userId", "==", currentUser.uid)
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedRequests = [];
          snapshot.forEach((doc) => {
            fetchedRequests.push({ ...doc.data(), id: doc.id });
          });
          setMaintenanceRequests(fetchedRequests);
        });

        return unsubscribe;
      };

      const unsubscribe = fetchRequests();
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser]);

  const handleAddRequest = async () => {
    try {
      if (currentUser) {
        await addDoc(collection(db, "maintenanceRequests"), {
          request,
          userId: currentUser.uid,
          createdAt: new Date(),
        });
        setRequest("");
        console.log("Maintenance request added successfully");
      }
    } catch (error) {
      console.error("Error adding maintenance request:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Maintenance Requests
      </Typography>
      <TextField
        label="Request"
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleAddRequest}
        style={styles.button}
      >
        Add Request
      </Button>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Existing Requests
      </Typography>
      {maintenanceRequests.map((req) => (
        <Card key={req.id} style={styles.card}>
          <CardContent>
            <Typography variant="body2" component="p">
              {req.request}
            </Typography>
          </CardContent>
        </Card>
      ))}
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
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
});

export default MaintenanceRequestsScreen;
