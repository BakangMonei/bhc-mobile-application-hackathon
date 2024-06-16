import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TextField, Typography, Card, CardContent, Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigation } from '@react-navigation/native';

const PropertyDetailsScreen = () => {
  const [search, setSearch] = useState('');
  const navigation = useNavigation();

  const propertiesForRent = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: '2 Bedroom Apartment',
      description: 'A beautiful 2 bedroom apartment in the city center.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Luxury Villa',
      description: 'A luxurious villa with modern amenities.',
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/150',
        title: 'Stone House',
        description: 'A luxurious villa with modern amenities.',
      },
  ];

  const propertiesForSale = [
    {
      id: 1,
      image: 'https://via.placeholder.com/150',
      title: '3 Bedroom House',
      description: 'A spacious 3 bedroom house in a quiet neighborhood.',
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/150',
      title: 'Modern Condo',
      description: 'A modern condo with all the latest features.',
    },
    {
        id: 3,
        image: 'https://via.placeholder.com/150',
        title: 'Lobatse',
        description: 'A modern condo with all the latest features.',
      },
  ];

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handlePropertyClick = (property) => {
    // Handle property click to show details
    console.log('Property clicked:', property);
  };

  const handleAddProperty = () => {
    navigation.navigate('PropertyListingsScreen');
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
        <IconButton onClick={handleAddProperty} color="primary" style={styles.addButton}>
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
                <img src={property.image} alt={property.title} style={styles.cardImage} />
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
                <img src={property.image} alt={property.title} style={styles.cardImage} />
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
    flexDirection: 'row',
    alignItems: 'center',
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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 150,
    objectFit: 'cover',
  },
});

export default PropertyDetailsScreen;
