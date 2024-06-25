import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, Image, View } from "react-native";
import { Typography, Card, CardContent, TextField, Button } from "@mui/material";
import { collection, addDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const MaintenanceDetailScreen = ({ route }) => {
  const { requestId, requestDetails } = route.params;
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const q = collection(db, "maintenanceRequests", requestId, "comments");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = [];
      snapshot.forEach((doc) => {
        fetchedComments.push({ ...doc.data(), id: doc.id });
      });
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [requestId]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;
    try {
      await addDoc(collection(db, "maintenanceRequests", requestId, "comments"), {
        comment: newComment,
        userId: currentUser.uid,
        firstName: currentUser.firstName,
        createdAt: serverTimestamp(),
      });
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Maintenance Request Details
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Request ID: {requestId}
          </Typography>
          <Typography variant="body2" component="p">
            {requestDetails.request}
          </Typography>
          <Typography variant="body2" component="p">
            Status: {requestDetails.status}
          </Typography>
          <Typography variant="body2" component="p">
            Description: {requestDetails.description}
          </Typography>
          {requestDetails.image && (
            <Image source={{ uri: requestDetails.image }} style={styles.image} />
          )}
        </CardContent>
      </Card>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Comments
      </Typography>
      {comments.map((comment) => (
        <Card key={comment.id} style={styles.card}>
          <CardContent>
            <Typography variant="body2" component="p">
              {comment.comment}
            </Typography>
            <Typography variant="caption" component="p">
              {comment.firstName} - {comment.createdAt?.toDate().toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
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
        onClick={handleAddComment}
        style={styles.button}
      >
        Add Comment
      </Button>
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
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
    color: "#ff9800",
  },
  button: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#ff9800",
    color: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "cover",
    marginTop: 8,
  },
});

export default MaintenanceDetailScreen;
