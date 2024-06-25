import React, { useState, useEffect, useContext } from "react";
import { ScrollView, StyleSheet, View, TouchableOpacity } from "react-native";
import { Typography, Card, CardContent, CircularProgress } from "@mui/material";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const InboxScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("receiverEmail", "==", currentUser.email)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(fetchedMessages);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser.email]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Inbox
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        messages.map((message) => (
          <TouchableOpacity
            key={message.id}
            onPress={() =>
              navigation.navigate("MessageDetailScreen", { message })
            }
          >
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  From: {message.senderId}
                </Typography>
                <Typography variant="body2" component="p">
                  {message.messageText}
                </Typography>
                <Typography variant="caption" component="p">
                  {new Date(message.timestamp.seconds * 1000).toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </TouchableOpacity>
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
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#ff9800",
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
});

export default InboxScreen;
