import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return(
        <NavigationContainer>
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
                })}>

                <Tab.Screen name={homeName} component={HomeScreen}/>
                <Tab.Screen name={contactName} component={ContactScreen}/>
                <Tab.Screen name={appliName} component={AppliScrenn}/>
                <Tab.Screen name={versionsName} component={VersionsScreen}/>
                <Tab.Screen name={adminName} component={AdminScreen}/>

            </Tab.Navigator>
        </NavigationContainer>
    );
}