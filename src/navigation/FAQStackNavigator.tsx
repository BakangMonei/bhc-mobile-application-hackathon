import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import InformationCenterScreen from "../components/information/InformationCenterScreen";
import InquiryFormScreen from "../components/information/InquiryFormScreen";

const Stack = createStackNavigator();

const FAQStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="InformationCenterScreen"
        component={InformationCenterScreen}
      />
      <Stack.Screen name="InquiryFormScreen" component={InquiryFormScreen} />
    </Stack.Navigator>
  );
};

export default FAQStackNavigator;
