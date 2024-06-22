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
});

export default MaintenanceRequestsScreen;
