import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, CardContent, Typography, Button } from '@mui/material';

const HomeScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Welcome to BHC Smart Housing
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Latest Announcements
          </Typography>
          <Typography variant="body2" component="p">
            Stay updated with the latest news and updates from BHC.
          </Typography>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Quick Actions
          </Typography>
          <Button variant="contained" color="primary" style={styles.button}>
            Report Maintenance Issue
          </Button>
          <Button variant="contained" color="primary" style={styles.button}>
            View Properties
          </Button>
          <Button variant="contained" color="primary" style={styles.button}>
            Make a Payment
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            My Account
          </Typography>
          <Typography variant="body2" component="p">
            Manage your account settings and preferences.
          </Typography>
          <Button variant="contained" color="secondary" style={styles.button}>
            Go to Profile
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
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
    width: '100%',
  },
});

export default HomeScreen;
