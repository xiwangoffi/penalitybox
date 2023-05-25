import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Button, Dimensions } from 'react-native';
import footer from '../../components/footer';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function ContactScreen({navigation}) {
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
            <View style={style.phoneMainViewContainer}> 
                <TextInput style={[style.phoneInformationContainer, style.textAlign, style.phoneInformationBox]} placeholder='Nom' placeholderTextColor='white'></TextInput> 
                <TextInput style={[style.phoneInformationContainer, style.textAlign, style.phoneInformationBox]} placeholder='Prénom' placeholderTextColor='white'></TextInput>
                <TextInput style={[style.phoneInformationContainer, style.textAlign, style.phoneInformationBox]} placeholder='Mail' keyboardType='email-address' placeholderTextColor='white'></TextInput>
                <TextInput style={[style.phoneInformationContainer, style.phoneMessageBox]} placeholder='Message' multiline={true} placeholderTextColor='white'></TextInput>
                <View style={style.phoneValidateButton}>
                    <Button title='Valider' color='grey'/>
                </View>
            </View>
        )
    } else {
        return(
            <View style={style.mainViewContainer}> 
                <TextInput style={[style.informationContainer, style.textAlign, style.informationBox, style.boxShadow]} placeholder='Nom'></TextInput> 
                <TextInput style={[style.informationContainer, style.textAlign, style.informationBox, style.boxShadow]} placeholder='Prénom'></TextInput>
                <TextInput style={[style.informationContainer, style.textAlign, style.informationBox, style.boxShadow]} placeholder='Mail' keyboardType='email-address'></TextInput>
                <TextInput style={[style.informationContainer, style.messageBox, style.boxShadow]} placeholder='Message' multiline={true}></TextInput>
                <View style={[style.validateButton, style.boxShadow]}>
                    <Button title='Valider' color='grey'/>
                </View>
            </View>
        )
    }

}

const style = StyleSheet.create({
/*

 - CSS for Phone

    /*

     - Phone Container

    */
    
    phoneMainViewContainer: {
        flex: 1,
        backgroundColor: '#837A7A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    phoneInformationContainer: {
        borderWidth: 1,
        marginTop: '5%',
        borderRadius: 7,
        borderColor: 'white',
        color: 'white',
    },
    phoneInformationBox: {
        width: 250,
        height: 40,
    },
    phoneMessageBox: {
        flex: 0.3,
        width: 250,
        verticalAlign: 'top',
        padding: 10,
    },

    /*

     - Phone Container

     ------------------

     - Text 

    */

    textAlign: {
        textAlign: 'center',
    },

    /*

     - Text

     --------------

     - Button

    */

    phoneValidateButton: {
        width: 150,
        marginTop: '3%',
    },

    /*

     - Button

    */

/*

 - CSS for Computer

    /*

     - PC Container

    */

    boxShadow: {
        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {width: -2, height: 2},
        shadowOpacity: 0.7,
    },
    mainViewContainer: {
        flex: 1,
        backgroundColor: '#837A7A',
        alignItems: 'center',
        justifyContent: 'center'
    },
    informationContainer: {
        borderWidth: 1,
        marginTop: '2%',
        borderRadius: 7,
        borderColor: 'white',
        color: 'white',
    },
    informationBox: {
        width: 350,
        height: 40,
    },
    messageBox: {
        flex: 0.3,
        width: 450,
        verticalAlign: 'top',
        padding: 10,
    },

    validateButton: {
        marginTop: '1.5%',
        width: 250,
    },
})