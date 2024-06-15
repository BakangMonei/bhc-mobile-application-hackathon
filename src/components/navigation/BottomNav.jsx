import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

const BottomNav = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const tabs = [
    { name: 'Home', icon: 'home', label: 'Home' },
    { name: 'PropertyListings', icon: 'list', label: 'Properties' },
    { name: 'Payments', icon: 'credit-card', label: 'Payments' },
    { name: 'MaintenanceRequests', icon: 'wrench', label: 'Maintenance' },
    { name: 'Profile', icon: 'user', label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(tab.name)}
          style={[
            styles.tab,
            route.name === tab.name && styles.activeTab,
          ]}
        >
          <Icon
            name={tab.icon}
            size={20}
            style={[
              styles.icon,
              route.name === tab.name && styles.activeIcon,
            ]}
          />
          <Text
            style={[
              styles.label,
              route.name === tab.name && styles.activeLabel,
            ]}
          >
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: 'orange',
  },
  tab: {
    alignItems: 'center',
  },
  icon: {
    color: 'white',
  },
  label: {
    color: 'white',
    fontSize: 12,
  },
  activeTab: {
    backgroundColor: 'orange',
  },
  activeIcon: {
    color: '#AD2524',
  },
  activeLabel: {
    color: '#AD2524',
  },
});

export default BottomNav;
