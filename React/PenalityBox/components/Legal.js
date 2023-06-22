import * as React from 'react';
import ReactMarkdownDisplay from 'react-native-markdown-display';
import { View, Text, TouchableOpacity } from 'react-native';
import Footer from './footer';
import styles from '../styles/styles';

export default function LegalInfo({ setShowLegalInfos }) {


    return (
        <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
            <TouchableOpacity onPress={() => setShowLegalInfos(false)}>
                <Text style={[styles.title, styles.white, styles.bold, styles.underline, {paddingBottom: '50%'}]}>Retour</Text>
            </TouchableOpacity>
            <View style={[styles.legalInfoContainer, styles.boxBackground, styles.boxShadow]}>
                <View style={[styles.spaceBetweenText, styles.titleEdgeGap]}>
                    <Text style={[styles.title, styles.bold, styles.uppercase, styles.white]}>Informations legales</Text>
                </View>
                <View style={[styles.spaceBetweenText, styles.contentEdgeGap]}>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16 } }}>- Dénomination sociale: Libreboot</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- Enseigne: LibrenBerry</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- Adresse du siège social: 7 place des 4 piliers, 18000 Bourges</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- Numéro de téléphone: 02.48.02.56.12</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- Adresse de courrier électronique: info-lb@librenberry.net</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- Forme juridique de la société: 5499 Société à responsabilité limitée</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- Montant du capital social: 20 000 €</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- Nom du directeur ou du codirecteur de la publication: Jean-Marc Bardi</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- RCS Bourges : 483445334</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- TVA intracommunautaire : FR65483445334</ReactMarkdownDisplay>
                </View>
                <View style={[styles.spaceBetweenText, styles.titleEdgeGap]}>
                    <Text style={[styles.title, styles.bold, styles.uppercase, styles.white]}>Mentions relatives à l'utilisation de cookies-Mentions relatives à l'utilisation de données personnelles</Text>
                </View>
                <View style={[styles.spaceBetweenText, styles.contentEdgeGap]}>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16 } }}>- Il n'est pas fait usage de cookies sur ce site</ReactMarkdownDisplay>
                    <ReactMarkdownDisplay style={{ body: { fontSize: 16, paddingTop: '0.5%' } }}>- Aucune récolte d'information sur les clients n'est effectuée via ce site</ReactMarkdownDisplay>
                </View>
            </View>
            <Footer setShowLegalInfos={setShowLegalInfos} />
        </View>
    );
}