import React, { useEffect, useState, useContext } from "react";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import {
  TextInput,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  Dialog,
  Portal,
  Provider as PaperProvider,
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
import { AuthContext } from "../../context/AuthContext";

const AdminReportingScreen: React.FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [reportData, setReportData] = useState({
    title: "",
    description: "",
    author: "",
    createdAt: new Date(),
  });

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

  const handleAddReport = async () => {
    try {
      await addDoc(collection(db, "reports"), {
        ...reportData,
        author: `${currentUser.firstName} ${currentUser.lastName}`,
        userId: currentUser.uid,
        createdAt: new Date(),
      });
      setReportData({
        title: "",
        description: "",
        author: "",
        createdAt: new Date(),
      });
      Alert.alert("Success", "Report added successfully");
    } catch (error) {
      console.error("Error adding report:", error);
      Alert.alert("Error", "Error adding report. Please try again.");
    }
  };

  const handleUpdateReport = async () => {
    try {
      await updateDoc(doc(db, "reports", selectedReport.id), reportData);
      setDialogVisible(false);
      setReportData({
        title: "",
        description: "",
        author: "",
        createdAt: new Date(),
      });
      Alert.alert("Success", "Report updated successfully");
    } catch (error) {
      console.error("Error updating report:", error);
      Alert.alert("Error", "Error updating report. Please try again.");
    }
  };

  const handleDeleteReport = async (id) => {
    try {
      await deleteDoc(doc(db, "reports", id));
      Alert.alert("Success", "Report deleted successfully");
    } catch (error) {
      console.error("Error deleting report:", error);
      Alert.alert("Error", "Error deleting report. Please try again.");
    }
  };

  const showEditDialog = (report) => {
    setSelectedReport(report);
    setReportData(report);
    setDialogVisible(true);
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
    setSelectedReport(null);
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Title"
            value={reportData.title}
            onChangeText={(text) =>
              setReportData({ ...reportData, title: text })
            }
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={reportData.description}
            onChangeText={(text) =>
              setReportData({ ...reportData, description: text })
            }
            multiline
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleAddReport}
            style={styles.addButton}
          >
            Add Report
          </Button>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#FAA21B" />
        ) : (
          reports.map((report) => (
            <Card key={report.id} style={styles.card}>
              <Card.Content>
                <Title>{report.title}</Title>
                <Paragraph>{report.description}</Paragraph>
                <Paragraph>Author: {report.author}</Paragraph>
                <Button
                  mode="outlined"
                  onPress={() => showEditDialog(report)}
                  style={styles.editButton}
                >
                  Edit
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => handleDeleteReport(report.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </Button>
              </Card.Content>
            </Card>
          ))
        )}
        <Portal>
          <Dialog visible={dialogVisible} onDismiss={handleCloseDialog}>
            <Dialog.Title>Edit Report</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Title"
                value={reportData.title}
                onChangeText={(text) =>
                  setReportData({ ...reportData, title: text })
                }
                style={styles.input}
              />
              <TextInput
                label="Description"
                value={reportData.description}
                onChangeText={(text) =>
                  setReportData({ ...reportData, description: text })
                }
                multiline
                style={styles.input}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleCloseDialog}>Cancel</Button>
              <Button onPress={handleUpdateReport}>Save</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  addButton: {
    backgroundColor: "#FAA21B",
    color: "#fff",
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
  editButton: {
    backgroundColor: "#FAA21B",
    color: "#fff",
    marginTop: 8,
  },
  deleteButton: {
    backgroundColor: "#AD2524",
    color: "#fff",
    marginTop: 8,
  },
});

export default AdminReportingScreen;
