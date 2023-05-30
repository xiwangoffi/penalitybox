import React from 'react';
import { Component } from 'react/cjs/react.production.min';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Accueil from './Accueil';
import AccueilCourse from './AccueilCourse';
import AccueilMatch from './AccueilMatch';
import LancementDepartNormal from './LancementDepartNormal';
import LancementDepartCadence from './LancementDepartCadence';
import LancementPenalite from './LancementPenalite';
import ConfigurationDepartNormal from './ConfigurationDepartNormal';
import ConfigurationDepartCadence from './ConfigurationDepartCadence';
import ConfigurationPenalite from './ConfigurationPenalite';

const Stack = createNativeStackNavigator();

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavigationContainer>
                {/* Définition du style du header */}
                <Stack.Navigator initialRouteName="Accueil" screenOptions={{ headerStyle: { backgroundColor: '#ffff00' }, headerTitleAlign: 'center' }} >
                    {/* Déclaration des différentes pages */}
                    <Stack.Screen name="Accueil" component={Accueil} />
                    <Stack.Screen name="AccueilCourse" component={AccueilCourse} />
                    <Stack.Screen name="AccueilMatch" component={AccueilMatch} />
                    <Stack.Screen name="LancementDepartNormal" component={LancementDepartNormal} />
                    <Stack.Screen name="LancementDepartCadence" component={LancementDepartCadence} />
                    <Stack.Screen name="LancementPenalite" component={LancementPenalite} />
                    <Stack.Screen name="ConfigurationDepartNormal" component={ConfigurationDepartNormal} />
                    <Stack.Screen name="ConfigurationDepartCadence" component={ConfigurationDepartCadence} />
                    <Stack.Screen name="ConfigurationPenalite" component={ConfigurationPenalite} />
                </Stack.Navigator>
            </NavigationContainer>
        )
    }
}

export default App;