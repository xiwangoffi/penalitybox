import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Ionicons from 'react-native-vector-icons/Ionicons';

//Screens
import HomeScreen from './screens/Home';
import ContactScreen from './screens/Contact';
import AppliScrenn from './screens/Appli';
import VersionsScreen from './screens/Versions';
import AdminScreen from './screens/Admin';

//Screen names
const homeName = 'Home';
const contactName = 'Contact';
const appliName = 'App';
const versionsName = 'Versions';
const adminName = 'Admin';

const Drawer = createDrawerNavigator();

export default function MainContainer() {
    return(
        <NavigationContainer>
            <Drawer.Navigator>
                <Drawer.Screen name={homeName} component={HomeScreen}/>
                <Drawer.Screen name={contactName} component={ContactScreen}/>
                <Drawer.Screen name={appliName} component={AppliScrenn}/>
                <Drawer.Screen name={versionsName} component={VersionsScreen}/>
                <Drawer.Screen name={adminName} component={AdminScreen}/>
            </Drawer.Navigator>
        </NavigationContainer>
    );
}