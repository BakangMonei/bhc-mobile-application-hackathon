import React, { useContext, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomNav from "../common/BottomNav";
import FAQStackNavigator from "../../navigation/FAQStackNavigator";
import Icon from "react-native-vector-icons/MaterialIcons";
import InboxScreen from "../messaging/InboxScreen"
import MessageSendScreen from "../messaging/MessageSendScreen";
import MessageDetailScreen from "../messaging/MessageDetailScreen";
import UserCustomDrawerContent from "./UserCustomDrawerContent"; // Assuming the path to your custom drawer content

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <UserCustomDrawerContent{...props} />}>
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
      <Drawer.Screen
        name="Inbox"
        component={InboxScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="help" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="MessageSendScreen"
        component={MessageSendScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="help" color={color} size={size} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name=""
        component={MessageDetailScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Icon name="help" color={color} size={size} />
          ),
        }}
      /> */}
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
