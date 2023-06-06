import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import DashboardPage from './components/DashboardPage';
import ConnexionPage from './components/ConnexionPage';
import Register from './components/Register';
import WelcomePage from './components/Welcome';
import Connected from './components/Connected';
import Recherche from './components/Recherche';
import Combinaisons from './components/Combinaisons';
import Profile from './components/Profile';

const Stack = createStackNavigator();

const App = () => {
  const [showHome, setShowHome] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleWelcomeClick = () => {
    setShowHome(true);
  };

  return (
    <NavigationContainer>
      <View style={{ flex: 1 }}>
        <Header />
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {showHome && (
            <View style={{ flex: 1 }}>
              <Home />
            </View>
          )}
          <View style={{ flex: showHome ? 3 : 4 }}>
            <Stack.Navigator initialRouteName="Welcome">
              <Stack.Screen
                name="Welcome"
                component={WelcomePage}
                options={{ headerShown: false, gestureEnabled: false }}
              />
              <Stack.Screen name="Dashboard" component={DashboardPage} />
              <Stack.Screen name="Connected" component={Connected} />
              <Stack.Screen name="Recherche" component={Recherche} />
              <Stack.Screen name="Combinaisons" component={Combinaisons} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Connexion">
                {props => <ConnexionPage {...props} setCurrentUser={setCurrentUser} />}
              </Stack.Screen>
              <Stack.Screen name="Register" component={Register} />
              <Stack.Screen
                name="Profile"
                component={Profile}
                initialParams={{ currentUser: currentUser }}
              />
            </Stack.Navigator>
          </View>
        </View>
        <Footer onWelcomeClick={handleWelcomeClick} />
      </View>
    </NavigationContainer>
  );
};

export default App;
