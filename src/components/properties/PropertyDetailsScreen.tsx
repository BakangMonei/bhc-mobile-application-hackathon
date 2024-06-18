import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Typography, Card, CardContent, IconButton, Fab } from "@mui/material";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../services/firebase";
import { AuthContext } from "../../context/AuthContext";
import Carousel from "react-material-ui-carousel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const PropertyDetailsScreen = ({ navigation }) => {
  const { currentUser } = useContext(AuthContext);
  const [propertiesForRent, setPropertiesForRent] = useState([]);
  const [propertiesForSale, setPropertiesForSale] = useState([]);

  useEffect(() => {
    const fetchProperties = () => {
      const q = query(collection(db, "properties"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const rentProperties = [];
        const saleProperties = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.type === "rent") {
            rentProperties.push({ ...data, id: doc.id });
          } else if (data.type === "sale") {
            saleProperties.push({ ...data, id: doc.id });
          }
        });
        setPropertiesForRent(rentProperties);
        setPropertiesForSale(saleProperties);
      });

      return unsubscribe;
    };

    const unsubscribe = fetchProperties();
    return () => {
      unsubscribe();
    };
  }, []);

  const handlePropertyClick = (property) => {
    // Navigate to property detail view or perform other actions
    console.log("Property clicked:", property);
  };

  const handleEditProperty = (property) => {
    // Implement edit functionality
    console.log("Edit property:", property);
  };

  const handleDeleteProperty = async (property) => {
    try {
      await deleteDoc(doc(db, "properties", property.id));
      console.log("Property deleted successfully");
      Alert.alert("Success", "Property deleted successfully");
    } catch (error) {
      console.error("Error deleting property:", error);
      Alert.alert("Error", "Error deleting property. Please try again.");
    }
  };

  const handleAddProperty = () => {
    navigation.navigate("PropertyListingsScreen");
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Typography variant="h5" component="h2" style={styles.sectionTitle}>
          Properties for Rent
        </Typography>
        <Carousel>
          {propertiesForRent.map((property) => (
            <Card key={property.id} style={styles.card}>
              <CardContent>
                <TouchableOpacity onPress={() => handlePropertyClick(property)}>
                  <Image
                    source={{ uri: property.image }}
                    style={styles.cardImage}
                  />
                  <Typography variant="h6" component="h3">
                    {property.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {property.description}
                  </Typography>
                  {property.date && (
                    <Typography variant="body2" component="p">
                      Posted on:{" "}
                      {new Date(
                        property.date.seconds * 1000
                      ).toLocaleDateString()}{" "}
                      at{" "}
                      {new Date(
                        property.date.seconds * 1000
                      ).toLocaleTimeString()}
                    </Typography>
                  )}
                </TouchableOpacity>
                {property.uid === currentUser.uid && (
                  <>
                    <IconButton
                      onClick={() => handleEditProperty(property)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteProperty(property)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Carousel>
        <Typography variant="h5" component="h2" style={styles.sectionTitle}>
          Properties for Sale
        </Typography>
        <Carousel>
          {propertiesForSale.map((property) => (
            <Card key={property.id} style={styles.card}>
              <CardContent>
                <TouchableOpacity onPress={() => handlePropertyClick(property)}>
                  <Image
                    source={{ uri: property.image }}
                    style={styles.cardImage}
                  />
                  <Typography variant="h6" component="h3">
                    {property.title}
                  </Typography>
                  <Typography variant="body2" component="p">
                    {property.description}
                  </Typography>
                  {property.date && (
                    <Typography variant="body2" component="p">
                      Posted on:{" "}
                      {new Date(
                        property.date.seconds * 1000
                      ).toLocaleDateString()}{" "}
                      at{" "}
                      {new Date(
                        property.date.seconds * 1000
                      ).toLocaleTimeString()}
                    </Typography>
                  )}
                </TouchableOpacity>
                {property.uid === currentUser.uid && (
                  <>
                    <IconButton
                      onClick={() => handleEditProperty(property)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteProperty(property)}
                      color="secondary"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </ScrollView>
      <Fab
        color="primary"
        aria-label="add"
        style={styles.fab}
        onClick={handleAddProperty}
      >
        <AddIcon />
      </Fab>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  card: {
    marginBottom: 16,
  },
  cardImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
  fab: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});

export default PropertyDetailsScreen;
