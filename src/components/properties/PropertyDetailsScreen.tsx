import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import {
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../../services/firebase";

const PropertyDetailsScreen = () => {
  const [search, setSearch] = useState("");
  const [propertiesForRent, setPropertiesForRent] = useState([]);
  const [propertiesForSale, setPropertiesForSale] = useState([]);
  const navigation = useNavigation();

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

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePropertyClick = (property) => {
    // Navigate to property detail view or perform other actions
    console.log("Property clicked:", property);
  };

  const handleAddProperty = () => {
    navigation.navigate("PropertyListings");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.searchContainer}>
        <TextField
          label="Search"
          value={search}
          onChange={handleSearchChange}
          fullWidth
          variant="outlined"
        />
        <IconButton
          onClick={handleAddProperty}
          color="primary"
          style={styles.addButton}
        >
          <AddIcon />
        </IconButton>
      </View>

      <Typography variant="h5" component="h2" style={styles.sectionTitle}>
        Properties for Rent
      </Typography>
      <View style={styles.cardContainer}>
        {propertiesForRent.map((property) => (
          <Card key={property.id} style={styles.card}>
            <CardContent>
              <TouchableOpacity onPress={() => handlePropertyClick(property)}>
                <img
                  src={property.image}
                  alt={property.title}
                  style={styles.cardImage}
                />
                <Typography variant="h6" component="h3">
                  {property.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {property.description}
                </Typography>
              </TouchableOpacity>
            </CardContent>
          </Card>
        ))}
      </View>

      <Typography variant="h5" component="h2" style={styles.sectionTitle}>
        Properties for Sale
      </Typography>
      <View style={styles.cardContainer}>
        {propertiesForSale.map((property) => (
          <Card key={property.id} style={styles.card}>
            <CardContent>
              <TouchableOpacity onPress={() => handlePropertyClick(property)}>
                <img
                  src={property.image}
                  alt={property.title}
                  style={styles.cardImage}
                />
                <Typography variant="h6" component="h3">
                  {property.title}
                </Typography>
                <Typography variant="body2" component="p">
                  {property.description}
                </Typography>
              </TouchableOpacity>
            </CardContent>
          </Card>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  addButton: {
    marginLeft: 16,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 16,
  },
  cardImage: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
});

export default PropertyDetailsScreen;
