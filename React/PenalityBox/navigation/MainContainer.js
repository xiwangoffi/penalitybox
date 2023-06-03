import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import HomeScreen from './screens/Home';
import ContactScreen from './screens/Contact';
import AppliScreen from './screens/Appli';
import VersionsScreen from './screens/Versions';
import AdminScreen from './screens/Admin';
import CreditsScreen from './screens/Credits';
import LoginModal from '../components/Login';

// Screen names
const homeName = 'Accueil';
const contactName = 'Contact';
const appliName = 'App';
const versionsName = 'Versions';
const adminName = 'Admin';
const creditsScreen = 'Crédits';
const loginModal = 'Connexion';

const Drawer = createDrawerNavigator();

export default function MainContainer() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name={homeName} component={HomeScreen} />
        <Drawer.Screen name={contactName} component={ContactScreen} />
        <Drawer.Screen name={versionsName} component={VersionsScreen} />
        <Drawer.Screen name={creditsScreen} component={CreditsScreen} />
        {isConnected && (
          <>
            <Drawer.Screen name={appliName} component={AppliScreen} />
            <Drawer.Screen name={adminName} component={AdminScreen} />
          </>
        )}
        <Drawer.Screen name={loginModal}>
          {(props) => (
            <LoginModal {...props} setIsConnected={setIsConnected} />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
