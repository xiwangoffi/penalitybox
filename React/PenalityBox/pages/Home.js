//import { HomeComponent } from '../components/homeComponent';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';


export default class Home extends React.Component {

    constructor() {
        super();

        const isPortrait = () => {
            const dim = Dimensions.get('screen');
            return dim.height >= dim.width;
        };

        this.state = {
            orientation: isPortrait() ? 'portrait' : 'landscape'
        };

        Dimensions.addEventListener('change', () => {
            this.setState({
                orientation: isPortrait() ? 'portrait' : 'landscape'
            });
        });
    }

    render() {
        if(this.state.orientation === 'portrait') {
            return(
                <View style={styles.portrait}>
                    <Text style={styles.white}>Open up Portrait.js start working on your app!</Text>
                </View>
            );
        }
        else {
            return(
                <View style={styles.landscape}>
                    <View style={styles.landscapePos}>
                        <Text style={styles.white}>Open up Landscape.js start working on your app!</Text>
                    </View>
                    <View style={styles.landscapeContentPos}>
                        <Text>qsdcfgy</Text>
                    </View>
                </View>
            );
        }
      }
}

const styles = StyleSheet.create({
    portrait: {
      flex: 1,
      backgroundColor: '#6C6868',
      alignItems: 'center',
      paddingTop: '15%',
    },
    landscape: {
      flex: 1,
      backgroundColor: '#6C6868',
      alignItems: 'center',
    },
    white: {
        color: 'white',
        borderBottomWidth: 4,
        borderBottomColor: "#fff",
    },
    landscapePos: {
        marginTop: '10%',
        borderBottomWidth: 5,
        borderBottomColor: "#47315a",
    },
    landscapeContentPos: {
        marginTop: '10%',
        backgroundColor: '#fff',
    },
});