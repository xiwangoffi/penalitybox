import * as React from 'react';
import { View, Text } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

export default function AppScreen({navigation}) {
    return(
        <View style={styles.background}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text onPress={() => navigation.navigate('Accueil')}
                style={{ fontSize: 26, fontWeight: "bold" }}>AppScreen Screen</Text>
                <Footer navigation={navigation}/>
            </View>
        </View>
    )
}