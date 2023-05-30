import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, StyleSheet, Button, Dimensions, ScrollView, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

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
        return( //Gestion téléphone
            <View style={[styles.background, styles.alignItems, styles.justifyContent]}> 
                <TextInput style={[styles.phoneInformationContainer, styles.textAlign, styles.phoneInformationBox, styles.white]} placeholder='Nom' placeholderTextColor='white'></TextInput> 
                <TextInput style={[styles.phoneInformationContainer, styles.textAlign, styles.phoneInformationBox, styles.white]} placeholder='Prénom' placeholderTextColor='white'></TextInput>
                <TextInput style={[styles.phoneInformationContainer, styles.textAlign, styles.phoneInformationBox, styles.white]} placeholder='Mail' keyboardType='email-address' placeholderTextColor='white'></TextInput>
                <TextInput style={[styles.phoneInformationContainer, styles.phoneMessageBox, styles.white]} placeholder='Message' multiline={true} placeholderTextColor='white'></TextInput>
                <View style={styles.phoneValidateButton}>
                    <Button title='Valider' color='grey'/>
                </View>
            </View>
        )
    } else {
        return( //Gestion PC
            <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
                <View style={styles.iconContainer}>
                    <Icon name="user" size={20} color="lightgrey" />
                    <TextInput style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.formBoxShadow, styles.white]} placeholder='Nom' placeholderTextColor='lightgrey'></TextInput> 
                </View>
                <View style={styles.iconContainer}>
                    <Icon name="user" size={20} color="lightgrey" />
                    <TextInput style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.formBoxShadow, styles.white]} placeholder='Prénom' placeholderTextColor='lightgrey'></TextInput>
                </View>
                <View style={styles.iconContainer}>
                    <Icon name="envelope" size={15} color="lightgrey" />
                    <TextInput style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.formBoxShadow, styles.white]} placeholder='Mail' keyboardType='email-address' placeholderTextColor='lightgrey'></TextInput>
                </View>
                <TextInput style={[styles.informationContainer, styles.messageBox, styles.boxShadow, styles.white]} placeholder='Message' multiline={true} placeholderTextColor='lightgrey'></TextInput>
                <View style={[styles.validateButton, styles.boxShadow]}>
                    <Button title='Valider' color='grey'/>
                </View>
                <Footer navigation={navigation}/>
            </View>
        )
    }

}