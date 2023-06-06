import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Connected = ({ currentUser }) => {
  const navigation = useNavigation();

  const handleDashboardPress = () => {
    navigation.navigate('Dashboard');
  };

  const handleLogoutPress = () => {
    navigation.navigate('Welcome');
  };

  const handleSearchPress = () => {
    navigation.navigate('Recherche');
  };

  const handleCombinationsPress = () => {
    navigation.navigate('Combinaisons');
  };

  const handleProfilePress = () => {
    navigation.navigate('Profile', { user: currentUser });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={handleDashboardPress}>
        <Text style={styles.itemText}>Dashboard</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={handleLogoutPress}>
        <Text style={styles.itemText}>Déconnexion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={handleSearchPress}>
        <Text style={styles.itemText}>Rechercher</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={handleCombinationsPress}>
        <Text style={styles.itemText}>Combinaisons</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.item} onPress={handleProfilePress}>
        <Text style={styles.itemText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    marginBottom: 20,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default Connected;
