import React, { useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";

const InformationCenterScreen = ({ navigation }) => {
  const [infoVisible, setInfoVisible] = useState(false);
  const [faqsVisible, setFaqsVisible] = useState(false);

  const toggleInfoVisible = () => setInfoVisible(!infoVisible);
  const toggleFaqsVisible = () => setFaqsVisible(!faqsVisible);

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
          <Button
            variant="contained"
            color="primary"
            onClick={toggleInfoVisible}
            style={styles.button}
          >
            More Info
          </Button>
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
          <Button
            variant="contained"
            color="primary"
            onClick={toggleFaqsVisible}
            style={styles.button}
          >
            View FAQs
          </Button>
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

      {/* Access Information Modal */}
      <Modal
        visible={infoVisible}
        onRequestClose={toggleInfoVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <IconButton onClick={toggleInfoVisible} style={styles.closeButton}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" component="h2" style={styles.modalTitle}>
              Access Information
            </Typography>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Typography variant="body2" component="p">
                {/* Add detailed information about BHC products and services here. */}
                Botswana Housing Corporation (BHC) offers various products and
                services to meet the housing needs of the community. This
                includes rental properties, properties for sale, and properties
                available for lease. The BHC also provides detailed information
                on how to apply for these properties, the eligibility criteria,
                and the necessary documentation required. Additionally, BHC
                supports maintenance services for properties under its
                management. For more detailed information, visit our website or
                contact our customer service.
              </Typography>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* FAQs and Procedures Modal */}
      <Modal
        visible={faqsVisible}
        onRequestClose={toggleFaqsVisible}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <IconButton onClick={toggleFaqsVisible} style={styles.closeButton}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h5" component="h2" style={styles.modalTitle}>
              FAQs and Procedures
            </Typography>
            <ScrollView contentContainerStyle={styles.modalScroll}>
              <Typography variant="body2" component="p">
                {/* Add detailed FAQs and procedures here. */}
                <strong>1. How do I apply for a property?</strong>
                <br />
                You can apply for a property by visiting our website and filling
                out the online application form. Alternatively, you can visit
                our offices to get assistance with the application process.
                <br />
                <br />
                <strong>2. What are the eligibility criteria?</strong>
                <br />
                The eligibility criteria vary depending on the type of property
                you are applying for. Generally, you need to provide proof of
                income, a valid ID, and references. Detailed criteria are
                available on our website.
                <br />
                <br />
                <strong>
                  3. What documents are required for the application?
                </strong>
                <br />
                The required documents include proof of income, a valid ID, and
                references. Additional documents may be required based on the
                specific property and your circumstances.
                <br />
                <br />
                {/* Add more FAQs as needed */}
              </Typography>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#FAA21B",
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
  button: {
    marginTop: 16,
    width: "100%",
    backgroundColor: "#FAA21B",
    color: "#fff",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    color: "#AD2524",
  },
  modalTitle: {
    marginBottom: 16,
    color: "#FAA21B",
  },
  modalScroll: {
    padding: 16,
  },
});

export default InformationCenterScreen;
