import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
import UserAccount from './screens/UserAccount';

// Screen names
const homeName = 'Accueil';
const contactName = 'Contact';
const appliName = 'App';
const versionsName = 'Versions';
const adminName = 'Admin';
const creditsScreen = 'Crédits';
const loginModal = 'Connexion';
const userAccount = 'Mon compte';

const Drawer = createDrawerNavigator();

export default function MainContainer() {
  const [isConnected, setIsConnected] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');

  const handleEmailChange = (newEmail) => {
    setEmail(newEmail);
  };

  useEffect(() => {
    checkAdminStatus();
  }, []);

  const checkAdminStatus = async (email) => {
    try {
      const response = await axios.get(`http://localhost:4444/account/admin/${email}`);
      setIsAdmin(response.data.isAdmin);
    } catch (error) {
      console.error('Error checking admin status:', error);
    }
  };
  

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name={homeName} component={HomeScreen} />
        <Drawer.Screen name={contactName} component={ContactScreen} />
        <Drawer.Screen name={versionsName} component={VersionsScreen} />
        <Drawer.Screen name={creditsScreen} component={CreditsScreen} />
        {!isConnected && (
          <>
            <Drawer.Screen name={appliName} component={AppliScreen} />
            {!isAdmin && <Drawer.Screen name={adminName} component={AdminScreen} />}
          </>
        )}
        {isConnected ? (
          <Drawer.Screen name={userAccount}>
            {(props) => (
              <UserAccount {...props} setIsConnected={setIsConnected} userEmail={email} />
            )}
          </Drawer.Screen>

        ) : (
          <Drawer.Screen name={loginModal}>
            {(props) => (
              <LoginModal
                {...props}
                setIsConnected={setIsConnected}
                checkAdminStatus={checkAdminStatus}
                handleEmailChange={handleEmailChange}
              />
            )}
          </Drawer.Screen>
        )}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
