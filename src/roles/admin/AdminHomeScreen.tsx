import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Button, Card, Title, Paragraph, Avatar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const AdminHomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <ImageBackground
      source={require("../../assets/images/bhc.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
            <View style={styles.avatarContainer}>
              <Avatar.Image
                size={80}
                source={require("../../assets/images/neizatheedev.png")}
              />
            </View>
            <Title style={styles.title}>Welcome, Admin</Title>
            <Paragraph style={styles.paragraph}>
              Manage and oversee all activities within the platform.
            </Paragraph>
          </Card.Content>
        </Card>


        

      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  card: {
    marginBottom: 32,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: -40,
    marginBottom: 16,
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#AD2524",
    marginBottom: 8,
  },
  paragraph: {
    textAlign: "center",
    fontSize: 16,
    color: "#333",
  },
  button: {
    marginVertical: 8,
    backgroundColor: "#FAA21B",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AdminHomeScreen;
