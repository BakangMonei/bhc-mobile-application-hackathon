import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNav from "../common/BottomNav";
import FAQStackNavigator from "../../navigation/FAQStackNavigator";
import Icon from "react-native-vector-icons/MaterialIcons";

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Home"
        component={BottomNav}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAQs"
        component={FAQStackNavigator}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="help" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
