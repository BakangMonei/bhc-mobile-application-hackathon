import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Typography, Card, CardContent, Button } from "@mui/material";

const SuperAdminContentManagementScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Content Management
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Approve Content
          </Typography>
          <Typography variant="body2" component="p">
            Review and approve content submitted by admins.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Approve Content
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Manage Settings
          </Typography>
          <Typography variant="body2" component="p">
            Configure app settings and manage configurations.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Manage Settings
          </Button>
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
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
});

export default SuperAdminContentManagementScreen;
