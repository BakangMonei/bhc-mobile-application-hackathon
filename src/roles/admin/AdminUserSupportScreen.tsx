import React, { useEffect, useState } from "react";
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
  Text,
  Provider as PaperProvider,
} from "react-native-paper";
import { collection, onSnapshot, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../services/firebase";

const AdminUserSupportScreen = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [newInquiry, setNewInquiry] = useState({
    firstName: "",
    lastName: "",
    email: "",
    inquiry: "",
    date: new Date(),
  });

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

  const handleAddInquiry = async () => {
    try {
      await addDoc(collection(db, "inquiries"), newInquiry);
      setNewInquiry({ firstName: "", lastName: "", email: "", inquiry: "", date: new Date() });
      Alert.alert("Success", "Inquiry added successfully");
    } catch (error) {
      console.error("Error adding inquiry:", error);
      Alert.alert("Error", "Error adding inquiry. Please try again.");
    }
  };

  const handleUpdateInquiry = async () => {
    try {
      await updateDoc(doc(db, "inquiries", selectedInquiry.id), newInquiry);
      setDialogVisible(false);
      setNewInquiry({ firstName: "", lastName: "", email: "", inquiry: "", date: new Date() });
      Alert.alert("Success", "Inquiry updated successfully");
    } catch (error) {
      console.error("Error updating inquiry:", error);
      Alert.alert("Error", "Error updating inquiry. Please try again.");
    }
  };

  const handleDeleteInquiry = async (id) => {
    try {
      await deleteDoc(doc(db, "inquiries", id));
      Alert.alert("Success", "Inquiry deleted successfully");
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      Alert.alert("Error", "Error deleting inquiry. Please try again.");
    }
  };

  const showEditDialog = (inquiry) => {
    setSelectedInquiry(inquiry);
    setNewInquiry(inquiry);
    setDialogVisible(true);
  };

  const handleRespond = (inquiryId) => {
    // Implement your respond functionality here
    Alert.alert("Respond", `Responding to inquiry with ID: ${inquiryId}`);
  };

  const handleCloseDialog = () => {
    setDialogVisible(false);
    setSelectedInquiry(null);
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            label="First Name"
            value={newInquiry.firstName}
            onChangeText={(text) => setNewInquiry({ ...newInquiry, firstName: text })}
            style={styles.input}
          />
          <TextInput
            label="Last Name"
            value={newInquiry.lastName}
            onChangeText={(text) => setNewInquiry({ ...newInquiry, lastName: text })}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={newInquiry.email}
            onChangeText={(text) => setNewInquiry({ ...newInquiry, email: text })}
            style={styles.input}
          />
          <TextInput
            label="Inquiry"
            value={newInquiry.inquiry}
            onChangeText={(text) => setNewInquiry({ ...newInquiry, inquiry: text })}
            multiline
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleAddInquiry}
            style={styles.addButton}
          >
            Add Inquiry
          </Button>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#FAA21B" />
        ) : (
          inquiries.map((inquiry) => (
            <Card key={inquiry.id} style={styles.card}>
              <Card.Content>
                <Title>{inquiry.inquiry}</Title>
                <Paragraph>
                  {inquiry.firstName} {inquiry.lastName}
                </Paragraph>
                <Paragraph>{inquiry.email}</Paragraph>
                <Button
                  mode="outlined"
                  onPress={() => showEditDialog(inquiry)}
                  style={styles.editButton}
                >
                  Edit
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => handleDeleteInquiry(inquiry.id)}
                  style={styles.deleteButton}
                >
                  Delete
                </Button>
              </Card.Content>
            </Card>
          ))
        )}
        <Portal>
          <Dialog
            visible={dialogVisible}
            onDismiss={handleCloseDialog}
          >
            <Dialog.Title>Edit Inquiry</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="First Name"
                value={newInquiry.firstName}
                onChangeText={(text) => setNewInquiry({ ...newInquiry, firstName: text })}
                style={styles.input}
              />
              <TextInput
                label="Last Name"
                value={newInquiry.lastName}
                onChangeText={(text) => setNewInquiry({ ...newInquiry, lastName: text })}
                style={styles.input}
              />
              <TextInput
                label="Email"
                value={newInquiry.email}
                onChangeText={(text) => setNewInquiry({ ...newInquiry, email: text })}
                style={styles.input}
              />
              <TextInput
                label="Inquiry"
                value={newInquiry.inquiry}
                onChangeText={(text) => setNewInquiry({ ...newInquiry, inquiry: text })}
                multiline
                style={styles.input}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleCloseDialog}>Cancel</Button>
              <Button onPress={handleUpdateInquiry}>Save</Button>
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

export default AdminUserSupportScreen;
