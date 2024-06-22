import React, { useContext } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Avatar } from "react-native-paper";
import HomeScreen from "../home/HomeScreen";
import MaintenanceRequestsScreen from "../maintenance/MaintenanceRequestsScreen";
import PaymentsScreen from "../payments/PaymentsScreen";
import ProfileScreen from "../profile/ProfileScreen";
import PropertyDetailsScreen from "../properties/PropertyDetailsScreen";
import BottomNav from "../common/BottomNav";
import { AuthContext } from "../../context/AuthContext";

const Drawer = createDrawerNavigator();

const CustomDrawerContent: React.FC<any> = (props) => {
  const { currentUser } = useContext(AuthContext);

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Avatar.Icon size={50} icon="account" />
        <Text>
          {currentUser
            ? `${currentUser.firstName} ${currentUser.lastName}`
            : "Guest"}
        </Text>
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

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={BottomNav} />
      <Drawer.Screen name="Properties" component={PropertyDetailsScreen} />
      <Drawer.Screen name="Maintenance" component={MaintenanceRequestsScreen} />
      <Drawer.Screen name="Payments" component={PaymentsScreen} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
});

export default DrawerNavigator;
