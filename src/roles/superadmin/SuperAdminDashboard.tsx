import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SuperAdminContentManagementScreen from "./SuperAdminContentManagementScreen";
import SuperAdminAnalyticsScreen from "./SuperAdminAnalyticsScreen";
import SuperAdminUserManagementScreen from "./SuperAdminUserManagementScreen";
import SuperAdminSecurityManagementScreen from "./SuperAdminSecurityManagementScreen";
import SuperAdminMaintenanceOversightScreen from "./SuperAdminMaintenanceOversightScreen";
import CustomDrawerContent from "../../components/drawers/CustomDrawerContent";
import SuperAdminHomeScreen from "./SuperAdminHomeScreen";

const Drawer = createDrawerNavigator();

const SuperAdminDashboard = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="SuperAdminHomeScreen"
        component={SuperAdminHomeScreen}
      />
      <Drawer.Screen
        name="User Management"
        component={SuperAdminUserManagementScreen}
      />
      <Drawer.Screen
        name="Content Management"
        component={SuperAdminContentManagementScreen}
      />
      <Drawer.Screen
        name="Analytics Reporting"
        component={SuperAdminAnalyticsScreen}
      />
      <Drawer.Screen
        name="Security Management"
        component={SuperAdminSecurityManagementScreen}
      />
      <Drawer.Screen
        name="Maintenance Oversight"
        component={SuperAdminMaintenanceOversightScreen}
      />
    </Drawer.Navigator>
  );
};

export default SuperAdminDashboard;
