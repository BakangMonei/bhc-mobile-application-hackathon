import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Typography, Card, CardContent } from "@mui/material";

const MessageDetailScreen = ({ route }) => {
  const { message } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Message Details
      </Typography>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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

export default MessageDetailScreen;
