import * as React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/styles';

export default function PhoneCreditsList() {
    return(
        <View>
            <View style={[styles.phoneRoleContainer, styles.justifyContent]}>
                <View style={[styles.phoneCreditsImage, styles.justifyContent, styles.alignItems]}>
                    <Image source={require('../assets/img/user-tie.png')} style={styles.phoneJobIconsSize} resizeMode='contain' />
                </View>
                <View>
                    <View style={[styles.flexOne, styles.justifyContent, styles.alignItems]}>
                        <Text style={[styles.jobTitle, styles.jobFont, styles.white]}>Concepteur et co-réalisation / Directeur de développement</Text>
                        <View style={[styles.justifyContent, styles.alignItems]}>
                            <Text style={[styles.jobFont, styles.bold, styles.white]}>M. Bardi Jean-Marc</Text>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}