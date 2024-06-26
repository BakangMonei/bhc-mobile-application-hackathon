import React, { useEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
} from "@mui/material";
import {
  collection,
  onSnapshot,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import PrintIcon from "@mui/icons-material/Print";
import CloseIcon from "@mui/icons-material/Close";

const AdminPaymentManagementScreen = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [userDetails, setUserDetails] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "payments"), (snapshot) => {
      const fetchedPayments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPayments(fetchedPayments);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const handleResolveIssue = async (id) => {
    try {
      const paymentRef = doc(db, "payments", id);
      await updateDoc(paymentRef, { status: "Resolved" });
      console.log("Payment issue resolved successfully");
    } catch (error) {
      console.error("Error resolving payment issue:", error);
    }
  };

  const handleCardClick = async (payment) => {
    setSelectedPayment(payment);
    setModalVisible(true);
    try {
      const userRef = doc(db, "users", payment.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setUserDetails(userSnap.data());
      } else {
        setUserDetails(null);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUserDetails(null);
    }
  };

  const handlePrint = () => {
    // Implement your print functionality here
    alert("Print functionality to be implemented");
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedPayment(null);
    setUserDetails(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Payment Management
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        payments.map((payment) => (
          <TouchableOpacity
            key={payment.id}
            onPress={() => handleCardClick(payment)}
          >
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Payment ID: {payment.id}
                </Typography>
                <Typography variant="body2" component="p">
                  Amount: {payment.amount}
                </Typography>
                <Typography variant="body2" component="p">
                  Payment Method: {payment.paymentMethod}
                </Typography>
                <Typography variant="body2" component="p">
                  Date: {payment.date.toDate().toLocaleString()}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleResolveIssue(payment.id)}
                  style={styles.button}
                >
                  Resolve Issue
                </Button>
              </CardContent>
            </Card>
          </TouchableOpacity>
        ))
      )}

      <Modal
        visible={modalVisible}
        onRequestClose={handleCloseModal}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <CardContent>
              <Typography variant="h5" component="h2" style={styles.modalTitle}>
                Payment Details
              </Typography>
              {userDetails ? (
                <>
                  <Typography variant="body1" component="p">
                    Name: {userDetails.firstName} {userDetails.lastName}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Email: {userDetails.email}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1" component="p">
                  User details not available.
                </Typography>
              )}
              {selectedPayment && (
                <>
                  <Typography variant="body1" component="p">
                    Amount: {selectedPayment.amount}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Payment Method: {selectedPayment.paymentMethod}
                  </Typography>
                  <Typography variant="body1" component="p">
                    Date: {selectedPayment.date.toDate().toLocaleString()}
                  </Typography>
                </>
              )}
            </CardContent>
            <View style={styles.modalActions}>
              <Button
                variant="contained"
                color="primary"
                style={styles.printButton}
                startIcon={<PrintIcon />}
                onClick={handlePrint}
              >
                Print
              </Button>
              <Button
                variant="contained"
                color="secondary"
                style={styles.closeButton}
                startIcon={<CloseIcon />}
                onClick={handleCloseModal}
              >
                Close
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
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
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  modalTitle: {
    marginBottom: 16,
    color: "#FAA21B",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  printButton: {
    marginTop: 16,
    backgroundColor: "#FAA21B",
    color: "#fff",
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#AD2524",
    color: "#fff",
  },
});

export default AdminPaymentManagementScreen;
