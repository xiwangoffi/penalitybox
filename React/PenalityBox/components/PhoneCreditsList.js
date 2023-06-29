import * as React from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import styles from '../styles/styles';

export default function PhoneCreditsList() {
    return(
        <SafeAreaView style={styles.phoneRoleContainer}>
            <ScrollView>
                <View style={[styles.phoneCreditsImage, styles.justifyContent, styles.alignItems]}>
                    <Image source={require('../assets/img/user-tie.png')} style={styles.phoneJobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={[styles.flexOne, styles.justifyContent, styles.alignItems]}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white, styles.textAlignCenter]}>Concepteur et co-réalisation / Directeur de développement</Text>
                        <View style={[styles.justifyContent, styles.alignItems]}>
                            <Text style={[styles.jobFont, styles.bold, styles.white, styles.textAlignCenter]}>M. Bardi Jean-Marc</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.littleBr} />
                <View style={[styles.phoneCreditsImage, styles.justifyContent, styles.alignItems]}>
                    <Image source={require('../assets/img/logoC.png')} style={styles.phoneJobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={[styles.flexOne, styles.justifyContent, styles.alignItems]}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white, styles.textAlignCenter]}>Développement en C et co-réalisation</Text>
                        <View style={[styles.justifyContent, styles.alignItems]}>
                            <Text style={[styles.jobFont, styles.bold, styles.white, styles.textAlignCenter]}>M. Neyret Charles</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.littleBr} />
                <View style={[styles.phoneCreditsImage, styles.justifyContent, styles.alignItems]}>
                    <Image source={require('../assets/img/android.png')} style={styles.phoneJobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={[styles.flexOne, styles.justifyContent, styles.alignItems]}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white, styles.textAlignCenter]}>Application Android</Text>
                        <View style={[styles.justifyContent, styles.alignItems]}>
                            <Text style={[styles.jobFont, styles.bold, styles.white, styles.textAlignCenter]}>PRO Mathieu</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.littleBr} />
                <View style={[styles.phoneCreditsImage, styles.justifyContent, styles.alignItems]}>
                    <Image source={require('../assets/img/arduino.png')} style={styles.phoneJobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={[styles.flexOne, styles.justifyContent, styles.alignItems]}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white, styles.textAlignCenter]}>co-développement Arduino</Text>
                        <View style={[styles.justifyContent, styles.alignItems]}>
                            <Text style={[styles.jobFont, styles.bold, styles.white, styles.textAlignCenter]}>ZEGGARI Issam, PRO Mathieu</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.littleBr} />
                <View style={[styles.phoneCreditsImage, styles.justifyContent, styles.alignItems]}>
                    <Image source={require('../assets/img/loading.png')} style={styles.phoneJobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={[styles.flexOne, styles.justifyContent, styles.alignItems]}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white, styles.textAlignCenter]}>co-développement, protocole d'interfaçage entre android et la Penality Box</Text>
                        <View style={[styles.justifyContent, styles.alignItems]}>
                            <Text style={[styles.jobFont, styles.bold, styles.white, styles.textAlignCenter]}>LAVEFVE Alexandre, ZEGGARI Issam</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.littleBr} />
                <View style={[styles.phoneCreditsImage, styles.justifyContent, styles.alignItems]}>
                    <Image source={require('../assets/img/react-logo.png')} style={styles.phoneJobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={[styles.flexOne, styles.justifyContent, styles.alignItems]}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white, styles.textAlignCenter]}>Site internet - React Native / NodeJS</Text>
                        <View style={[styles.justifyContent, styles.alignItems]}>
                            <Text style={[styles.jobFont, styles.bold, styles.white, styles.textAlignCenter]}>BOISSEAU Romain</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}