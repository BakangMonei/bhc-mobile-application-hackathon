import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminContentManagementScreen: React.FC = () => {
  const [content, setContent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "content"), (snapshot) => {
      const fetchedContent = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContent(fetchedContent);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        content.map((item) => (
          <Card key={item.id} style={styles.card}>
            <Card.Content>
              <Title>{item.title}</Title>
              <Paragraph>{item.description}</Paragraph>
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

export default AdminContentManagementScreen;
