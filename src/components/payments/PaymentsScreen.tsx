import React, { useState, useContext, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  onSnapshot,
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
          >
            Pay Now
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
              Date: {payment.date.toDate().toLocaleString()}
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
  sectionTitle: {
    marginTop: 24,
    marginBottom: 16,
  },
});

export default PaymentsScreen;
