import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminPropertyManagementScreen: React.FC = () => {
  const [properties, setProperties] = useState<any[]>([]);
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        properties.map((property) => (
          <Card key={property.id} style={styles.card}>
            <Card.Content>
              <Title>{property.title}</Title>
              <Paragraph>{property.description}</Paragraph>
              <Button onPress={() => {}}>Edit</Button>
              <Button onPress={() => {}}>Delete</Button>
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
  },
  card: {
    marginBottom: 16,
  },
});

export default AdminPropertyManagementScreen;
