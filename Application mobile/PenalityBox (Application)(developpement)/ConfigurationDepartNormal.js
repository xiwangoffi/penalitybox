import React from 'react';
import {
    Pressable,
    View,
    StyleSheet,
    Text,
    Modal,
    TextInput
} from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { LogBox } from "react-native";
import MMKVStorage from 'react-native-mmkv-storage';

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const urlBase = require("./url.json").url;
const MMKV = new MMKVStorage.Loader().initialize();

class ConfigurationDepartNormal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            heures: '',
            minutes: '',
            secondes: '',
            erreur: false,
            messageErreur: '',
            formatTemps: /^([01]\d|2[0-3]):([0-5][0-9]):([0-5][0-9])$/, // Expression régulière pour vérifier le format du temps
            temps: {
                dureeAvantDepart: this.props.route.params.temps.dureeAvantDepart,
                dureeFeuxRouge: this.props.route.params.temps.dureeFeuxRouge,
                dureeFeuxVert: this.props.route.params.temps.dureeFeuxVert
            }
        };

        this.props.navigation.setOptions({ title: this.props.route.params.headerTitle, headerBackVisible: false });
    }

    conversionMillisecondes(temps) {
        let heures = temps[1] * 3600 * 1000;
        let minutes = temps[2] * 60 * 1000;
        let secondes = temps[3] * 1000;

        let tempsMillisecondes = heures + minutes + secondes;
        return tempsMillisecondes;
    }

    pageSuivante() {
        let tempsTotal = this.state.heures + ':' + this.state.minutes + ':' + this.state.secondes;

        if (this.state.heures === '' || this.state.minutes === '' || this.state.secondes === '') {
            this.setState(s => s.messageErreur = 'Veuillez remplir tous les champs !');
            this.setState(s => s.erreur = true);
            return;
        } else if (!this.state.formatTemps.test(tempsTotal)) {
            this.setState(s => s.messageErreur = 'Veuillez donnez une heures correcte ! (Format : 23:59:59)');
            this.setState(s => s.erreur = true);
            return;
        } else {
            if (this.props.route.params.page === 1) {
                this.setState(s => s.temps.dureeAvantDepart = tempsTotal);
                setTimeout(() => {
                    this.props.navigation.push('ConfigurationDepartNormal', { headerTitle: 'Configuration des feux de départ', texte: 'Entrer la durée des feux rouges :', page: 2, temps: this.state.temps });
                }, 10);
            } else if (this.props.route.params.page === 2) {
                this.setState(s => s.temps.dureeFeuxRouge = tempsTotal);
                setTimeout(() => {
                    this.props.navigation.push('ConfigurationDepartNormal', { headerTitle: 'Configuration des feux de départ', texte: 'Entrer la durée du feu vert :', page: 3, temps: this.state.temps });
                }, 10);
            } else {
                this.setState(s => s.temps.dureeFeuxVert = tempsTotal);
                setTimeout(() => {
                    let departNormal = {
                        dureeAvantDepart: this.conversionMillisecondes(this.state.formatTemps.exec(this.state.temps.dureeAvantDepart)),
                        dureeFeuxRouge: this.conversionMillisecondes(this.state.formatTemps.exec(this.state.temps.dureeFeuxRouge)),
                        dureeFeuxVert: this.conversionMillisecondes(this.state.formatTemps.exec(this.state.temps.dureeFeuxVert))
                    };

                    MMKV.setArray('DépartNormal', [departNormal]);
        
                    this.props.navigation.navigate('AccueilCourse');
                }, 10);
            }
        }
    }

    annuler() {
        setTimeout(() => {
            this.props.navigation.navigate('AccueilCourse');
        }, 10);
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalVisible}
                >
                    <View style={styles.modalView}>
                        <View style={styles.confirmation}>
                            <Text style={styles.messageModal}>Confirmer et  retourner au menu ?</Text>
                            <View style={styles.modalBoutonRow}>
                                <Pressable style={styles.boutonNon} onPress={() => this.setState(s => s.modalVisible = false)}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Non</Text>
                                </Pressable>
                                <Pressable style={styles.boutonOui} onPress={() => this.annuler()}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Oui</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.erreur}
                >
                    <View style={styles.modalView}>
                        <View style={styles.confirmation}>
                            <Text style={styles.messageModal}>{this.state.messageErreur}</Text>
                            <Pressable style={styles.boutonOk} onPress={() => this.setState(s => s.erreur = false)}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles.composant}>
                    <Text style={{ marginTop: 30, marginBottom: 15, marginLeft: 15, fontSize: 20, color: "#000000" }}>{this.props.route.params.texte}</Text>
                    <View style={styles.saisieTemps}>
                        <TextInput
                            style={{ fontSize: 35 }}
                            onChangeText={(event) => this.setState(s => s.heures = event)}
                            value={this.state.heures}
                            placeholderTextColor="#aaaaaa"
                            placeholder={"00"}
                            maxLength={2}
                            keyboardType="number-pad"
                        />
                        <Text style={{ fontSize: 35, color: '#000000', marginBottom: 5 }}>:</Text>
                        <TextInput
                            style={{ fontSize: 35 }}
                            onChangeText={(event) => this.setState(s => s.minutes = event)}
                            value={this.state.minutes}
                            placeholderTextColor="#aaaaaa"
                            placeholder={"00"}
                            maxLength={2}
                            keyboardType="number-pad"
                        />
                        <Text style={{ fontSize: 35, color: '#000000', marginBottom: 5 }}>:</Text>
                        <TextInput
                            style={{ fontSize: 35 }}
                            onChangeText={(event) => this.setState(s => s.secondes = event)}
                            value={this.state.secondes}
                            placeholderTextColor="#aaaaaa"
                            placeholder={"00"}
                            maxLength={2}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View style={styles.boutonRow}>
                        <Pressable style={styles.bouton} onPress={() => this.setState(s => s.modalVisible = true)}>
                            <Text style={{ fontSize: 16, color: "#000000" }}>Annuler</Text>
                        </Pressable>
                        <Pressable style={styles.bouton} onPress={() => this.pageSuivante()}>
                            <Text style={{ fontSize: 16, color: "#000000" }}>Valider</Text>
                        </Pressable>
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
    confirmation: {
        alignItems: 'center',
        backgroundColor: '#d7d7d7',
        width: 181,
        height: 120,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)'
    },
    messageModal: {
        fontSize: 18,
        color: "#000000",
        textAlign: 'center',
        width: '100%',
        height: 83,
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.7)',
        paddingTop: 15
    },
    modalBoutonRow: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: "100%",
        height: 35,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 10
    },
    boutonNon: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.7)',
        height: '100%',
        width: 89
    },
    boutonOui: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 10,
        height: '100%',
        width: 90
    },
    boutonOk: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        width: '100%',
        height: 35
    },
    composant: {
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        paddingBottom: 30
    },
    saisieTemps: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        width: "100%"
    },
    boutonRow: {
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'row',
        width: "100%",
        marginTop: 20
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

export default ConfigurationDepartNormal;