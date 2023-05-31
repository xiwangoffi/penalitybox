import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import styles from '../styles/styles';

export default function contributorsList() {
    return(
        <View>
            <View style={[styles.roleContainer, styles.justifyContent]}>
                <View style={styles.svgPos}> {/* Boss */}
                    <Image source={require('../assets/img/user-tie.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Concepteur et co-réalisation / Directeur de développement</Text>
                        <View style={styles.centeredTextContainer}>
                            <Text style={[styles.jobFont, styles.white]}>M. Bardi Jean-Marc</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.roleContainer, styles.justifyContent]}>
                <View style={styles.svgPos}> {/* C developer */}
                    <Image source={require('../assets/img/logoC.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Développement en C et co-réalisation</Text>
                        <View style={styles.centeredTextContainer}>
                            <Text style={[styles.jobFont, styles.white]}>M. Neyret Charles</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.roleContainer, styles.justifyContent]}>
                <View style={styles.svgPos}> {/* Android developer */}
                    <Image source={require('../assets/img/android.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Application Android</Text>
                        <View style={styles.centeredTextContainer}>
                            <Text style={[styles.jobFont, styles.white]}>PRO Mathieu</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.roleContainer, styles.justifyContent]}>
                <View style={styles.svgPos}> {/* Arduino developer */}
                    <Image source={require('../assets/img/arduino.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>co-développement Arduino</Text>
                        <View style={styles.centeredTextContainer}>
                            <Text style={[styles.jobFont, styles.white]}>ZEGGARI Issam</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.roleContainer, styles.justifyContent]}>
                <View style={styles.svgPos}> {/* Interface developer */}
                    <Image source={require('../assets/img/loading.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Co-développement, protocole d'interfaçage entre android et la Penality Box </Text>
                        <View style={styles.centeredTextContainer}>
                            <Text style={[styles.jobFont, styles.white]}>LAVEFVE Alexandre, ZEGGARI Issam</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={[styles.roleContainer, styles.justifyContent]}>
                <View style={styles.svgPos}> {/* Interface developer */}
                    <Image source={require('../assets/img/react-logo.png')} style={styles.jobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Site internet</Text>
                        <View style={styles.centeredTextContainer}>
                            <Text style={[styles.jobFont, styles.white]}>BOISSEAU Romain</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}