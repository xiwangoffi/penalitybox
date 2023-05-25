import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
//import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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

//const Tab = createBottomTabNavigator();
//const Tab = createMaterialTopTabNavigator();
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


        /*<NavigationContainer>
            <Tab.Navigator
                initialRouteName={homeName}
                screenOptions={({route}) => ({
                    tabBarIcon: ({focused, color, size}) => {
                        let iconName;
                        let rn = route.name;

                        if(rn === homeName) {
                            iconName = focused ? 'home' : 'home-outline'
                        } else if (rn === contactName) {
                            iconName = focused ? 'call' : 'call-outline'
                        } else if (rn === appliName) {
                            iconName = focused ? 'phone-portrait' : 'phone-portrait-outline'
                        } else if (rn === versionsName) {
                            iconName = focused ? 'filter' : 'filter-outline'
                        } else if (rn === adminName) {
                            iconName = focused ? 'settings' : 'settings-outline'
                        }

                        return <Ionicons name={iconName} size={size} color={color}/>
                    },
                    tabBarActiveTintColor: 'white',
                    tabBarInactiveTintColor: 'grey',
                    tabBarActiveBackgroundColor: 'black',
                    tabBarInactiveBackgroundColor: 'black',
                })}>

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={contactName} component={ContactScreen}/>
                <Tab.Screen name={appliName} component={AppliScrenn}/>
                <Tab.Screen name={versionsName} component={VersionsScreen}/>
                <Tab.Screen name={adminName} component={AdminScreen}/>

            </Tab.Navigator>
        </NavigationContainer>*/
    );
}