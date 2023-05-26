import * as React from 'react';
import { View, Text } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

export default function Contributors({navigation}) {
    return(
        <View style={styles.background}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text onPress={() => navigation.navigate('Home')}
                style={{ fontSize: 26, fontWeight: "bold" }}>Contributeurs Screen</Text>
                <Footer navigation={navigation}/>
            </View>
        </View>
    )
}