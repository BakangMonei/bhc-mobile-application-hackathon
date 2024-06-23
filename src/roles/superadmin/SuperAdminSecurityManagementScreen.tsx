import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Typography, Card, CardContent, Button } from "@mui/material";

const SuperAdminSecurityManagementScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Security Management
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Conduct Audits
          </Typography>
          <Typography variant="body2" component="p">
            Conduct and review security audits.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Conduct Audit
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Manage Permissions
          </Typography>
          <Typography variant="body2" component="p">
            Manage permissions and access levels.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Manage Permissions
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Update Security Protocols
          </Typography>
          <Typography variant="body2" component="p">
            Implement and update security protocols.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Update Protocols
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

export default SuperAdminSecurityManagementScreen;
