import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { bcrypt } from 'bcryptjs';

const Register = () => {
  const navigation = useNavigation();

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [grade, setGrade] = useState('');
  const [faculteActuelle, setFaculteActuelle] = useState('');
  const [villeFaculteActuelle, setVilleFaculteActuelle] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [villeDesiree, setVilleDesiree] = useState('');
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

  const getDistinctValues = (key) => {
    const distinctValues = professeurs.reduce((values, professeur) => {
      if (!values.includes(professeur[key])) {
        values.push(professeur[key]);
      }
      return values;
    }, []);
    return distinctValues;
  };

  const handleInscription = async () => {
    // Validation des données saisies
    // ...

    // Génération de l'ID unique
    const newId = new Date().getTime().toString();

    // Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Enregistrement de l'utilisateur
    const userData = {
      _id: newId,
      email,
      nom,
      prenom,
      tel,
      grade,
      specialite,
      faculteActuelle,
      villeFaculteActuelle,
      villeDesiree,
      __v: 0,
      password: hashedPassword,
    };

    try {
      // Récupérer les données existantes du fichier JSON
      const existingProfesseurs = [...professeurs];

      // Ajouter les données de l'utilisateur
      existingProfesseurs.push(userData);

      // Enregistrer les données dans le fichier JSON
      await AsyncStorage.setItem('professeurs', JSON.stringify(existingProfesseurs));

      // Redirection vers une autre page après l'inscription
      navigation.navigate('Connexion'); // Remplacez 'Connexion' par le nom de l'écran souhaité
    } catch (error) {
      console.log('Error saving user data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        style={styles.input}
        placeholder="Nom"
        value={nom}
        onChangeText={setNom}
      />

      <TextInput
        style={styles.input}
        placeholder="Prénom"
        value={prenom}
        onChangeText={setPrenom}
      />

      <TextInput
        style={styles.input}
        placeholder="Téléphone"
        value={tel}
        onChangeText={setTel}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      {professeurs.length > 0 && (
        <View style={styles.gradePicker}>
          <Text style={styles.gradePickerLabel}>Grade</Text>
          <Picker
            style={styles.gradePickerSelect}
            selectedValue={grade}
            onValueChange={(value) => setGrade(value)}
          >
            {getDistinctValues('grade').map((value, index) => (
              <Picker.Item key={index} label={value} value={value} />
            ))}
          </Picker>
        </View>
      )}

      <Picker
        style={styles.input}
        selectedValue={faculteActuelle}
        onValueChange={(value) => setFaculteActuelle(value)}
      >
        {getDistinctValues('faculteActuelle').map((value, index) => (
          <Picker.Item key={index} label={value} value={value} />
        ))}
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={villeFaculteActuelle}
        onValueChange={(value) => setVilleFaculteActuelle(value)}
      >
        {getDistinctValues('villeFaculteActuelle').map((value, index) => (
          <Picker.Item key={index} label={value} value={value} />
        ))}
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={specialite}
        onValueChange={(value) => setSpecialite(value)}
      >
        {getDistinctValues('specialite').map((value, index) => (
          <Picker.Item key={index} label={value} value={value} />
        ))}
      </Picker>

      <Picker
        style={styles.input}
        selectedValue={villeDesiree}
        onValueChange={(value) => setVilleDesiree(value)}
      >
        {getDistinctValues('villeDesiree').map((value, index) => (
          <Picker.Item key={index} label={value} value={value} />
        ))}
      </Picker>

      <TouchableOpacity style={styles.button} onPress={handleInscription}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  gradePicker: {
    width: '100%',
    marginBottom: 10,
  },
  gradePickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  gradePickerSelect: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: '#728FCE',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Register;
