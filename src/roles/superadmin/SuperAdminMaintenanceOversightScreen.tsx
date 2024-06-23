import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Typography, Card, CardContent, Button } from "@mui/material";

const SuperAdminMaintenanceOversightScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Maintenance Oversight
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Manage Requests
          </Typography>
          <Typography variant="body2" component="p">
            View and manage all maintenance requests.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Manage Requests
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Delegate Tasks
          </Typography>
          <Typography variant="body2" component="p">
            Delegate tasks to admins or specific teams.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Delegate Tasks
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Track Status
          </Typography>
          <Typography variant="body2" component="p">
            Track maintenance status and ensure timely resolution.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Track Status
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

export default SuperAdminMaintenanceOversightScreen;
