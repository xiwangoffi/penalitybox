import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import styles from '../styles/styles';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Footer({ setShowLegalInfos }) {

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
  });

  if(dimensions.window.height >= dimensions.screen.width) {
    return (
      <View style={[styles.footerStyle, styles.phoneFooter, styles.row, styles.alignItems, styles.justifyContent]}>
        <View style={[styles.flexOne, styles.alignItems, styles.justifyContent]}>
          <Text style={styles.white}>SARL Libreboot</Text>
        </View>
        <View style={[styles.flexOne, styles.alignItems, styles.justifyContent]}>
          <Image
            source={require('../assets/img/logoLB2.png')}
            style={styles.phoneLogo}
            resizeMode="contain"
            alt='PenalityBox company logo'
          />
        </View>
        <TouchableOpacity
          style={[styles.flexOne, styles.alignItems, styles.justifyContent]}
          onPress={() => setShowLegalInfos(prevValue => !prevValue)}
        >
          <Text style={styles.white}>Informations légales</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={[styles.footerStyle, styles.footer, styles.row, styles.alignItems, styles.justifyContent]}>
        <View style={[styles.flexOne, styles.alignItems, styles.justifyContent]}>
          <Text style={styles.white}>SARL Libreboot</Text>
        </View>
        <View style={[styles.flexOne, styles.alignItems, styles.justifyContent]}>
          <Image
            source={require('../assets/img/logoLB2.png')}
            style={styles.logo}
            resizeMode="contain"
            alt='PenalityBox company logo'
          />
        </View>
        <TouchableOpacity
          style={[styles.flexOne, styles.alignItems, styles.justifyContent]}
          onPress={() => setShowLegalInfos(prevValue => !prevValue)}
        >
          <Text style={styles.white}>Informations légales</Text>
        </TouchableOpacity>
      </View>
    );
  }  
}
