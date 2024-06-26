import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, Image, View } from "react-native";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
} from "@mui/material";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const SuperAdminMaintenanceOversightScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "maintenanceRequests"),
      (snapshot) => {
        const fetchedRequests = [];
        snapshot.forEach((doc) => {
          fetchedRequests.push({ ...doc.data(), id: doc.id });
        });
        setMaintenanceRequests(fetchedRequests);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      const requestRef = doc(db, "maintenanceRequests", id);
      await updateDoc(requestRef, { status });
      console.log("Status updated successfully");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleAddComment = async (id) => {
    if (!newComment) return;
    try {
      await addDoc(collection(db, "maintenanceRequests", id, "comments"), {
        content: newComment,
        userId: currentUser.uid,
        firstName: currentUser.firstName || "Unknown",
        timestamp: serverTimestamp(),
      });
      setNewComment("");
      console.log("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {maintenanceRequests.map((req) => (
        <Card key={req.id} style={styles.card}>
          <CardContent>
            <Typography variant="body2" component="p">
              {req.request}
            </Typography>
            <Typography variant="body2" component="p">
              Status: {req.status}
            </Typography>
            <Typography variant="body2" component="p">
              Description: {req.description}
            </Typography>
            {req.image && (
              <Image source={{ uri: req.image }} style={styles.cardImage} />
            )}
            <View style={styles.buttonContainer}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleUpdateStatus(req.id, "In Progress")}
                style={styles.button}
              >
                Mark In Progress
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleUpdateStatus(req.id, "Completed")}
                style={styles.button}
              >
                Mark Completed
              </Button>
            </View>
            <Typography variant="h6" component="h2">
              Responses
            </Typography>
            {req.comments &&
              req.comments.map((res, index) => (
                <View key={index} style={styles.response}>
                  <Typography variant="body2" component="p">
                    {res.content}
                  </Typography>
                  <Typography variant="caption" component="p">
                    - {res.firstName} on{" "}
                    {res.timestamp.toDate().toLocaleString()}
                  </Typography>
                </View>
              ))}
            <TextField
              label="Add a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleAddComment(req.id)}
              style={styles.button}
            >
              Add Comment
            </Button>
          </CardContent>
        </Card>
      ))}
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
    color: "#ff9800",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#ff9800",
    color: "#fff",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
    marginTop: 8,
  },
  response: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
});

export default SuperAdminMaintenanceOversightScreen;
