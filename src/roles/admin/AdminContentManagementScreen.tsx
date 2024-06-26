import React, { useState, useEffect, useContext } from "react";
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
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const AdminContentManagementScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dialogVisible, setDialogVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "announcements"),
      (snapshot) => {
        const fetchedContent = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setContent(fetchedContent);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const handleAddAnnouncement = async () => {
    try {
      const userDoc = await getDoc(doc(db, "admin", currentUser.uid));
      const userData = userDoc.exists() ? userDoc.data() : {};
      await addDoc(collection(db, "announcements"), {
        title,
        description,
        author: `${userData.firstName} ${userData.lastName}`,
        userId: currentUser.uid,
        createdAt: new Date(),
      });
      setTitle("");
      setDescription("");
      Alert.alert("Success", "Announcement added successfully");
    } catch (error) {
      console.error("Error adding announcement:", error);
      Alert.alert("Error", "Error adding announcement. Please try again.");
    }
  };

  const handleEditAnnouncement = async () => {
    try {
      await updateDoc(doc(db, "announcements", selectedItem.id), {
        title,
        description,
      });
      setDialogVisible(false);
      setTitle("");
      setDescription("");
      Alert.alert("Success", "Announcement updated successfully");
    } catch (error) {
      console.error("Error updating announcement:", error);
      Alert.alert("Error", "Error updating announcement. Please try again.");
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    try {
      await deleteDoc(doc(db, "announcements", id));
      Alert.alert("Success", "Announcement deleted successfully");
    } catch (error) {
      console.error("Error deleting announcement:", error);
      Alert.alert("Error", "Error deleting announcement. Please try again.");
    }
  };

  const showEditDialog = (item) => {
    setSelectedItem(item);
    setTitle(item.title);
    setDescription(item.description);
    setDialogVisible(true);
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            label="Title"
            value={title}
            onChangeText={(text) => setTitle(text)}
            style={styles.input}
          />
          <TextInput
            label="Description"
            value={description}
            onChangeText={(text) => setDescription(text)}
            multiline
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleAddAnnouncement}
            style={styles.addButton}
          >
            Add Announcement
          </Button>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#FAA21B" />
        ) : (
          content.map((item) => (
            <Card key={item.id} style={styles.card}>
              <Card.Content>
                <Title>{item.title}</Title>
                <Paragraph>{item.description}</Paragraph>
                <Paragraph>Author: {item.author}</Paragraph>
                <Button
                  mode="outlined"
                  onPress={() => showEditDialog(item)}
                  style={styles.editButton}
                >
                  Edit
                </Button>
                <Button
                  mode="outlined"
                  onPress={() => handleDeleteAnnouncement(item.id)}
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
            onDismiss={() => setDialogVisible(false)}
          >
            <Dialog.Title>Edit Announcement</Dialog.Title>
            <Dialog.Content>
              <TextInput
                label="Title"
                value={title}
                onChangeText={(text) => setTitle(text)}
                style={styles.input}
              />
              <TextInput
                label="Description"
                value={description}
                onChangeText={(text) => setDescription(text)}
                multiline
                style={styles.input}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDialogVisible(false)}>Cancel</Button>
              <Button onPress={handleEditAnnouncement}>Save</Button>
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

export default AdminContentManagementScreen;
