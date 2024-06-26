import React, { useState, useContext, useEffect } from "react";
import { ScrollView, StyleSheet, Image, View } from "react-native";
import {
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import {
  collection,
  addDoc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const MaintenanceDetailScreen = ({ route }) => {
  const { requestId, requestDetails } = route.params;
  const { currentUser } = useContext(AuthContext);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);

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
      await addDoc(
        collection(db, "maintenanceRequests", requestId, "comments"),
        {
          comment: newComment,
          userId: currentUser.uid,
          firstName: currentUser.firstName,
          createdAt: serverTimestamp(),
        }
      );
      setNewComment("");
      setDialogOpen(false);
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
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
            <Image
              source={{ uri: requestDetails.image }}
              style={styles.image}
            />
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
              {comment.firstName} -{" "}
              {comment.createdAt?.toDate().toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
      <IconButton
        color="primary"
        onClick={handleOpenDialog}
        style={styles.commentButton}
      >
        <AddCommentIcon />
      </IconButton>

      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent>
          <TextField
            label="Comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleAddComment} color="primary">
            Add Comment
          </Button>
        </DialogActions>
      </Dialog>
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
    color: "#AD2524",
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
    color: "#FAA21B",
  },
  button: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#FAA21B",
    color: "#fff",
  },
  image: {
    width: "100%",
    height: 300,
    objectFit: "cover",
    marginTop: 8,
    borderRadius: 8,
  },
  commentButton: {
    marginTop: 16,
  },
});

export default MaintenanceDetailScreen;
