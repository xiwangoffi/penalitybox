import React from 'react';
import {
    Pressable,
    View,
    StyleSheet,
    Modal,
    Text
} from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import MMKVStorage from 'react-native-mmkv-storage';

// Initialisation du composant qui gère le stockage
const MMKV = new MMKVStorage.Loader().initialize();
// Récupération de l'url pour effectué des requêttes HTTPS
const urlBase = require("./url.json").url;

class AccueilCourse extends Component {
    constructor(props) {
        super(props);

        this.state = {
            stop: false,
            titreStop: 'STOP',
            erreur: false,
            messageErreur: ''
        };

        // Définition du nom de la page pour le header
        this.props.navigation.setOptions({ title: 'Accueil course' });
    }

    lancementDepartNormal() {
        // Extinction du stop si il est lancé
        if (this.state.stop) {
            this.stop();
        }

        // Récupération des données correspondantes à la fonctionnalité qu'on veut lancer
        let departNormal = MMKV.getArray('DépartNormal')[0];

        // Si un temps est enregistrer (différent de 0), naviguer vers la page de la fonctionnalité
        // Sinon affiché un message d'erreur
        if (departNormal.dureeFeuxRouge !== 0) {
            /**
             * headerTitle : le nom de la page à afficher dans le header
             * texte : le texte à afficher au dessus du compte à rebours
             * page : le numéro de la page sur laquelle on va aller
             * temps : le temps qui sera afficher et utilisé pour le compte à rebours
             * 
             * tempsFeuxRouges : le temps des feux rouges
             * tempsFeuxVert : le temps des feux vert
             */
            this.props.navigation.navigate('LancementDepartNormal', { headerTitle: 'Départ normal', texte: 'Durée avant le départ :', page: 1, temps: departNormal.dureeAvantDepart / 1000, tempsFeuxRouges: departNormal.dureeFeuxRouge / 1000, tempsFeuxVert: departNormal.dureeFeuxVert / 1000 });
        } else {
            this.setState(s => s.messageErreur = 'Veuillez d\'abord configurer cette fonctionnalité !');
            this.setState(s => s.erreur = true);
        }
    }

    lancementDepartCadence() {
        if (this.state.stop) {
            this.stop();
        }

        let departCadence = MMKV.getArray('DépartNormal')[0];
        departCadence.dureeEntreDepart = MMKV.getArray('DépartCadence')[0].dureeEntreDepart;

        if (departCadence.dureeFeuxRouge !== 0) {
            /**
             * tempsProchainDepart : le temps avant le prochain départ
             */
            this.props.navigation.navigate('LancementDepartCadence', { headerTitle: 'Départ cadencé', texte: 'Durée avant le départ :', page: 1, temps: departCadence.dureeAvantDepart / 1000, tempsFeuxRouges: departCadence.dureeFeuxRouge / 1000, tempsFeuxVert: departCadence.dureeFeuxVert / 1000, tempsProchainDepart: departCadence.dureeEntreDepart / 1000 });
        } else {
            this.setState(s => s.messageErreur = 'Veuillez d\'abord configurer cette fonctionnalité !');
            this.setState(s => s.erreur = true);
        }
    }

    lancementPenalite() {
        if (this.state.stop) {
            this.stop();
        }

        let penalitesCourse = MMKV.getArray('PénalitésCourse')[0];

        if (penalitesCourse.dureeFeuxRouge !== 0) {
            fetch(urlBase + '/allumer/feux/rouge').then(donnees => {
                /**
                 * mode : course ou match, définit sur quel menu on revient à la fin de la pénalité
                 * 
                 * tempsImminanceFeuxVert : le temps restant avant l'affichage du feux vert
                 */
                this.props.navigation.navigate('LancementPenalite', { headerTitle: 'Pénalité', texte: 'Durée du feux rouge :', page: 1, temps: penalitesCourse.dureeFeuxRouge / 1000, tempsImminanceFeuxVert: penalitesCourse.dureeImminanceFeuxVert / 1000, tempsFeuxVert: penalitesCourse.dureeFeuxVert / 1000, mode: 'course' });
            });
        } else {
            this.setState(s => s.messageErreur = 'Veuillez d\'abord configurer cette fonctionnalité !');
            this.setState(s => s.erreur = true);
        }
    }

