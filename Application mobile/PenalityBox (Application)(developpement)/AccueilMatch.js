import React from 'react';
import {
    Pressable,
    View,
    ScrollView,
    StyleSheet,
    Text,
    Modal,
    TextInput
} from 'react-native';
import { Component } from 'react/cjs/react.production.min';
import MMKVStorage from 'react-native-mmkv-storage';
import CheckBox from '@react-native-community/checkbox';

// Initialisation du composant qui gère le stockage
const MMKV = new MMKVStorage.Loader().initialize();
// Récupération de l'url pour effectué des requêttes HTTPS
const urlBase = require("./url.json").url;

class AccueilMatch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            penalites: [], // Tableau contenant toutes les pénalités récupérer à partir du stockage local (téléphone)
            disposition: [], // Tableau qui définit comment les pénalité vont s'afficher sur la page
            modalCreerVisible: false,
            modalSupprimerVisible: false,
            modalConfirmationVisible: false,
            modalRenommerVisible: false,
            modalSaisi: '',
            supprimerValue: [], // Tableau des pénalités existantes à afficher lorsqu'on veut en supprimer
            renommerValue: [], // Tableau des pénalités existantes à afficher lorsqu'on veut en renommer
            erreur: false,
            messageErreur: ''
        };

        // Définition du nom de la page pour le header
        this.props.navigation.setOptions({ title: 'Accueil match' });
    }

    componentDidMount() {
        let penalites = MMKV.getArray('PénalitésMatch');

        this.setState(s => s.penalites = penalites);
        // Définition du contenu du tableau qui détermine comment les pénalité vont s'afficher sur la page
        setTimeout(() => {
            this.setState(s => s.disposition = [
                [this.state.penalites[0], this.state.penalites[1]],
                [this.state.penalites[2], this.state.penalites[3]],
                [this.state.penalites[4], this.state.penalites[5]],
                [this.state.penalites[6]]
            ]);
        }, 10);
    }

    validerCreerPenalite() {
        let creer = false;
        let idPenalite = 0;
        let nomPenalite = '';
        this.state.penalites.forEach(penalite => {
            if (penalite.nom === '' && !creer && this.state.modalSaisi.length > 0) {
                idPenalite = penalite.id;
                nomPenalite = this.state.modalSaisi;
                this.setState(s => s.penalites[penalite.id - 1].nom = this.state.modalSaisi);
                this.setState(s => s.modalSaisi = '');
                creer = true;
            } else if (this.state.modalSaisi.length <= 0) {
                this.setState(s => s.messageErreur = 'Veuillez saisir au moins une lettre !');
                this.setState(s => s.erreur = true);
            } else if (penalite.id === 7 && penalite.nom !== '') {
                this.setState(s => s.messageErreur = 'Vous avez atteint le nombre maximum de pénalités !');
                this.setState(s => s.erreur = true);
            }
        });

        setTimeout(() => {
            if (!this.state.erreur) {
                // Stockage de la nouvelle pénalité
                MMKV.setArray('PénalitésMatch', this.state.penalites);
                this.setState(s => s.modalCreerVisible = false);
                // Redirection vers la page de configuration pour la pénalité crée
                this.configurationPenalite(idPenalite, nomPenalite);
            }
        }, 10);
    }

    supprimerPenalite() {
        let supprimerValue = [];

        // Récupération des pénalités créées
        this.state.penalites.forEach(penalite => {
            if (penalite.nom !== '') {
                supprimerValue.push(JSON.parse(JSON.stringify(penalite)));
            }
        });

        supprimerValue.forEach(penalite => {
            penalite.aSupprimer = false;
        });

        this.setState(s => s.supprimerValue = supprimerValue);

        setTimeout(() => {
            this.setState(s => s.modalSupprimerVisible = true);
        }, 10);
    }

    validerSupprimerPenalite() {
        this.state.penalites.forEach(penalite => {
            this.state.supprimerValue.forEach(penaliteASupprimer => {
                if ((penalite.id === penaliteASupprimer.id) && penaliteASupprimer.aSupprimer) {
                    // Suppression du nom des pénalités à supprimé pour qu'elle ne s'affiche plus dans le menu
                    this.setState(s => s.penalites[penalite.id - 1].nom = '');
                }
            });
        });

        setTimeout(() => {
            MMKV.setArray('PénalitésMatch', this.state.penalites);
            this.setState(s => s.modalConfirmationVisible = false);
            this.setState(s => s.modalSupprimerVisible = false);
        }, 10);
    }

    renommerPenalite() {
        let renommerValue = [];

        // Récupération des pénalités créées
        this.state.penalites.forEach(penalite => {
            if (penalite.nom !== '') {
                renommerValue.push(JSON.parse(JSON.stringify(penalite)));
            }
        });

        this.setState(s => s.renommerValue = renommerValue);

        setTimeout(() => {
            this.setState(s => s.modalRenommerVisible = true);
        }, 10);
    }

    validerRenommerPenalite() {
        this.state.penalites.forEach(penalite => {
            this.state.renommerValue.forEach(penaliteARenommer => {
                if (penalite.id === penaliteARenommer.id && penalite.nom !== penaliteARenommer.nom && penaliteARenommer.nom.length > 0) {
                    this.setState(s => s.penalites[penalite.id - 1].nom = penaliteARenommer.nom);
                } else if (penaliteARenommer.nom.length <= 0) {
                    this.setState(s => s.messageErreur = 'Veuillez saisir au moins une lettre par nom !');
                    this.setState(s => s.erreur = true);
                }
            });
        });

        setTimeout(() => {
            if (!this.state.erreur) {
                MMKV.setArray('PénalitésMatch', this.state.penalites);
                this.setState(s => s.modalRenommerVisible = false);
            }
        }, 10);
    }

    lancementPenalite(id, nom) {
        let penaliteMatch = MMKV.getArray('PénalitésMatch');
        this.setState(s => s.penalites = penaliteMatch);

        setTimeout(() => {
            // Récupération de la pénalité à lancer
            this.state.penalites.forEach(penalite => {
                if (penalite.id === id) {
                    penaliteMatch = penalite;
                }
            });

            if (penaliteMatch.dureeFeuxRouge !== 0) {
                fetch(urlBase + '/allumer/feux/rouge').then(donnees => {
                    /**
                     * headerTitle : le nom de la page à afficher dans le header
                     * texte : le texte à afficher au dessus du compte à rebours
                     * page : le numéro de la page sur laquelle on va aller
                     * temps : le temps qui sera afficher et utilisé pour le compte à rebours
                     * mode : course ou match, définit sur quel menu on revient à la fin de la pénalité
                     * 
                     * tempsImminanceFeuxVert : le temps restant avant l'affichage du feux vert
                     * tempsFeuxVert : le temps des feux vert
                     */
                    this.props.navigation.navigate('LancementPenalite', { headerTitle: nom, texte: 'Durée du feux rouge :', page: 1, temps: penaliteMatch.dureeFeuxRouge / 1000, tempsImminanceFeuxVert: penaliteMatch.dureeImminanceFeuxVert / 1000, tempsFeuxVert: penaliteMatch.dureeFeuxVert / 1000, mode: 'match' });
                });
            } else {
                this.setState(s => s.messageErreur = 'Veuillez d\'abord configurer cette fonctionnalité !');
                this.setState(s => s.erreur = true);
            }
        }, 10);
    }

    configurationPenalite(id, nom) {
        /**
         * id : l'identifiant de la pénalité que l'on veut configurer, utiliser pour enregistrer les nouvelles données
         * nom : le nom de la pénalité que l'on veut configurer, utiliser lors de l'enregistrement des nouvelles données
         */
        this.props.navigation.navigate('ConfigurationPenalite', { headerTitle: 'Configuration de : ' + nom, texte: 'Entrer la durée de la pénalité :', page: 1, temps: { dureePenalite: '', dureeFeuxRouge: '', dureeImminanceFeuxVert: '', dureeFeuxVert: '' }, mode: 'match', id: id, nom: nom });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalCreerVisible}
                >
                    <View style={styles.modalView}>
                        <View style={[styles.modalFond, { width: 221, height: 150 }]}>
                            <Text style={[styles.modalTitre, { height: 41, paddingTop: 7 }]}>Créer une pénalité</Text>
                            <View style={[styles.modalCorps, { height: 72 }]}>
                                <View style={[styles.modalCorpsRow, { height: '100%' }]}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Nom :</Text>
                                    <TextInput
                                        style={styles.modalSaisi}
                                        onChangeText={(event) => this.setState(s => s.modalSaisi = event)}
                                        value={this.state.modalSaisi}
                                        placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                        placeholder={"Nom de la pénalité"}
                                        keyboardType="default"
                                    />
                                </View>
                            </View>
                            <View style={styles.modalBoutonRow}>
                                <Pressable style={[styles.modalBoutonNon, { width: 109 }]} onPress={() => this.setState(s => s.modalCreerVisible = false)}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Annuler</Text>
                                </Pressable>
                                <Pressable style={[styles.modalBoutonOui, { width: 110 }]} onPress={() => this.validerCreerPenalite()}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Valider</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalSupprimerVisible}
                >
                    <View style={styles.modalView}>
                        <View style={[styles.modalFond, { width: 221, height: 375 }]}>
                            <Text style={[styles.modalTitre, { height: 41, paddingTop: 7 }]}>Supprimer une pénalité</Text>
                            <View style={[styles.modalCorps, { height: 297 }]}>
                                {
                                    this.state.supprimerValue.map(penalite => (
                                        <View style={[styles.modalCorpsRow, { borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.3)', height: 41, justifyContent: 'flex-start' }]} key={penalite.id}>
                                            <CheckBox
                                                value={penalite.aSupprimer}
                                                onValueChange={(newValue) => {
                                                    let indice = this.state.supprimerValue.indexOf(penalite);
                                                    this.setState(s => s.supprimerValue[indice].aSupprimer = newValue);
                                                }}
                                                tintColors={{ true: '#888888', false: '#888888' }}
                                                style={{ marginLeft: 15 }}
                                            />
                                            <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5 }}>{penalite.nom}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={styles.modalBoutonRow}>
                                <Pressable style={[styles.modalBoutonNon, { width: 109 }]} onPress={() => this.setState(s => s.modalSupprimerVisible = false)}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Annuler</Text>
                                </Pressable>
                                <Pressable style={[styles.modalBoutonOui, { width: 110 }]} onPress={() => this.setState(s => s.modalConfirmationVisible = true)}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Valider</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalConfirmationVisible}
                >
                    <View style={styles.modalView}>
                        <View style={[styles.modalFond, { width: 181, height: 120 }]}>
                            <Text style={[styles.modalTitre, { height: 83, paddingTop: 15 }]}>Confirmer la suppression ?</Text>
                            <View style={styles.modalBoutonRow}>
                                <Pressable style={[styles.modalBoutonNon, { width: 89 }]} onPress={() => this.setState(s => s.modalConfirmationVisible = false)}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Non</Text>
                                </Pressable>
                                <Pressable style={[styles.modalBoutonOui, { width: 90 }]} onPress={() => this.validerSupprimerPenalite()}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Oui</Text>
                                </Pressable>
                            </View>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.state.modalRenommerVisible}
                >
                    <View style={styles.modalView}>
                        <View style={[styles.modalFond, { width: 271, height: 375 }]}>
                            <Text style={[styles.modalTitre, { height: 41, paddingTop: 7 }]}>Renommer une pénalité</Text>
                            <View style={[styles.modalCorps, { height: 297 }]}>
                                {
                                    this.state.renommerValue.map(penalite => (
                                        <View style={[styles.modalCorpsRow, { borderBottomWidth: 1, borderBottomColor: 'rgba(0, 0, 0, 0.3)', height: 41, justifyContent: 'center' }]} key={penalite.id}>
                                            <Text style={{ fontSize: 16, color: "#000000", marginLeft: 5 }}>Pénalité {penalite.id} :</Text>
                                            <TextInput
                                                style={styles.modalSaisi}
                                                onChangeText={(event) => {
                                                    let indice = this.state.renommerValue.indexOf(penalite);
                                                    this.setState(s => s.renommerValue[indice].nom = event);
                                                }}
                                                value={penalite.nom}
                                                placeholderTextColor="rgba(0, 0, 0, 0.3)"
                                                placeholder={"Nom de la pénalité"}
                                                keyboardType="default"
                                            />
                                        </View>
                                    ))
                                }
                            </View>
                            <View style={styles.modalBoutonRow}>
                                <Pressable style={[styles.modalBoutonNon, { width: 134 }]} onPress={() => this.setState(s => s.modalRenommerVisible = false)}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Annuler</Text>
                                </Pressable>
                                <Pressable style={[styles.modalBoutonOui, { width: 135 }]} onPress={() => this.validerRenommerPenalite()}>
                                    <Text style={{ fontSize: 16, color: "#000000" }}>Valider</Text>
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
                        <View style={[styles.modalFond, { width: 181, height: 120 }]}>
                            <Text style={[styles.modalTitre, { height: 83, paddingTop: 15 }]}>{this.state.messageErreur}</Text>
                            <Pressable style={styles.modalBoutonOk} onPress={() => this.setState(s => s.erreur = false)}>
                                <Text style={{ fontSize: 16, color: "#000000" }}>OK</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
                <View style={styles.composantConfiguration}>
                    <View style={styles.boutonRow}>
                        <Pressable style={styles.bouton} onPress={() => this.setState(s => s.modalCreerVisible = true)}>
                            <Text style={{ fontSize: 16, color: "#000000" }}>Créer pénalité</Text>
                        </Pressable>
                        <Pressable style={[styles.bouton, { width: 175 }]} onPress={() => this.supprimerPenalite()}>
                            <Text style={{ fontSize: 16, color: "#000000" }}>Supprimer pénalité</Text>
                        </Pressable>
                    </View>
                    <View style={styles.boutonRow}>
                        <Pressable style={[styles.bouton, { width: 175 }]} onPress={() => this.renommerPenalite()}>
                            <Text style={{ fontSize: 16, color: "#000000" }}>Renommer pénalité</Text>
                        </Pressable>
                    </View>
                </View>
                <View style={styles.composant}>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 20, color: "#000000" }}>Lancement :</Text>
                    <View style={styles.boutonsView}>
                        {
                            this.state.disposition.map(ligne => (
                                <View key={ligne[0].id} style={[styles.boutonRow, { display: (ligne[0].nom === '' && ligne[0].id !== 7 && ligne[1].nom === '') || (ligne[0].nom === '' && ligne[0].id === 7) ? 'none' : 'flex' }]}>
                                    {
                                        ligne.map(penalite => (
                                            <Pressable key={penalite.id} style={[styles.bouton, { display: penalite.nom === '' ? 'none' : 'flex' }]} onPress={() => this.lancementPenalite(penalite.id, penalite.nom)}>
                                                <Text key={penalite.nom} style={{ fontSize: 16, color: "#000000" }}>{penalite.nom}</Text>
                                            </Pressable>
                                        ))
                                    }
                                </View>
                            ))
                        }
                    </View>
                </View>
                <View style={styles.composant}>
                    <Text style={{ marginTop: 25, marginLeft: 15, fontSize: 20, color: "#000000" }}>Configuration :</Text>
                    <View style={styles.boutonsView}>
                        {
                            this.state.disposition.map(ligne => (
                                <View key={ligne[0].id} style={[styles.boutonRow, { display: (ligne[0].nom === '' && ligne[0].id !== 7 && ligne[1].nom === '') || (ligne[0].nom === '' && ligne[0].id === 7) ? 'none' : 'flex' }]}>
                                    {
                                        ligne.map(penalite => (
                                            <Pressable key={penalite.id} style={[styles.bouton, { display: penalite.nom === '' ? 'none' : 'flex' }]} onPress={() => this.configurationPenalite(penalite.id, penalite.nom)}>
                                                <Text key={penalite.nom} style={{ fontSize: 16, color: "#000000" }}>{penalite.nom}</Text>
                                            </Pressable>
                                        ))
                                    }
                                </View>
                            ))
                        }
                    </View>
                </View>
            </ScrollView>
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
    modalCorps: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.7)'
    },
    modalCorpsRow: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width: "100%"
    },
    modalSaisi: {
        width: 150,
        height: 30,
        padding: 0,
        paddingLeft: 5,
        backgroundColor: '#efefef',
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(0, 0, 0, 0.3)',
        marginLeft: 7
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
    modalBoutonNon: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 10,
        borderRightWidth: 1,
        borderRightColor: 'rgba(0, 0, 0, 0.7)',
        height: '100%'
    },
    modalBoutonOui: {
        justifyContent: "center",
        alignItems: "center",
        borderBottomRightRadius: 10,
        height: '100%'
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
    composantConfiguration: {
        alignItems: 'center',
        justifyContent: 'space-around',
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

export default AccueilMatch;