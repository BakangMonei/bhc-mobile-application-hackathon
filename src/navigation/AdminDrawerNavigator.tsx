import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AdminCustomDrawerContent from "../components/drawers/AdminCustomDrawerContent";
import AdminUserSupportScreen from "../roles/admin/AdminUserSupportScreen";
import AdminContentManagementScreen from "../roles/admin/AdminContentManagementScreen";
import AdminPropertyManagementScreen from "../roles/admin/AdminPropertyManagementScreen";
import AdminPaymentManagementScreen from "../roles/admin/AdminPaymentManagementScreen";
import AdminReportingScreen from "../roles/admin/AdminReportingScreen";
import AdminBottomNav from "../components/common/AdminBottomNav";

const Drawer = createDrawerNavigator();

const AdminDrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <AdminCustomDrawerContent {...props} />}
    >
      <Drawer.Screen name="Home" component={AdminBottomNav} />
      <Drawer.Screen name="User Support" component={AdminUserSupportScreen} />
      <Drawer.Screen
        name="Content Management"
        component={AdminContentManagementScreen}
      />
      <Drawer.Screen
        name="Property Management"
        component={AdminPropertyManagementScreen}
      />
      <Drawer.Screen
        name="Payment Management"
        component={AdminPaymentManagementScreen}
      />
      <Drawer.Screen
        name="Reporting & Analytics"
        component={AdminReportingScreen}
      />
    </Drawer.Navigator>
  );
};

export default AdminDrawerNavigator;
