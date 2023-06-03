import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './footer';
import styles from '../styles/styles';

import axios from 'axios';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function LoginModal({ navigation, setIsConnected}) {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHovered, setIsPasswordHovered] = useState(false);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);

  const handlePasswordHoverEnter = () => {
    setIsPasswordHovered(true);
  };

  const handlePasswordHoverLeave = () => {
    setIsPasswordHovered(false);
  };

  const handleSignUpHoverEnter = () => {
    setIsSignUpHovered(true);
  };

  const handleSignUpHoverLeave = () => {
    setIsSignUpHovered(false);
  };

  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  const validateCredentials = async () => {
    try {
      const response = await axios.post('http://localhost:4444/account/login', {
        mail,
        password,
      });
      const { success } = response.data;
      setIsConnected(success);
      if (success) {
        console.log('User connected successfully');
      } else {
        console.log('User authentication failed');
      }
    } catch (error) {
      console.error('Error validating credentials:', error.message);
      setIsConnected(false);
    }
  };

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });

  if (dimensions.window.height >= dimensions.screen.width) {
    return (
      //Gestion téléphone
      <View>
        <Text>Login Screen for Phone</Text>
      </View>
    );
  } else {
    return (
      //Gestion PC
      <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
        <View style={styles.iconContainer}>
          <Icon name="at" size={20} color="lightgrey" />
          <TextInput
            style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.boxShadow, styles.white]}
            placeholder="E-mail"
            keyboardType="email-address"
            placeholderTextColor="lightgrey"
            onChangeText={(text) => setEmail(text)}
          ></TextInput>
        </View>
        <View style={styles.iconContainer}>
          <Icon name="lock" size={20} color="lightgrey" />
          <TextInput
            style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.boxShadow, styles.white]}
            placeholder="Mot de passe"
            placeholderTextColor="lightgrey"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
          ></TextInput>
        </View>
        <View style={[styles.validateButton, styles.boxShadow]}>
          <Button
              title="Valider"
              color="grey"
              onPress={() => {
                  validateCredentials();
                  navigation.navigate('Accueil');
              }}
          />

        </View>
        <View style={styles.loginOptionContainer}>
          <View>
              <Text style={[styles.white, styles.underline, isPasswordHovered && [styles.blue, styles.underline]]} onMouseEnter={handlePasswordHoverEnter} onMouseLeave={handlePasswordHoverLeave}>Mot de passe oublié ?</Text>
          </View>
          <View style={{marginHorizontal: '50%'}}></View>
          <View>
              <Text style={[styles.white, styles.underline, isSignUpHovered && [styles.blue, styles.underline]]} onMouseEnter={handleSignUpHoverEnter} onMouseLeave={handleSignUpHoverLeave}>S'inscrire</Text>
          </View>
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}
