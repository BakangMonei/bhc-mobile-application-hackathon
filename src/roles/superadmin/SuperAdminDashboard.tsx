import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Typography, Card, CardContent, Grid } from "@mui/material";

const SuperAdminDashboard = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        SuperAdmin Dashboard
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                User Activity
              </Typography>
              <Typography variant="body2" component="p">
                Overview of user activity...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Property Applications
              </Typography>
              <Typography variant="body2" component="p">
                Overview of property applications...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Payments
              </Typography>
              <Typography variant="body2" component="p">
                Overview of payments...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Card style={styles.card}>
            <CardContent>
              <Typography variant="h6" component="h2">
                Maintenance Requests
              </Typography>
              <Typography variant="body2" component="p">
                Overview of maintenance requests...
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
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
});

export default SuperAdminDashboard;
