import * as React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/styles';

export default function creditsList() {
    return(
        <View style={[styles.mainJobContainer, styles.row, styles.boxShadow]}>
            <View style={[styles.jobIconsContainer, styles.alignItems]}>
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
                <View style={[styles.jobTextContainer, styles.flexOne]}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.bold, styles.white]}>Concepteur et Directeur de développement</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.bold, styles.white]}>M. Bardi Jean-Marc</Text>
                    </View>
                </View>
                <View style={[styles.jobTextContainer, styles.flexOne]}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.bold, styles.white]}>Développement en C et co-réalisation</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.bold, styles.white]}>M. Neyret Charles</Text>
                    </View>
                </View>
                <View style={[styles.jobTextContainer, styles.flexOne]}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.bold, styles.white]}>Application Android</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.bold, styles.white]}>PRO Mathieu</Text>
                    </View>
                </View>
                <View style={[styles.jobTextContainer, styles.flexOne]}> 
                    <Text style={[styles.jobTitle, styles.jobFont, styles.bold, styles.white]}>co-développement Arduino</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.bold, styles.white]}>ZEGGARI Issam, PRO Mathieu</Text>
                    </View>
                </View>
                <View style={[styles.jobTextContainer, styles.flexOne]}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.bold, styles.white]}>Co-développement, protocole d'interfaçage entre android et la Penality Box</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.bold, styles.white]}>LAVEFVE Alexandre, ZEGGARI Issam</Text>
                    </View>
                </View>
                <View style={[styles.jobTextContainer, styles.flexOne]}>
                    <Text style={[styles.jobTitle, styles.jobFont, styles.bold, styles.white]}>Site internet - React Native / NodeJS</Text>
                    <View>
                        <Text style={[styles.jobFont, styles.bold, styles.white]}>BOISSEAU Romain</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}