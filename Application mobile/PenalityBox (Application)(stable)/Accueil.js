import React from 'react';
import {
    Pressable,
    View,
    StyleSheet,
    Text
} from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import SplashScreen from 'react-native-splash-screen';
import MMKVStorage from 'react-native-mmkv-storage';

// Initialisation du composant qui gère le stockage
const MMKV = new MMKVStorage.Loader().initialize();
// Récupération de l'url pour effectué des requêttes HTTPS
const urlBase = require("./url.json").url;

class Accueil extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feuxAllume: false,
            titreAllumerFeux: 'Allumer les feux'
        };
    }

    componentDidMount() {
        // Récupération des données stocké sur le téléphone
        // si aucune données n'est trouvé, création et stockage des données.

        let departNormal = MMKV.getArray('DépartNormal');

        if (departNormal === null) {
            MMKV.setArray('DépartNormal', [
                {
                    dureeAvantDepart: 0,
                    dureeFeuxRouge: 0,
                    dureeFeuxVert: 0
                }
            ]);
        }

        let departCadence = MMKV.getArray('DépartCadence');

        if (departCadence === null) {
            MMKV.setArray('DépartCadence', [
                {
                    dureeEntreDepart: 0
                }
            ]);
        }

        let penalitesCourse = MMKV.getArray('PénalitésCourse');

        if (penalitesCourse === null) {
            MMKV.setArray('PénalitésCourse', [
                {
                    id: 1,
                    dureePenalite: 0,
                    dureeFeuxRouge: 0,
                    dureeImminanceFeuxVert: 0,
                    dureeFeuxVert: 0
                }
            ]);
        }

        let penalitesMatch = MMKV.getArray('PénalitésMatch');

        if (penalitesMatch === null) {
            MMKV.setArray('PénalitésMatch', [
                {
                    id: 1,
                    nom: '',
                    dureePenalite: 0,
                    dureeFeuxRouge: 0,
                    dureeImminanceFeuxVert: 0,
                    dureeFeuxVert: 0
                },
                {
                    id: 2,
                    nom: '',
                    dureePenalite: 0,
                    dureeFeuxRouge: 0,
                    dureeImminanceFeuxVert: 0,
                    dureeFeuxVert: 0
                },
                {
                    id: 3,
                    nom: '',
                    dureePenalite: 0,
                    dureeFeuxRouge: 0,
                    dureeImminanceFeuxVert: 0,
                    dureeFeuxVert: 0
                },
                {
                    id: 4,
                    nom: '',
                    dureePenalite: 0,
                    dureeFeuxRouge: 0,
                    dureeImminanceFeuxVert: 0,
                    dureeFeuxVert: 0
                },
                {
                    id: 5,
                    nom: '',
                    dureePenalite: 0,
                    dureeFeuxRouge: 0,
                    dureeImminanceFeuxVert: 0,
                    dureeFeuxVert: 0
                },
                {
                    id: 6,
                    nom: '',
                    dureePenalite: 0,
                    dureeFeuxRouge: 0,
                    dureeImminanceFeuxVert: 0,
                    dureeFeuxVert: 0
                },
                {
                    id: 7,
                    nom: '',
                    dureePenalite: 0,
                    dureeFeuxRouge: 0,
                    dureeImminanceFeuxVert: 0,
                    dureeFeuxVert: 0
                },
            ]);
        }

        setTimeout(() => {
            // Cacher l'écran d'accueil avec le logo
            SplashScreen.hide();
        }, 2500);
    }

    allumerFeux() {
        if (!this.state.feuxAllume) {
            fetch(urlBase + '/allumer/feux/tous').then(donnees => {
                this.setState(s => s.feuxAllume = true);
                this.setState(s => s.titreAllumerFeux = 'Éteindre les feux');
            });
        } else {
            fetch(urlBase + '/extinction/feux').then(donnees => {
                this.setState(s => s.feuxAllume = false);
                this.setState(s => s.titreAllumerFeux = 'Allumer les feux');
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={{ marginTop: 50, fontSize: 20, color: "#000000" }} >Mode d'utilisation :</Text>
                <Pressable style={styles.bouton} onPress={() => {
                    // Extinction des feux si il sont lancé
                    if (this.state.feuxAllume) {
                        this.allumerFeux();
                    }

                    this.props.navigation.navigate('AccueilCourse');
                }}>
                    <Text style={{ fontSize: 16, color: "#000000" }}>Course</Text>
                </Pressable>
                <Pressable style={styles.bouton} onPress={() => {
                    // Extinction des feux si il sont lancé
                    if (this.state.feuxAllume) {
                        this.allumerFeux();
                    }

                    this.props.navigation.navigate('AccueilMatch')
                }}>
                    <Text style={{ fontSize: 16, color: "#000000" }}>Match</Text>
                </Pressable>

                <Text style={{ marginTop: 50, fontSize: 20, color: "#000000" }} >Divers :</Text>
                <Pressable style={[styles.bouton, styles.boutonFeux]} onPress={() => this.allumerFeux()}>
                    <Text style={{ fontSize: 16, color: "#000000" }}>{this.state.titreAllumerFeux}</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#efefef',
        alignItems: 'center'
    },
    bouton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d7d7d7',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 5,
        marginTop: 40,
        width: 125,
        height: 43
    },
    boutonFeux: {
        width: 175
    }
});

export default Accueil;