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

const AdminReportingScreen: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "reports"), (snapshot) => {
      const fetchedReports = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReports(fetchedReports);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        reports.map((report) => (
          <Card key={report.id} style={styles.card}>
            <Card.Content>
              <Title>{report.title}</Title>
              <Paragraph>{report.description}</Paragraph>
              <Button onPress={() => {}}>View Report</Button>
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

export default AdminReportingScreen;
