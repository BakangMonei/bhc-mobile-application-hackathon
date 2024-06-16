import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Typography, Card, CardContent, Button, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminPaymentManagementScreen = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const paymentsSnapshot = await getDocs(collection(db, 'payments'));
      const paymentsList = paymentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPayments(paymentsList);
    };

    fetchPayments();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'payments', id));
    setPayments(payments.filter(payment => payment.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Payment Management
      </Typography>
      <DataGrid
        rows={payments}
        columns={[
          { field: 'amount', headerName: 'Amount', width: 200 },
          { field: 'method', headerName: 'Payment Method', width: 200 },
          { field: 'date', headerName: 'Date', width: 200 },
          {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
              <div>
                <IconButton onClick={() => handleDelete(params.row.id)} color="secondary">
                  <DeleteIcon />
                </IconButton>
              </div>
            ),
          },
        ]}
        pageSize={5}
        style={{ height: 400, width: '100%', marginTop: 16 }}
      />
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
});

export default AdminPaymentManagementScreen;
