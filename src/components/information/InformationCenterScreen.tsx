import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Typography, Card, CardContent } from '@mui/material';

const InformationCenterScreen = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Information Center
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            FAQs
          </Typography>
          <Typography variant="body2" component="p">
            Here are some frequently asked questions.
          </Typography>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Contact Us
          </Typography>
          <Typography variant="body2" component="p">
            You can reach us at contact@bhc.com or call us at +123456789.
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
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    marginBottom: 16,
  },
});

export default InformationCenterScreen;
