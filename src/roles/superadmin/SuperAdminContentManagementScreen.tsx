import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const SuperAdminContentManagementScreen = () => {
  const [approveContentModalOpen, setApproveContentModalOpen] = useState(false);
  const [manageSettingsModalOpen, setManageSettingsModalOpen] = useState(false);

  const handleOpenApproveContentModal = () => {
    setApproveContentModalOpen(true);
  };

  const handleCloseApproveContentModal = () => {
    setApproveContentModalOpen(false);
  };

  const handleOpenManageSettingsModal = () => {
    setManageSettingsModalOpen(true);
  };

  const handleCloseManageSettingsModal = () => {
    setManageSettingsModalOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Approve Content
          </Typography>
          <Typography variant="body2" component="p">
            Review and approve content submitted by admins.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={handleOpenApproveContentModal}
          >
            Approve Content
          </Button>
        </CardContent>
      </Card>

      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Manage Settings
          </Typography>
          <Typography variant="body2" component="p">
            Configure app settings and manage configurations.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={handleOpenManageSettingsModal}
          >
            Manage Settings
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={approveContentModalOpen}
        onClose={handleCloseApproveContentModal}
      >
        <Box style={styles.modal}>
          <IconButton
            style={styles.closeButton}
            onClick={handleCloseApproveContentModal}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2">
            Approve Content
          </Typography>
          <TextField
            label="Content ID"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Reviewer Comments"
            fullWidth
            margin="normal"
            variant="outlined"
            multiline
            rows={4}
          />
          <Button
            variant="contained"
            color="primary"
            style={styles.modalButton}
          >
            Approve
          </Button>
        </Box>
      </Modal>

      <Modal
        open={manageSettingsModalOpen}
        onClose={handleCloseManageSettingsModal}
      >
        <Box style={styles.modal}>
          <IconButton
            style={styles.closeButton}
            onClick={handleCloseManageSettingsModal}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" component="h2">
            Manage Settings
          </Typography>
          <TextField
            label="Setting 1"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Setting 2"
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            style={styles.modalButton}
          >
            Save Settings
          </Button>
        </Box>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f4f4f4",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    color: "#AD2524",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "gray",
  },
  button: {
    marginTop: 16,
    width: "100%",
  },
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "#ffffff",
    padding: 20,
    boxShadow: 24,
    borderRadius: 8,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalButton: {
    marginTop: 16,
    width: "100%",
  },
});

export default SuperAdminContentManagementScreen;
