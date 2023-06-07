import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Alert } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function VersionScreen({navigation}) {
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
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ fontSize: 26, fontWeight: "bold" }}>Version Screen</Text>
            </View>
        )
    } else {
        return(
            <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
                <View style={[styles.versionContainer, styles.boxShadow]}>
                    <View style={styles.versionTextContainer}>
                        <View style={[styles.versionNumberContainer, styles.justifyContent]}>
                            <Text style={[styles.white, styles.bold, styles.title]}>Version 1</Text>
                        </View>
                        <View style={styles.versionChangelogContainer}>

                        </View>
                        <View style={styles.versionDateContainer}>

                        </View>
                    </View>
                    <View style={styles.versionImageContainer}>

                    </View>
                </View>
                <Footer navigation={navigation} />
            </View>
        )
    }
}