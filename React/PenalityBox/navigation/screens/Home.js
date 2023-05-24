import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HomeScreen({navigation}) {
    return(
        <View style={styles.homeContainer}>
            <Text onPress={() => alert('This is the "Home" screen.')}
            style={styles.homeTitle}>Home Screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeTitle: {
        fontSize: 26,
        fontWeight: "bold",
    },
});