import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Combinaisons = () => {
  const [professeurs, setProfesseurs] = useState([]);

  useEffect(() => {
    fetchProfesseurs();
  }, []);

  const fetchProfesseurs = async () => {
    try {
      // Récupérer les données du fichier JSON
      const response = require('./professeurs.json');
      // Mettre à jour le state avec les données des professeurs
      setProfesseurs(response);
    } catch (error) {
      console.log('Error fetching professeurs:', error);
    }
  };

  const getCombinaisons = () => {
    const combinaisons = [];
    for (let i = 0; i < professeurs.length; i++) {
      const prof1 = professeurs[i];
      for (let j = i + 1; j < professeurs.length; j++) {
        const prof2 = professeurs[j];
        if (
          (prof1.villeFaculteActuelle === prof2.villeDesiree && prof1.villeDesiree === prof2.villeFaculteActuelle) ||
          (prof1.villeDesiree === prof2.villeFaculteActuelle && prof1.villeFaculteActuelle === prof2.villeDesiree)
        ) {
          combinaisons.push([prof1, prof2]);
        }
      }
    }
    return combinaisons;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Combinaisons</Text>
      {getCombinaisons().map((combinaison, index) => (
        <View key={index} style={styles.combinaisonContainer}>
          <Text style={styles.combinaisonText}>
            Professor {combinaison[0].nom} {combinaison[0].prenom} (Ville {combinaison[0].villeFaculteActuelle}) - Ville {combinaison[0].villeDesiree}
          </Text>
          <Text style={styles.combinaisonText}>
            Professor {combinaison[1].nom} {combinaison[1].prenom} (Ville {combinaison[1].villeFaculteActuelle}) - Ville {combinaison[1].villeDesiree}
          </Text>
          <View style={styles.separator} /> {/* Ligne de séparation */}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  combinaisonContainer: {
    marginBottom: 10,
  },
  combinaisonText: {
    fontSize: 16,
    marginBottom: 5,
  },
  separator: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default Combinaisons;
