import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AdminHomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Home</Text>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("User Support")}
        style={styles.button}
      >
        User Support
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Content Management")}
        style={styles.button}
      >
        Content Management
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Property Management")}
        style={styles.button}
      >
        Property Management
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Payment Management")}
        style={styles.button}
      >
        Payment Management
      </Button>
      <Button
        mode="contained"
        onPress={() => navigation.navigate("Reporting & Analytics")}
        style={styles.button}
      >
        Reporting & Analytics
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    marginBottom: 16,
  },
});

export default AdminHomeScreen;
