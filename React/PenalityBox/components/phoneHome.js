import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import styles from '../styles/styles';

export default function phoneHome() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    require('../assets/img/penaRedOne.JPG'),
    require('../assets/img/penaRedTwo.JPG'),
    require('../assets/img/penaGreen.JPG'),
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);


    return (
      <SafeAreaView style={[styles.background, styles.phoneHomeContainer, styles.alignItems]}>
        <ScrollView>
          <View>
            <Text style={[styles.textAlignCenter, styles.bold, styles.white, {fontSize: 26, marginTop: '5%'}]}>
              La PenalityBox
            </Text>
          </View>
          <View style={{marginTop: '5%'}}>
            <Text style={[styles.contentText, styles.white, styles.textAlignCenter, {marginLeft: '1%', marginRight: '1%'}]}>
              La Penality Box est un produit fini permettant de gérer les départs et les interruptions de courses ainsi
              que des temps de pénalité infligés par l'arbitrage. Tous les temps, attentes, feux intermédiaires sont
              programmables. Le boîtier est compact et les feux sont dit transflectifs. Le boîtier est également
              télécommandable.
            </Text>
          </View>
          <View style={[styles.phoneHomeImageContainer, styles.justifyContent, styles.alignItems]}>
            <Image
              source={images[currentIndex]}
              resizeMode="contain"
              style={styles.penalityBoxGIF}
              alt="PenalityBox gif demo"
            />
          </View>
          <View style={styles.phoneDivider} />
          <View style={[styles.phoneHomeImageContainer, styles.justifyContent, styles.alignItems]}>
            <Image
              source={require('../assets/img/logoPenalityBoxDark.png')}
              resizeMode="contain"
              style={styles.penalityBoxGIF}
              alt="PenalityBox gif demo"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}