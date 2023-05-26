import * as React from 'react';
import { View, Text } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

export default function AppScreen({navigation}) {
    return(
        <View style={styles.background}>
            <View>

            </View>
            <Footer navigation={navigation}/>
        </View>
    )
}