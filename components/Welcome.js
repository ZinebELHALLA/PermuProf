import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import b1 from './b1.png';

export default function Welcome() {
  const navigation = useNavigation();

  const handleStartPress = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.message}>Welcoem to your permutator application> PermuProf</Text>      
      <TouchableOpacity style={styles.button} onPress={handleStartPress}>
  
  <Text style={styles.buttonText}>Start</Text>
</TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  message: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#2B547E',
    textAlign:'center',
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 25,
    width: 150,
    height: 40,
    backgroundColor: '#728FCE',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  }

});