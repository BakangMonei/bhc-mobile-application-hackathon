import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Typography, Card, CardContent, Button, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const AdminUserSupportScreen = () => {
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const fetchInquiries = async () => {
      const inquiriesSnapshot = await getDocs(collection(db, 'inquiries'));
      const inquiriesList = inquiriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setInquiries(inquiriesList);
    };

    fetchInquiries();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'inquiries', id));
    setInquiries(inquiries.filter(inquiry => inquiry.id !== id));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        User Support
      </Typography>
      <DataGrid
        rows={inquiries}
        columns={[
          { field: 'name', headerName: 'Name', width: 200 },
          { field: 'email', headerName: 'Email', width: 200 },
          { field: 'inquiry', headerName: 'Inquiry', width: 300 },
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

export default AdminUserSupportScreen;
