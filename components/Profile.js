import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import profilsData from './professeurs.json';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const { email } = JSON.parse(userData);
        const userProfile = profilsData.find((profil) => profil.email === email);
        setUser(userProfile);
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await AsyncStorage.removeItem('user');
      // Autres étapes à effectuer pour supprimer le compte
    } catch (error) {
      console.log('Error deleting user account:', error);
    }
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <Text style={styles.label}>Nom:</Text>
          <Text style={styles.text}>{user.nom}</Text>

          <Text style={styles.label}>Prénom:</Text>
          <Text style={styles.text}>{user.prenom}</Text>

          <Text style={styles.label}>Téléphone:</Text>
          <Text style={styles.text}>{user.tel}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.text}>{user.email}</Text>

          <Text style={styles.label}>Mot de passe:</Text>
          <Text style={styles.text}>{user.password}</Text>

          <TouchableOpacity style={styles.button} onPress={handleDeleteAccount}>
            <Text style={styles.buttonText}>Supprimer le compte</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Aucune donnée utilisateur trouvée.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: 'red',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Profile;
