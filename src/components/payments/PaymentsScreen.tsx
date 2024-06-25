import React, { useState, useContext, useEffect } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";

const PaymentsScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [paymentDetails, setPaymentDetails] = useState({
    amount: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVC: "",
    paymentMethod: "Bank Card",
  });
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const q = query(
        collection(db, "payments"),
        where("uid", "==", currentUser.uid)
      );
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedPayments = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          date: doc.data().date ? doc.data().date.toDate() : new Date(), // Handle date field
        }));
        setPayments(fetchedPayments);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleChange = (e) => {
    setPaymentDetails({
      ...paymentDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const paymentData = {
        ...paymentDetails,
        uid: currentUser.uid,
        date: serverTimestamp(),
      };
      await addDoc(collection(db, "payments"), paymentData);
      console.log("Payment made and stored successfully");
      setPaymentDetails({
        amount: "",
        cardNumber: "",
        cardExpiry: "",
        cardCVC: "",
        paymentMethod: "Bank Card",
      });
    } catch (error) {
      console.error("Error making payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Payments
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Make a Payment
          </Typography>
          <TextField
            label="Amount"
            name="amount"
            value={paymentDetails.amount}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Card Number"
            name="cardNumber"
            value={paymentDetails.cardNumber}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Card Expiry (MM/YY)"
            name="cardExpiry"
            value={paymentDetails.cardExpiry}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Card CVC"
            name="cardCVC"
            value={paymentDetails.cardCVC}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handlePayment}
            style={styles.button}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress color="inherit" size={24} />
            ) : (
              "Pay Now"
            )}
          </Button>
        </CardContent>
      </Card>
      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Payment History
      </Typography>
      {payments.map((payment) => (
        <Card key={payment.id} style={styles.card}>
          <CardContent>
            <Typography variant="body2" component="p">
              Amount: {payment.amount}
            </Typography>
            <Typography variant="body2" component="p">
              Payment Method: {payment.paymentMethod}
            </Typography>
            <Typography variant="body2" component="p">
              Date: {payment.date.toLocaleString()}
            </Typography>
          </CardContent>
        </Card>
      ))}
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
    color: "#ff9800",
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
    backgroundColor: "#ff9800",
    color: "#fff",
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
    color: "#ff9800",
  },
});

export default PaymentsScreen;
