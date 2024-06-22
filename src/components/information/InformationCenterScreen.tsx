import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { Typography, Card, CardContent, Button } from "@mui/material";

const InformationCenterScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Information Center
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Access Information
          </Typography>
          <Typography variant="body2" component="p">
            View information about BHC products and services here.
          </Typography>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            FAQs and Procedures
          </Typography>
          <Typography variant="body2" component="p">
            Access application procedures, eligibility criteria, and FAQs here.
          </Typography>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            General Inquiries
          </Typography>
          <Typography variant="body2" component="p">
            Submit your general inquiries and receive responses here.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigation.navigate("InquiryFormScreen")}
            style={styles.button}
          >
            Submit Inquiry
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

export default InformationCenterScreen;
