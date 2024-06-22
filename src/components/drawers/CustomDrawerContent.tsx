import React, { useContext } from "react";
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Avatar } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";

const CustomDrawerContent: React.FC<any> = (props) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Avatar.Icon size={50} icon="account" />
        <Text>{currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : "Guest"}</Text>
      </View>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        onPress={() => console.log("Logout pressed")}
        icon={({ color, size }) => (
          <Icon name="logout" color={color} size={size} />
        )}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default CustomDrawerContent;
