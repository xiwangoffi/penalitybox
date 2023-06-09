import React, { useState, useEffect } from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';
import LegalInfo from '../../components/Legal';
import PhoneHome from '../../components/phoneHome';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function HomeScreen() {
  const [showLegalInfos, setShowLegalInfos] = useState(false);

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });

    return () => {
      subscription.remove();
    };
  });

  if (dimensions.window.height >= dimensions.screen.width) {
    return (
      <View style={[styles.flexOne, styles.justifyContent, styles.alignItems]}>
        <PhoneHome />
      </View>
    );
  } else if (showLegalInfos) {
    return <LegalInfo setShowLegalInfos={setShowLegalInfos} />;
  } else {
    return (
      <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
        <View style={[styles.presentationContainer, styles.row, styles.boxShadow]}>
          <View style={styles.contentContainer}>
            <Text style={[styles.contentTitleText, styles.white, styles.bold, styles.underline]}>La PenalityBox</Text>
            <Text style={[styles.contentText, styles.white]}>
              La Penality Box est un produit fini permettant de gérer les départs et les interruptions de courses ainsi
              que des temps de pénalité infligés par l'arbitrage. Tous les temps, attentes, feux intermédiaires sont
              programmables. Le boîtier est compact et les feux sont dit transflectifs. Le boîtier est également
              télécommandable.
            </Text>
            <View style={[styles.gifContainer, styles.row, styles.alignItems, styles.justifyContent]}>
              <Image
                source={require('../../assets/gif/penalityBox.gif')}
                resizeMode="contain"
                style={styles.penalityBoxGIF}
                alt="PenalityBox gif demo"
              />
            </View>
          </View>
          <View style={[styles.homeImageContainer, styles.verticalAlignCenter]}>
            <Image
              source={require('../../assets/img/logoPenalityBoxDark.png')}
              style={styles.penalityLogo}
              resizeMode="contain"
              alt="PenalityBox Logo"
            />
          </View>
        </View>
        <Footer setShowLegalInfos={setShowLegalInfos} />
      </View>
    );
  }
}