    configurationDepartNormal() {
        if (this.state.stop) {
            this.stop();
        }

        this.props.navigation.navigate('ConfigurationDepartNormal', { headerTitle: 'Configuration des feux de départ', texte: 'Entrer la durée avant le départ :', page: 1, temps: { dureeAvantDepart: '', dureeFeuxRouge: '', dureeFeuxVert: '' } });
    }

    configurationDepartCadence() {
        if (this.state.stop) {
            this.stop();
        }

        this.props.navigation.navigate('ConfigurationDepartCadence', { headerTitle: 'Configuration des feux de départ', texte: 'Entrer la durée entre les départs :' });
    }

    configurationPenalite() {
        if (this.state.stop) {
            this.stop();
        }

        /**
         * id : l'identifiant de la pénalité que l'on veut configurer, utiliser pour enregistrer les pénalités de match
         */
        this.props.navigation.navigate('ConfigurationPenalite', { headerTitle: 'Configuration de la pénalité', texte: 'Entrer la durée de la pénalité :', page: 1, temps: { dureePenalite: '', dureeFeuxRouge: '', dureeImminanceFeuxVert: '', dureeFeuxVert: '' }, mode: 'course', id: 1 });
    }

    stop() {
        if (!this.state.stop) {
            fetch(urlBase + '/allumer/feux/rouge').then(donnees => {
                this.setState(s => s.stop = true);
                this.setState(s => s.titreStop = 'Arrêt STOP');
            });
        } else {
            fetch(urlBase + '/extinction/feux').then(donnees => {
                this.setState(s => s.stop = false);
                this.setState(s => s.titreStop = 'STOP');
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.erreur}
                >
                    <View style={styles.modalView}>
                        <View style={[styles.modalFond, { width: 181, height: 120 }]}>
                            <Text style={[styles.modalTitre, { height: 83, paddingTop: 15 }]}>{this.state.messageErreur}</Text>
                            <Pressable style={styles.modalBoutonOk} onPress={() => this.setState(s => s.erreur = false)}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles.composant}>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 20, color: "#000000" }}>Lancement :</Text>
                    <View style={styles.boutonsView}>
                        <View style={styles.boutonRow}>
                            <Pressable style={styles.bouton} onPress={() => this.lancementDepartNormal()}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>Départ normal</Text>
                            </Pressable>
                            <Pressable style={styles.bouton} onPress={() => this.lancementDepartCadence()}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>Départ cadencé</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boutonRow}>
                            <Pressable style={styles.bouton} onPress={() => this.lancementPenalite()}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>Pénalité</Text>
                            </Pressable>
                            <Pressable style={styles.bouton} onPress={() => this.stop()}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>{this.state.titreStop}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
                <View style={styles.composant}>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 20, color: "#000000" }}>Configuration :</Text>
                    <View style={styles.boutonsView}>
                        <View style={styles.boutonRow}>
                            <Pressable style={styles.bouton} onPress={() => this.configurationDepartNormal()}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>Départ normal</Text>
                            </Pressable>
                            <Pressable style={styles.bouton} onPress={() => this.configurationDepartCadence()}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>Départ cadencé</Text>
                            </Pressable>
                        </View>
                        <View style={styles.boutonRow}>
                            <Pressable style={styles.bouton} onPress={() => this.configurationPenalite()}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>Pénalité</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#efefef'
    },
    modalView: {
        justifyContent: "center",
        alignItems: "center",
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    modalFond: {
        alignItems: 'center',
        backgroundColor: '#d7d7d7',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalTitre: {
        fontSize: 18,
        color: "#000000",
        textAlign: 'center',
        width: '100%',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.7)'
    },
    modalBoutonOk: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        height: 35
    },
    composant: {
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        paddingBottom: 30
    },
    boutonsView: {
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    boutonRow: {
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: 40,
        width: "100%"
    },
    bouton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d7d7d7',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        width: 150,
        height: 43
    }
});

export default AccueilCourse;