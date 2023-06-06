import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Picker, ScrollView } from 'react-native';
import profilsData from './professeurs.json';

const Recherche = () => {
  const [specialite, setSpecialite] = useState('');
  const [villeFaculteActuelle, setVilleFaculteActuelle] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');
  const [profils, setProfils] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    setProfils(profilsData);
  }, []);

  const specialites = Array.from(new Set(profils.map((profil) => profil.specialite)));
  const villesActuelles = Array.from(new Set(profils.map((profil) => profil.villeFaculteActuelle)));
  const villesDesirees = Array.from(new Set(profils.flatMap((profil) => profil.villeDesiree.split(';'))));

  const handleSearch = () => {
    const filteredResults = profils.filter((profil) => {
      const matchSpecialite = specialite ? profil.specialite === specialite : true;
      const matchVilleFaculteActuelle = villeFaculteActuelle ? profil.villeFaculteActuelle === villeFaculteActuelle : true;
      const matchVilleDesiree = villeDesiree ? profil.villeDesiree.includes(villeDesiree) : true;
      return matchSpecialite && matchVilleFaculteActuelle && matchVilleDesiree;
    });

    setResults(filteredResults);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Recherche</Text>
        <Text style={styles.label}>Spécialité :</Text>
        <Picker
          selectedValue={specialite}
          style={styles.picker}
          onValueChange={(itemValue) => setSpecialite(itemValue)}
        >
          <Picker.Item label="Toutes les spécialités" value="" />
          {specialites.map((sp, index) => (
            <Picker.Item key={index} label={sp} value={sp} />
          ))}
        </Picker>
        <Text style={styles.label}>Ville actuelle :</Text>
        <Picker
          selectedValue={villeFaculteActuelle}
          style={styles.picker}
          onValueChange={(itemValue) => setVilleFaculteActuelle(itemValue)}
        >
          <Picker.Item label="Toutes les villes" value="" />
          {villesActuelles.map((va, index) => (
            <Picker.Item key={index} label={va} value={va} />
          ))}
        </Picker>
        <Text style={styles.label}>Ville souhaitée :</Text>
        <Picker
          selectedValue={villeDesiree}
          style={styles.picker}
          onValueChange={(itemValue) => setVilleDesiree(itemValue)}
        >
          <Picker.Item label="Toutes les villes" value="" />
          {villesDesirees.map((vd, index) => (
            <Picker.Item key={index} label={vd} value={vd} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleSearch}>
          <Text style={styles.buttonText}>Rechercher</Text>
        </TouchableOpacity>
        <Text style={styles.resultsTitle}>Résultats :</Text>
        {results.map((profil) => (
          <View key={profil.id} style={styles.resultItem}>
            <Text style={styles.resultText}>Nom: {profil.nom}</Text>
            <Text style={styles.resultText}>Spécialité: {profil.specialite}</Text>
            <Text style={styles.resultText}>Ville actuelle: {profil.villeFaculteActuelle}</Text>
            <Text style={styles.resultText}>Villes souhaitées: {profil.villeDesiree}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  resultItem: {
    borderWidth: 1,
    borderColor: '#000000',
    padding: 10,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 16,
  },
});

export default Recherche;
