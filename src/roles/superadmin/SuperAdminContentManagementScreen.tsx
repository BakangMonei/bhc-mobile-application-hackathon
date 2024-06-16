import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Typography, Card, CardContent, Button, TextField, IconButton } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const SuperAdminContentManagementScreen = () => {
  const [contents, setContents] = useState([]);
  const [editingContent, setEditingContent] = useState(null);
  const [contentData, setContentData] = useState({
    title: '',
    body: '',
    status: 'pending', // or 'approved'
  });

  useEffect(() => {
    const fetchContents = async () => {
      const contentsSnapshot = await getDocs(collection(db, 'contents'));
      const contentsList = contentsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContents(contentsList);
    };

    fetchContents();
  }, []);

  const handleEdit = (content) => {
    setEditingContent(content.id);
    setContentData({ title: content.title, body: content.body, status: content.status });
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'contents', id));
    setContents(contents.filter(content => content.id !== id));
  };

  const handleSave = async () => {
    if (editingContent) {
      await updateDoc(doc(db, 'contents', editingContent), contentData);
    } else {
      await setDoc(doc(collection(db, 'contents')), contentData);
    }
    setEditingContent(null);
    setContentData({ title: '', body: '', status: 'pending' });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Content Management
      </Typography>
      <Card style={styles.card}>
        <CardContent>
          <TextField
            label="Title"
            value={contentData.title}
            onChange={(e) => setContentData({ ...contentData, title: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Body"
            value={contentData.body}
            onChange={(e) => setContentData({ ...contentData, body: e.target.value })}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            label="Status"
            value={contentData.status}
            onChange={(e) => setContentData({ ...contentData, status: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" color="primary" onClick={handleSave} style={styles.button}>
            {editingContent ? 'Update Content' : 'Add Content'}
          </Button>
        </CardContent>
      </Card>
      <DataGrid
        rows={contents}
        columns={[
          { field: 'title', headerName: 'Title', width: 200 },
          { field: 'body', headerName: 'Body', width: 300 },
          { field: 'status', headerName: 'Status', width: 150 },
          {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
              <div>
                <IconButton onClick={() => handleEdit(params.row)} color="primary">
                  <EditIcon />
                </IconButton>
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
  card: {
    marginBottom: 16,
  },
  button: {
    marginTop: 16,
  },
});

export default SuperAdminContentManagementScreen;
