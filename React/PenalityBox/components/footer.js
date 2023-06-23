import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function Footer({ setShowLegalInfos }) {
  return (
    <View style={[styles.footer, styles.row, styles.alignItems, styles.justifyContent]}>
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
