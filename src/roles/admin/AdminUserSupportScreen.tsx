import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, Button, Card, Title, Paragraph, ActivityIndicator } from "react-native-paper";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminUserSupportScreen: React.FC = () => {
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "inquiries"), (snapshot) => {
      const fetchedInquiries = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInquiries(fetchedInquiries);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        inquiries.map((inquiry) => (
          <Card key={inquiry.id} style={styles.card}>
            <Card.Content>
              <Title>{inquiry.title}</Title>
              <Paragraph>{inquiry.description}</Paragraph>
              <Button onPress={() => {}}>Respond</Button>
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

export default AdminUserSupportScreen;
