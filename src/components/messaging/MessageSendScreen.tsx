import React, { useState, useContext } from "react";
import { View, StyleSheet } from "react-native";
import { TextField, Button, Typography } from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const MessageSendScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [receiverEmail, setReceiverEmail] = useState("");
  const [messageText, setMessageText] = useState("");

  const handleSendMessage = async () => {
    try {
      const messageData = {
        senderId: currentUser.uid,
        receiverEmail,
        messageText,
        timestamp: serverTimestamp(),
      };
      await addDoc(collection(db, "messages"), messageData);
      alert("Message sent successfully!");
      setReceiverEmail("");
      setMessageText("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Send a Message
      </Typography>
      <TextField
        label="Receiver Email"
        value={receiverEmail}
        onChange={(e) => setReceiverEmail(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
      />
      <TextField
        label="Message"
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSendMessage}
        style={styles.button}
      >
        Send Message
      </Button>
    </View>
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
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
});

export default MessageSendScreen;
