import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Typography, Card, CardContent, Button } from "@mui/material";

const SuperAdminAnalyticsReportingScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Analytics & Reporting
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Comprehensive Reports
          </Typography>
          <Typography variant="body2" component="p">
            Access detailed reports on user activities, application processes, maintenance requests, and payments.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            View Reports
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Custom Reports
          </Typography>
          <Typography variant="body2" component="p">
            Generate custom reports tailored to specific needs.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            Generate Reports
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Performance Metrics
          </Typography>
          <Typography variant="body2" component="p">
            View app performance metrics and analytics.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
          >
            View Metrics
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

export default SuperAdminAnalyticsReportingScreen;
