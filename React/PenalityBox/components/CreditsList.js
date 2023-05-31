import * as React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/styles';

export default function creditsList() {
    return(
        <View style={[styles.mainJobContainer, styles.boxShadow]}>
            <View style={styles.jobIconsContainer}>
                <View style={styles.jobFirstIcon}>
                    <Image source={require('../assets/img/user-tie.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <Image source={require('../assets/img/logoC.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <Image source={require('../assets/img/android.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <Image source={require('../assets/img/arduino.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <Image source={require('../assets/img/loading.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View style={styles.jobLastIcon}>
                    <Image source={require('../assets/img/react-logo.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
            </View>
            <View style={styles.jobTitleContainer}>
                <View style={styles.jobTextContainer}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Concepteur et co-réalisation / Directeur de développement</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.white]}>M. Bardi Jean-Marc</Text>
                    </View>
                </View>
                <View style={styles.jobTextContainer}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Développement en C et co-réalisation</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.white]}>M. Neyret Charles</Text>
                    </View>
                </View>
                <View style={styles.jobTextContainer}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Application Android</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.white]}>PRO Mathieu</Text>
                    </View>
                </View>
                <View style={styles.jobTextContainer}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>co-développement Arduino</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.white]}>ZEGGARI Issam, PRO Mathieu</Text>
                    </View>
                </View>
                <View style={styles.jobTextContainer}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Co-développement, protocole d'interfaçage entre android et la Penality Box</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.white]}>LAVEFVE Alexandre, ZEGGARI Issam</Text>
                    </View>
                </View>
                <View style={styles.jobTextContainer}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Site internet</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.white]}>BOISSEAU Romain</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}