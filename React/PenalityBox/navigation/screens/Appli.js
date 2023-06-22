import React, { useState } from 'react';
import { View, ScrollView, Text, SafeAreaView, Image } from 'react-native';
import LegalInfo from '../../components/Legal';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

export default function AppScreen() {

  const [showLegalInfos, setShowLegalInfos] = useState(false);

  return (
    <SafeAreaView style={[styles.flexOne, styles.background]}>
    {showLegalInfos ? <LegalInfo setShowLegalInfos={setShowLegalInfos} /> : (
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.mainContainer, styles.boxBackground, styles.boxShadow, styles.alignItems]}>
          <View style={styles.appTextContainer}>
            <View>
              <Text style={[styles.appTextTitle, styles.appTextSpaceBetween, styles.bold, styles.textAlign, styles.white]}>
                La Penality Box peut être programmée simplement à{'\n'}
                l’aide de son clavier 16 touches et de son écran{'\n'}
                LCD.
              </Text>
            </View>
            <View style={styles.appImageContainer}>
              <Image
                source={require('../../assets/img/penalitybox_panel.png')}
                style={styles.panelImage}
                resizeMode="contain"
              />
            </View>
            <View style={styles.br} />
            <View style={styles.sequenceText}>
              <Text style={[styles.appTextTitle, styles.appTextSpaceBetween, styles.bold, styles.underline, styles.white]}>
                Séquence de départ :
              </Text>
              <Text style={[styles.appSubText, styles.appTextSpaceBetween, styles.bold, styles.white]}>
                Appuis sur la touche « A » du clavier ou de la{'\n'}
                télécommande
              </Text>
              <Text style={[styles.appTextTitle, styles.appTextSpaceBetween, styles.bold, styles.underline, styles.white]}>
                Pénalité :
              </Text>
              <Text style={[styles.appSubText, styles.appTextSpaceBetween, styles.bold, styles.white]}>
                Appuis sur la touche « B » ou « C » du clavier ou{'\n'}
                de la télécommande
              </Text>
              <Text style={[styles.appTextTitle, styles.appTextSpaceBetween, styles.bold, styles.underline, styles.white]}>
                STOP :
              </Text>
              <Text style={[styles.appSubText, styles.appTextSpaceBetween, styles.bold, styles.white]}>
                Appuis sur la touche « D » du clavier ou de la{'\n'}
                télécommande
              </Text>
            </View>
            <View style={styles.br} />
            <View style={styles.appTextPosAdjust}>
              <Text style={[styles.appSubText, styles.appTextSpaceBetween, styles.bold, styles.textAlign, styles.white]}>
                La séquence de départ se compose d’un temps de
                latence (programmable « temps avant départ »), puis
                d’un feu rouge, d’un second (la durée entre
                l’allumage du premier et du second rouge et la durée
                avant le top départ est programmable « entre rouge »)
                et enfin l’extinction des feux rouges et l’allumage
                du feu vert, la durée d’allumage du vert est
                programmable « durée vert ». Le départ peut-être
                cadencé à une fréquence programmable « entre
                départ ».
                (Exemple, toute le 30s pour les départ en groupe)
              </Text>
            </View>
            <View style={styles.br} />
            <View style={styles.appTextPosAdjust}>
              <Text style={[styles.appSubText, styles.appTextSpaceBetween, styles.bold, styles.textAlign, styles.white]}>
                La séquence de pénalité se compose de l’allumage
                des feux rouges, lorsque qu’il reste moins de 10
                secondes les rouges clignote pour avertir d’une
                reprise imminente et enfin le vert s’allume. Le temps
                de pénalité et la durée de l’allumage du vert sont
                programmables « durée péna » pour « B » et « C ».
                Exemple pénaB 1min30s et pénaC 30s.
              </Text>
            </View>
            <View style={styles.br} />
            <View style={styles.appTextPosAdjust}>
              <Text style={[styles.appSubText, styles.appTextSpaceBetween, styles.bold, styles.textAlign, styles.white]}>
                La séquence STOP se compose de l’allumage des
                feux rouges jusqu’à l’appui à nouveau sur la touche
                « D » du clavier ou de la télécommande.
              </Text>
            </View>
            <View style={styles.br} />
            <View style={styles.appTextPosAdjust}>
              <Text style={[styles.appSubText, styles.appTextSpaceBetween, styles.bold, styles.textAlign, styles.white]}>
                Le boîtier peut-être éteint sans perte des
                paramètres.
              </Text>
            </View>
            <View style={styles.appImageContainer}>
              <Image
                source={require('../../assets/img/logoPenalityBoxDark.png')}
                style={styles.panelImage}
                resizeMode="contain"
              />
            </View>
          </View>
          <View style={styles.br} />
        </View>
        <View style={styles.footerWrapper}>
          <Footer setShowLegalInfos={setShowLegalInfos} />
        </View>
      </ScrollView>
    )}
    </SafeAreaView>
  );
}
