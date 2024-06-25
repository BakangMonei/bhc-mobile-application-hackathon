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
} from "@mui/material";
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
import { db, auth, storage } from "../../services/firebase";
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
      console.log("Comment added successfully");
    } catch (error) {
      console.error("Error adding comment:", error);
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
      <TextField
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Status</InputLabel>
        <Select
          label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
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
              onClick={() => handleDeleteRequest(req.id)}
              style={styles.button}
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
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#ff9800",
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
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
});

export default MaintenanceRequestsScreen;
