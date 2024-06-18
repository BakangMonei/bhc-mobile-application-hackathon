import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Alert, Image } from "react-native";
import {
  TextField,
  Button,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Avatar,
} from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../services/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import * as ImagePicker from "expo-image-picker";

const PropertyListingsScreen = ({ navigation }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    type: "rent", // or 'sale'
    date: serverTimestamp(),
  });
  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
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

  const handleSubmit = async () => {
    try {
      let imageUrl = "";
      if (image) {
        const response = await fetch(image);
        const blob = await response.blob();
        const storageRef = ref(storage, `images/${Date.now()}-${blob.name}`);
        const snapshot = await uploadBytes(storageRef, blob);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const propertyData = {
        ...form,
        image: imageUrl,
        date: serverTimestamp(),
      };
      await addDoc(collection(db, "properties"), propertyData);

      Alert.alert("Success", "Property added successfully", [
        {
          text: "OK",
          onPress: () => navigation.navigate("PropertyDetailsScreen"),
        },
      ]);
    } catch (error) {
      console.error("Error adding property:", error);
      Alert.alert("Error", "Error adding property. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Add New Property
      </Typography>
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Price"
        name="price"
        value={form.price}
        onChange={handleChange}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel>Type</InputLabel>
        <Select
          label="Type"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <MenuItem value="rent">Rent</MenuItem>
          <MenuItem value="sale">Sale</MenuItem>
        </Select>
      </FormControl>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <Avatar style={styles.avatarPlaceholder}>Add Image</Avatar>
        )}
        <Button
          variant="outlined"
          onClick={handleImagePick}
          style={styles.button}
        >
          {image ? "Change Image" : "Upload Image"}
        </Button>
      </View>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        style={styles.button}
      >
        Add Property
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
  },
  button: {
    marginTop: 16,
  },
  imageContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    marginRight: 16,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    marginRight: 16,
    backgroundColor: "#e0e0e0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PropertyListingsScreen;
