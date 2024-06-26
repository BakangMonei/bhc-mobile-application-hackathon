import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  Typography,
  Card,
  CardContent,
  Button,
  Modal,
  TextField,
  Backdrop,
  Fade,
} from "@mui/material";

const SuperAdminSecurityManagementScreen = () => {
  const [auditResults, setAuditResults] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [permissions, setPermissions] = useState({
    read: false,
    write: false,
    execute: false,
  });

  const handleAuditClick = () => {
    // Simulate conducting an audit
    setAuditResults("Audit completed successfully. No issues found.");
    setModalOpen(true);
  };

  const handlePermissionsClick = () => {
    // Simulate managing permissions
    setPermissions({ read: true, write: true, execute: false });
    alert("Permissions updated successfully.");
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Typography variant="h4" component="h1" style={styles.title}>
        Security Management
      </Typography> */}
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Conduct Audits
          </Typography>
          <Typography variant="body2" component="p">
            Conduct and review security audits.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={handleAuditClick}
          >
            Conduct Audit
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Manage Permissions
          </Typography>
          <Typography variant="body2" component="p">
            Manage permissions and access levels.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={styles.button}
            onClick={handlePermissionsClick}
          >
            Manage Permissions
          </Button>
        </CardContent>
      </Card>
      <Card style={styles.card}>
        <CardContent>
          <Typography variant="h6" component="h2">
            Update Security Protocols
          </Typography>
          <Typography variant="body2" component="p">
            Implement and update security protocols.
          </Typography>
          <Button variant="contained" color="primary" style={styles.button}>
            Update Protocols
          </Button>
        </CardContent>
      </Card>

      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={modalOpen}>
          <div style={styles.modal}>
            <Typography variant="h6" component="h2">
              Audit Results
            </Typography>
            <Typography variant="body2" component="p">
              {auditResults}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              style={styles.button}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        </Fade>
      </Modal>
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
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    padding: 20,
    boxShadow: 24,
    outline: "none",
  },
});

export default SuperAdminSecurityManagementScreen;
