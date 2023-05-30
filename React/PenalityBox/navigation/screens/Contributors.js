import * as React from 'react';
import { View, Text } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

export default function Contributors({navigation}) {
    return(
        <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
            <Text>azesrdtfyguhij</Text>
            <Footer navigation={navigation}/>
        </View>
    )
}