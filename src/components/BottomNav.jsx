import React from "react";
import { View } from "react-native";
import {
  Home,
  Building,
  CreditCard,
  Wrench,
  User,
  Dashboard,
  Users,
  Edit,
  BarChart,
  Shield,
} from "@mui/icons-material";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";

const BottomNav = ({ role }) => {
  return (
    <BottomNavigation>
      <BottomNavigationAction label="Home" icon={<Home />} />
      <BottomNavigationAction label="Properties" icon={<Building />} />
      <BottomNavigationAction label="Payments" icon={<CreditCard />} />
      <BottomNavigationAction label="Maintenance" icon={<Wrench />} />
      <BottomNavigationAction label="Profile" icon={<User />} />
      {role === "superadmin" && (
        <>
          <BottomNavigationAction label="Dashboard" icon={<Dashboard />} />
          <BottomNavigationAction label="Users" icon={<Users />} />
          <BottomNavigationAction label="Content" icon={<Edit />} />
          <BottomNavigationAction label="Analytics" icon={<BarChart />} />
          <BottomNavigationAction label="Security" icon={<Shield />} />
        </>
      )}
      {role === "admin" && (
        <>
          <BottomNavigationAction label="Dashboard" icon={<Dashboard />} />
          <BottomNavigationAction label="Support" icon={<Headphones />} />
          <BottomNavigationAction label="Reports" icon={<FileAlt />} />
        </>
      )}
    </BottomNavigation>
  );
};

export default BottomNav;
