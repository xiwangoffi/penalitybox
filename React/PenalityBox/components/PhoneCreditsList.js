import * as React from 'react';
import { View, Text, Image } from 'react-native';
import styles from '../styles/styles';

export default function PhoneCreditsList() {
    return(
        <View>
            <View style={[styles.phoneRoleContainer, styles.justifyContent]}>
                <View style={styles.phoneCreditsImage}>
                    <Image source={require('../assets/img/user-tie.png')} style={styles.phoneJobIconsSize} resizeMode='contain' />
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
        </View>
    )
}