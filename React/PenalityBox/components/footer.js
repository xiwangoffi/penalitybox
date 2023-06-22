import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function Footer({ setShowLegalInfos }) {
  return (
    <View style={styles.footer}>
      <View style={styles.footerItem}>
        <Text style={styles.white}>SARL Libreboot</Text>
      </View>
      <View style={styles.footerItem}>
        <Image
          source={require('../assets/img/logoLB2.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={styles.footerItem}
        onPress={() => setShowLegalInfos(prevValue => !prevValue)}
      >
        <Text style={styles.white}>Informations légales</Text>
      </TouchableOpacity>
    </View>
  );
}
