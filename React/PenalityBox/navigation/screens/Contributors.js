import * as React from 'react';
import { View, Text } from 'react-native';
import ContributorsList from '../../components/contributorsList';
import Footer from '../../components/footer';
import styles from '../../styles/styles';   

export default function Contributors({navigation}) {
    return(
        <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
            <ContributorsList />
            <Footer navigation={navigation}/>
        </View>
    )
}