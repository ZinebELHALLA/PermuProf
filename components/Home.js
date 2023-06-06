import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [showHome, setShowHome] = useState(true);
  const [isPressed, setIsPressed] = useState(false);
  const sidebarWidth = 100;
  const animationDuration = 200;
  const sidebarTranslateX = useState(new Animated.Value(0))[0];

  const toggleHome = () => {
    setShowHome(!showHome);
    Animated.timing(sidebarTranslateX, {
      toValue: showHome ? 0 : -sidebarWidth,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  };

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const goToDashboard = () => {
    navigation.navigate('Dashboard');
    toggleHome();
  };

  const goToConnexion = () => {
    navigation.navigate('Connexion');
    toggleHome();
  };

  const goToInscription = () => {
    navigation.navigate('Register');
    toggleHome();
  };

  return (
    <View style={styles.sidebarContainer}>
      <Animated.View
        style={[
          styles.sidebarComponents,
          { transform: [{ translateX: sidebarTranslateX }] },
        ]}
      >
        <TouchableOpacity
          onPress={goToDashboard}
          style={[styles.sidebarComponent, isPressed && styles.sidebarComponentPressed]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={[styles.sidebarComponentText, isPressed && styles.sidebarComponentTextPressed]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToConnexion}
          style={[styles.sidebarComponent, isPressed && styles.sidebarComponentPressed]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={[styles.sidebarComponentText, isPressed && styles.sidebarComponentTextPressed]}>Connexion</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={goToInscription}
          style={[styles.sidebarComponent, isPressed && styles.sidebarComponentPressed]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
        >
          <Text style={[styles.sidebarComponentText, isPressed && styles.sidebarComponentTextPressed]}>Register</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  sidebarContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: 100,
    backgroundColor: '#f0f0f0',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'hidden',
  },
  sidebarComponents: {
    marginTop: 20,
    width: '150%',
  },
  sidebarComponent: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  sidebarComponentText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  sidebarComponentPressed: {
    backgroundColor: '#eaf6ff',
  },
  sidebarComponentTextPressed: {
    color: '#007bff',
  },
});

export default Home;
