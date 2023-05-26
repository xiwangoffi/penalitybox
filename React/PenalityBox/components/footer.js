import * as React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import styles from '../styles/styles';

export default function Footer({navigation}) {

    return(
        <View style={styles.footer}>
            <View>
                <Text style={styles.white}>SARL Libreboot</Text>
            </View>
            <View>
                <Image source={require('../assets/img/logoLB2.png')} style={styles.logo} resizeMode='contain'/>
            </View>
            <View>
            <Text
            style={styles.white}
            onPress={() => navigation.navigate('Home')}
            >Informations légales</Text>
            </View>
        </View>
    )
}