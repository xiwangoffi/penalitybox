import React, {useState, useEffect} from 'react';
import { View, Dimensions, Text } from 'react-native';
import CreditsList from '../../components/CreditsList';
import PhoneCredits from '../../components/PhoneCreditsList';
import Footer from '../../components/footer';
import styles from '../../styles/styles';  

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Credits({navigation}) {
    const [dimensions, setDimensions] = useState({
        window: windowDimensions,
        screen: screenDimensions,
    });

    useEffect(() => {
        const subscription = Dimensions.addEventListener(
            'change',
            ({window, screen}) => {
                setDimensions({window, screen});
            },
        );
        return () => subscription?.remove();
    });

    if(dimensions.window.height >= dimensions.screen.width) {
        return(
            <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
                <PhoneCredits />
            </View>
        )
    } else {
        return(
            <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
                <CreditsList />
                <Footer navigation={navigation}/>
            </View>
        )
    }
}