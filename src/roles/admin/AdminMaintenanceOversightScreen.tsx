import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, Image, View, Alert } from "react-native";
import {
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DoneIcon from "@mui/icons-material/Done";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CommentIcon from "@mui/icons-material/Comment";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const AdminMaintenanceOversightScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

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

  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      await addDoc(
        collection(db, "maintenanceRequests", selectedRequest.id, "comments"),
        {
          content: newComment,
          userId: currentUser.uid,
          firstName: currentUser.firstName,
          timestamp: new Date(),
        }
      );
      setNewComment("");
      setDialogOpen(false);
      console.log("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleOpenDialog = (request) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedRequest(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {maintenanceRequests.map((req) => (
        <Card key={req.id} style={styles.card}>
          <CardContent>
            <Typography variant="h6" component="h2">
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
                startIcon={<HourglassEmptyIcon />}
                style={styles.button}
              >
                Mark In Progress
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleUpdateStatus(req.id, "Completed")}
                startIcon={<DoneIcon />}
                style={styles.button}
              >
                Mark Completed
              </Button>
            </View>
            <Typography variant="h6" component="h2" style={styles.sectionTitle}>
              Responses
            </Typography>
            {req.responses &&
              req.responses.map((res, index) => (
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
            <IconButton
              color="primary"
              onClick={() => handleOpenDialog(req)}
              style={styles.commentButton}
            >
              <AddCommentIcon />
            </IconButton>
          </CardContent>
        </Card>
      ))}

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
    color: "#FAA21B",
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
    width: "48%",
    backgroundColor: "#FAA21B",
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
  sectionTitle: {
    marginTop: 16,
    color: "#AD2524",
  },
  response: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  commentButton: {
    marginTop: 16,
  },
});

export default AdminMaintenanceOversightScreen;
