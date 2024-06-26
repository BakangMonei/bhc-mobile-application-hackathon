import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminPropertyManagementScreen = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "properties"), (snapshot) => {
      const fetchedProperties = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProperties(fetchedProperties);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleDelete = async (propertyId) => {
    try {
      await deleteDoc(doc(db, "properties", propertyId));
      Alert.alert("Success", "Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      Alert.alert("Error", "Error deleting property. Please try again.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#FAA21B" />
      ) : (
        properties.map((property) => (
          <Card key={property.id} style={styles.card}>
            <Card.Content>
              <Title>{property.title}</Title>
              <Paragraph>{property.description}</Paragraph>
              <Button mode="contained" style={styles.button} onPress={() => {}}>
                Edit
              </Button>
              <Button
                mode="contained"
                style={[styles.button, styles.deleteButton]}
                onPress={() => handleDelete(property.id)}
              >
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  button: {
    marginTop: 8,
    backgroundColor: "#FAA21B",
    color: "#fff",
  },
  deleteButton: {
    backgroundColor: "#AD2524",
  },
});

export default AdminPropertyManagementScreen;
