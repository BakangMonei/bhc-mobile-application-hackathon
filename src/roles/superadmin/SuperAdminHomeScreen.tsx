import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import {
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Fab,
  Popover,
} from "@mui/material";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Carousel from "react-material-ui-carousel";

const SuperAdminHomeScreen = () => {
  const { currentUser } = useContext(AuthContext);
  const [announcements, setAnnouncements] = useState([]);
  const [properties, setProperties] = useState([]);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  });
  const [newComment, setNewComment] = useState("");
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = () => {
      const q = query(collection(db, "announcements"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedAnnouncements = [];
        snapshot.forEach((doc) => {
          fetchedAnnouncements.push({ id: doc.id, ...doc.data() });
        });
        setAnnouncements(fetchedAnnouncements);
      });
      return unsubscribe;
    };

    const fetchProperties = () => {
      const q = query(collection(db, "properties"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedProperties = [];
        snapshot.forEach((doc) => {
          fetchedProperties.push({ id: doc.id, ...doc.data() });
        });
        setProperties(fetchedProperties);
      });
      return unsubscribe;
    };

    fetchAnnouncements();
    fetchProperties();
  }, []);

  const handleOpenAddAnnouncement = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAddAnnouncement = () => {
    setAnchorEl(null);
  };

  const handleAddAnnouncement = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "announcements"), {
        ...newAnnouncement,
        uid: currentUser.uid,
        author: `${currentUser.firstName} ${currentUser.lastName}`,
        timestamp: serverTimestamp(),
      });
      setNewAnnouncement({ title: "", content: "" });
      setAnchorEl(null);
    } catch (error) {
      console.error("Error adding announcement: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateAnnouncement = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "announcements", selectedAnnouncement.id);
      await updateDoc(docRef, {
        ...newAnnouncement,
        timestamp: serverTimestamp(),
      });
      setSelectedAnnouncement(null);
      setNewAnnouncement({ title: "", content: "" });
    } catch (error) {
      console.error("Error updating announcement: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "announcements", id));
    } catch (error) {
      console.error("Error deleting announcement: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async (announcementId) => {
    if (!newComment) return;
    setLoading(true);
    try {
      const commentData = {
        content: newComment,
        uid: currentUser.uid,
        firstName: currentUser.firstName,
        timestamp: serverTimestamp(),
      };
      await addDoc(
        collection(db, "announcements", announcementId, "comments"),
        commentData
      );
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = (announcementId) => {
    const q = query(
      collection(db, "announcements", announcementId, "comments")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = [];
      snapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() });
      });
      setComments((prev) => ({ ...prev, [announcementId]: fetchedComments }));
    });
    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribeComments = announcements.map((announcement) =>
      fetchComments(announcement.id)
    );

    return () => {
      unsubscribeComments.forEach((unsubscribe) => unsubscribe());
    };
  }, [announcements]);

  const handlePropertyContact = (property) => {
    alert(`Contact ${property.name} at ${property.phone} or ${property.email}`);
  };

  const renderPropertiesByType = (type) => {
    return properties
      .filter((property) => property.type === type)
      .map((property) => (
        <Card key={property.id} style={styles.card}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {property.title}
            </Typography>
            <Typography variant="body2" component="p">
              {property.description}
            </Typography>
            <Typography variant="body2" component="p">
              Location: {property.location}
            </Typography>
            <Typography variant="body2" component="p">
              Type: {property.type}
            </Typography>
            <Typography variant="body2" component="p">
              Price: ${property.price}
            </Typography>
            <Typography variant="body2" component="p">
              Posted by: {property.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleDeleteProperty(property.id)}
              style={styles.button}
              disabled={loading}
            >
              Delete Property
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={() => handlePropertyContact(property)}
              style={styles.button}
              disabled={loading}
            >
              Contact Poster
            </Button>
          </CardContent>
        </Card>
      ));
  };

  const handleDeleteProperty = async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(db, "properties", id));
    } catch (error) {
      console.error("Error deleting property: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Typography variant="h4" component="h1" style={styles.title}>
        Home
      </Typography>
      {(currentUser.role === "admin" || currentUser.role === "superadmin") && (
        <>
          <Fab
            color="primary"
            aria-label="add"
            style={styles.fab}
            onClick={handleOpenAddAnnouncement}
          >
            <AddIcon />
          </Fab>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleCloseAddAnnouncement}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Card style={styles.card}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  Create Announcement
                </Typography>
                <TextField
                  label="Title"
                  value={newAnnouncement.title}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      title: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  variant="outlined"
                />
                <TextField
                  label="Content"
                  value={newAnnouncement.content}
                  onChange={(e) =>
                    setNewAnnouncement({
                      ...newAnnouncement,
                      content: e.target.value,
                    })
                  }
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  multiline
                  rows={4}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={
                    selectedAnnouncement
                      ? handleUpdateAnnouncement
                      : handleAddAnnouncement
                  }
                  style={styles.button}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} />
                  ) : selectedAnnouncement ? (
                    "Update Announcement"
                  ) : (
                    "Add Announcement"
                  )}
                </Button>
              </CardContent>
            </Card>
          </Popover>
        </>
      )}

      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Announcements
      </Typography>
      {announcements.map((announcement) => (
        <Card key={announcement.id} style={styles.card}>
          <CardContent>
            <Typography variant="h6" component="h2">
              {announcement.title}
            </Typography>
            <Typography variant="body2" component="p">
              {announcement.content}
            </Typography>
            <Typography variant="caption" component="p">
              Posted by: {announcement.author} on{" "}
              {announcement.timestamp?.toDate().toLocaleString()}
            </Typography>
            {(currentUser.role === "admin" ||
              currentUser.role === "superadmin") && (
              <>
                <IconButton
                  onClick={() => {
                    setSelectedAnnouncement(announcement);
                    setNewAnnouncement({
                      title: announcement.title,
                      content: announcement.content,
                    });
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteAnnouncement(announcement.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </>
            )}
            <View style={styles.commentSection}>
              <Typography variant="subtitle1" component="h3">
                Comments
              </Typography>
              {comments[announcement.id]?.map((comment) => (
                <View key={comment.id} style={styles.comment}>
                  <Typography variant="body2" component="p">
                    {comment.content}
                  </Typography>
                  <Typography variant="caption" component="p">
                    - {comment.firstName} on{" "}
                    {comment.timestamp?.toDate().toLocaleString()}
                  </Typography>
                </View>
              ))}
              <TextField
                label="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                fullWidth
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleAddComment(announcement.id)}
                disabled={loading}
              >
                Comment
              </Button>
            </View>
          </CardContent>
        </Card>
      ))}

      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Properties for Sale
      </Typography>
      <Carousel>{renderPropertiesByType("sale")}</Carousel>

      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Properties for Lease
      </Typography>
      <Carousel>{renderPropertiesByType("lease")}</Carousel>

      <Typography variant="h6" component="h2" style={styles.sectionTitle}>
        Properties for Rent
      </Typography>
      <Carousel>{renderPropertiesByType("rent")}</Carousel>
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
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  commentSection: {
    marginTop: 16,
  },
  comment: {
    marginBottom: 8,
  },
  addIcon: {
    position: "absolute",
    bottom: 16,
    right: 16,
    zIndex: 1000,
    backgroundColor: "red",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "primary",
  },
});

export default SuperAdminHomeScreen;
