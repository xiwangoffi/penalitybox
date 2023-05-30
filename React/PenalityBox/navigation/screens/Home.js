import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function HomeScreen({navigation}) {
    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({window, screen}) => {
                setDimensions({window, screen});
            },
        );
        return () => subscription?.remove();
    });

    if(dimensions.window.height >= dimensions.screen.width) {
        return(
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text onPress={() => Alert.alert('Home Screen')}
                style={{ fontSize: 26, fontWeight: "bold" }}>Home Screen</Text>
            </View>
        )
    } else {
        return(
            <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
                <View style={[styles.presentationContainer, styles.boxShadow]}>
                    <View style={styles.contentContainer}>
                        <Text style={[styles.contentTitleText, styles.white]}>La PenalityBox</Text>
                        <Text style={[styles.contentText, styles.white]}>
                        La Penality Box est un produit fini permettant de gérer les départs et les interruptions de courses ainsi que des temps de pénalité infligés par l'arbitrage. 
                        Tous les temps, attentes, feux intermédiaires sont programmables. 
                        Le boîtier est compact et les feux sont dit transflectifs. 
                        Le boîtier est également télécommandable.
                        </Text>
                        <View style={styles.gifContainer}>
                            <Image source={require('../../assets/gif/penalityBox.gif')} resizeMode='contain' style={styles.ownerNamesImage} alt='PenalityBox gif demo'/>
                        </View>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image source={require('../../assets/img/logoPenalityBoxDark.png')} style={styles.penalityLogo} resizeMode='contain' alt='PenalityBox Logo'/>
                    </View>
                </View>
                <Footer navigation={navigation} />
            </View>
        )
    }

}
