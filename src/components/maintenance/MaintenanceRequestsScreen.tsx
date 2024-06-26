import React, { useState, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet, Image, Alert } from "react-native";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import AddCommentIcon from "@mui/icons-material/AddComment";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  where,
  serverTimestamp,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db, storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";
import { AuthContext } from "../../context/AuthContext";

const MaintenanceRequestsScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [request, setRequest] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Pending");
  const [image, setImage] = useState(null);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    if (currentUser) {
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

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleAddRequest = async () => {
    try {
      if (currentUser) {
        let imageUrl = "";
        if (image) {
          const response = await fetch(image);
          const blob = await response.blob();
          const storageRef = ref(storage, `maintenanceImages/${Date.now()}`);
          const snapshot = await uploadBytes(storageRef, blob);
          imageUrl = await getDownloadURL(snapshot.ref);
        }

        await addDoc(collection(db, "maintenanceRequests"), {
          request,
          description,
          status,
          image: imageUrl,
          userId: currentUser.uid,
          createdAt: serverTimestamp(),
        });
        setRequest("");
        setDescription("");
        setImage(null);
        setStatus("Pending");
        console.log("Maintenance request added successfully");
      }
    } catch (error) {
      console.error("Error adding maintenance request:", error);
    }
  };

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      Alert.alert("You did not select any image.");
    }
  };

  const handleDeleteRequest = async (id) => {
    try {
      await deleteDoc(doc(db, "maintenanceRequests", id));
      console.log("Maintenance request deleted successfully");
    } catch (error) {
      console.error("Error deleting maintenance request:", error);
    }
  };

  const handleAddComment = async (id) => {
    if (!newComment) return;
    try {
      await addDoc(collection(db, "maintenanceRequests", id, "comments"), {
        content: newComment,
        userId: currentUser.uid,
        firstName: currentUser.firstName,
        timestamp: serverTimestamp(),
      });
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
      <TextField
        label="Request"
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        InputLabelProps={{ style: { color: "#FAA21B" } }}
      />
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        InputLabelProps={{ style: { color: "#FAA21B" } }}
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel style={{ color: "#FAA21B" }}>Status</InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ color: "#FAA21B" }}
        >
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Completed">Completed</MenuItem>
        </Select>
      </FormControl>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Button
            variant="outlined"
            onClick={handleImagePick}
            style={styles.button}
          >
            Upload Image
          </Button>
        )}
        {image && (
          <Button
            variant="outlined"
            onClick={() => setImage(null)}
            style={styles.button}
          >
            Remove Image
          </Button>
        )}
      </View>
      <Button
        variant="contained"
        style={styles.button}
        onClick={handleAddRequest}
      >
        Add Request
      </Button>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Existing Requests
      </Typography>
      {maintenanceRequests.map((req) => (
        <Card
          key={req.id}
          style={styles.card}
          onClick={() =>
            navigation.navigate("MaintenanceDetailScreen", {
              requestId: req.id,
              requestDetails: req,
            })
          }
        >
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
            <Button
              variant="contained"
              color="secondary"
              style={styles.buttonDelete}
              onClick={() => handleDeleteRequest(req.id)}
              startIcon={<DeleteIcon />}
            >
              Delete Request
            </Button>
            <Typography variant="h6" component="h2">
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
          <Button
            onClick={() => handleAddComment(selectedRequest.id)}
            color="primary"
          >
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
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
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
    width: "100%",
    backgroundColor: "#FAA21B",
    color: "#fff",
  },
  buttonDelete: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#AD2524",
    color: "#fff",
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 16,
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
  commentButton: {
    marginTop: 16,
  },
});

export default MaintenanceRequestsScreen;
