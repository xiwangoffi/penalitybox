import React from 'react';
import {
    Pressable,
    View,
    StyleSheet,
    Text,
    Modal
} from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import { CountDown } from 'react-native-countdown-component';
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);
const urlBase = require("./url.json").url;
var feuxRougeDroite = null;

class LancementDepartNormal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
            running: true
        };

        this.props.navigation.setOptions({ title: this.props.route.params.headerTitle, headerBackVisible: false });
    }

    pageSuivante() {
        if (this.props.route.params.page === 1) {
            fetch(urlBase + '/allumer/feux/gaucheRouge').then(donnees => {
                // Allumer le feux rouge droite après la moitier du temps total des feux rouges
                feuxRougeDroite = setTimeout(() => {
                    fetch(urlBase + '/allumer/feux/droiteRouge');
                }, (this.props.route.params.tempsFeuxRouges * 1000) / 2);

                this.props.navigation.push('LancementDepartNormal', { headerTitle: 'Départ normal', texte: 'Durée des feux rouges :', page: 2, temps: this.props.route.params.tempsFeuxRouges, tempsFeuxVert: this.props.route.params.tempsFeuxVert });
            });
        } else if (this.props.route.params.page === 2) {
            fetch(urlBase + '/extinction/feux').then(donnees => {
                fetch(urlBase + '/allumer/feux/vert').then(donnees => {
                    this.props.navigation.push('LancementDepartNormal', { headerTitle: 'Départ normal', texte: 'Durée des feux verts :', page: 3, temps: this.props.route.params.tempsFeuxVert });
                });
            });
        } else {
            this.setState(s => s.running = false);
            setTimeout(() => {
                fetch(urlBase + '/extinction/feux').then(donnees => {
                    this.props.navigation.navigate('AccueilCourse');
                });
            }, 10);
        }
    }

    arreter() {
        this.setState(s => s.running = false);
        setTimeout(() => {
            // Arrêter le timer si il est lancé
            clearTimeout(feuxRougeDroite);
            fetch(urlBase + '/extinction/feux').then(donnees => {
                this.props.navigation.navigate('AccueilCourse');
            });
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
                            <View style={styles.boutonRow}>
                                <Pressable style={styles.boutonNon} onPress={() => this.setState(s => s.modalVisible = false)}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Non</Text>
                                </Pressable>
                                <Pressable style={styles.boutonOui} onPress={() => this.arreter()}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Oui</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={styles.composant}>
                    <Text style={{ marginTop: 30, marginBottom: 15, marginLeft: 15, fontSize: 20, color: "#000000" }}>{this.props.route.params.texte}</Text>
                    <CountDown
                        size={35}
                        until={this.props.route.params.temps}
                        onFinish={() => this.pageSuivante()}
                        digitStyle={{ backgroundColor: '#efefef', width: 50, height: 50, marginLeft: 0, marginRight: 0, paddingTop: 5 }}
                        digitTxtStyle={{ fontWeight: 'normal', color: "#000000" }}
                        separatorStyle={{ fontWeight: 'normal', color: '#000000' }}
                        timeToShow={['H', 'M', 'S']}
                        timeLabels={{ h: null, m: null, s: null }}
                        running={this.state.running}
                        showSeparator
                    />
                    <Pressable style={styles.bouton} onPress={() => this.setState(s => s.modalVisible = true)}>
                        <Text style={{ fontSize: 16, color: "#000000" }}>Arrêter</Text>
                    </Pressable>
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
    boutonRow: {
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
    composant: {
        justifyContent: 'space-around',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0, 0, 0, 0.3)',
        paddingBottom: 30
    },
    bouton: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d7d7d7',
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderRadius: 5,
        width: 150,
        height: 43,
        marginTop: 20
    }
});

export default LancementDepartNormal;