import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
} from "react-native-paper";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminPaymentManagementScreen: React.FC = () => {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "payments"), (snapshot) => {
      const fetchedPayments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayments(fetchedPayments);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        payments.map((payment) => (
          <Card key={payment.id} style={styles.card}>
            <Card.Content>
              <Title>{payment.user}</Title>
              <Paragraph>{`Amount: ${payment.amount}`}</Paragraph>
              <Paragraph>{`Date: ${payment.date
                .toDate()
                .toLocaleDateString()}`}</Paragraph>
              <Button onPress={() => {}}>Resolve Issue</Button>
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

export default AdminPaymentManagementScreen;
