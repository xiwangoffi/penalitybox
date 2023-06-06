import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './footer';
import styles from '../styles/styles';


import axios from 'axios';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function LoginModal({ navigation, setIsConnected, checkAdminStatus, handleEmailChange }) {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isPasswordHovered, setIsPasswordHovered] = useState(false);
  const [isSignUpHovered, setIsSignUpHovered] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const [accountCreatedSuccessfully, setIsAccountCreatedSuccessfully] = useState(false);

  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [hasToChangePassword, setHasToChangePassword] = useState(false);
  const [failedResettingPassword, setFailedResettingPassword] = useState(false);

  const [isEmptyPasswordError, setIsEmptyPasswordError] = useState(false);
  const [isEmptyResetTokenError, setIsEmptyResetTokenError] = useState(false);
  const [isResetWrong, setIsResetWrong] = useState(false);

  const [resetToken, setResetToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

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

  const sendResetTokenRequest = async () => {
    try {
      const response = await axios.post(`http://localhost:4444/account/forgot-password`, { mail });
      console.log(response.data);
      // Check the response and display a message to the user
      const { message, resetToken } = response.data;
      console.log(message);
      setHasToChangePassword(true);
      setIsForgotPassword(false);
    } catch (error) {
      console.error('Error sending reset token request:', error.message);
    }
  };
  

  const resetPasswordRequest = async () => {

    if(!newPassword && !resetToken) {
      setIsEmptyPasswordError(false);
      setIsEmptyResetTokenError(false);
      setIsResetWrong(true);
      return;
    } else if(!newPassword) {
      setIsEmptyResetTokenError(false);
      setIsResetWrong(false);
      setIsEmptyPasswordError(true);
      return;
    } else if (!resetToken) {
      setIsEmptyPasswordError(false);
      setIsResetWrong(false);
      setIsEmptyResetTokenError(true);
      return;
    }

    try {
      const response = await axios.post(`http://localhost:4444/account/reset-password`, {
        mail,
        resetToken,
        newPassword,
      });
      const { success, message } = response.data;
      if(success) {
        console.log('Password succesfully reset');
        setIsEmptyPasswordError(false);
        setHasToChangePassword(false);
      } else {
        console.log('Failed to reset password:', message);
        setFailedResettingPassword(true);
      }
      // Handle the response from the server
    } catch (error) {
      setFailedResettingPassword(true);
      setIsResetWrong(false);
      setIsEmptyPasswordError(false);
      setIsEmptyResetTokenError(false);
      console.error('Error resetting password:', error.message);
    }
  };

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
        checkAdminStatus(mail);
        handleEmailChange(mail);
      } else {
        console.log('User authentication failed');
      }
    } catch (error) {
      console.error('Error validating credentials:', error.message);
      setIsConnected(false);
    }
  };

  const insertAccount = async () => {
    try {
      const response = await axios.post('http://localhost:4444/account/insert', {
        mail,
        password,
      });
      console.log(response.data);
      setIsAccountCreatedSuccessfully(true);
      setShowSignIn(false);
    } catch (error) {
      console.error('Error inserting account:', error.message);
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
        {!isForgotPassword && !hasToChangePassword ? (
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
        ) : null}
        {hasToChangePassword ? ( //qwsedrftgyhusedrftgyhujied-rfètgyhujie-drèftyguhijok'edrfyhui'de(rf-tgyèhuji)
          <View>
            <View style={styles.iconContainer}>
              <Icon name="key" size={20} color="lightgrey" />
              <TextInput style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.boxShadow, styles.white]} 
                placeholder='Jeton de rénitialisation' 
                value={resetToken} 
                onChangeText={setResetToken} />
            </View>
            <View style={styles.iconContainer}>
              <Icon name="lock" size={20} color="lightgrey" />
              <TextInput style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.boxShadow, styles.white]} 
                placeholder='Nouveau mot de passe' 
                value={newPassword} 
                onChangeText={setNewPassword} 
                secureTextEntry />
            </View>
            <View>
              <Text style={ [ styles.red, styles.textShadow ] }>
                {isResetWrong 
                  ? 'Veuillez remplir les 2 champs !'
                  : isEmptyPasswordError
                  ? 'Le mot de passe ne peut pas être vide !'
                  : isEmptyResetTokenError
                  ? 'Le jeton de réinitialisation ne peut pas être vide !'
                  : null}
              </Text>
            </View>
          </View>
        ) : null}
        <View>
          <Text style={[
            accountCreatedSuccessfully ? [styles.green, styles.textShadow] : null,
            failedResettingPassword ? [styles.red, styles.bold, styles.textShadow] : null,
          ]}>
            {accountCreatedSuccessfully
              ? 'Compte créé avec succès!'
              : failedResettingPassword
              ? 'Échec réinitialisation du mot de passe ! Veuillez générer un nouveau jeton'
              : null}
          </Text>
        </View>
        <View style={[styles.validateButton, styles.boxShadow]}>
          <Button
            title="Valider"
            color="grey"
            onPress={() => {
              if (showSignIn) {
                insertAccount();
              } else if (isForgotPassword) {
                sendResetTokenRequest();
              } else if (hasToChangePassword) {
                resetPasswordRequest();
              } else {
                validateCredentials();
              }
            }}
          />
        </View>
        <View style={showSignIn ? [styles.loginOptionContainer, {flexDirection: 'row'}] : styles.loginOptionContainer}>
          {showSignIn || isForgotPassword || hasToChangePassword ? (
            <View style={showSignIn ? [styles.loginOptionContainer, {flexDirection: 'row'}] : styles.loginOptionContainer}>
              <Text style={[styles.white, styles.underline, isSignUpHovered && [styles.blue, styles.underline]]} 
              onMouseEnter={handleSignUpHoverEnter} 
              onMouseLeave={handleSignUpHoverLeave}
              onPress={() => {
                setShowSignIn(false); 
                setIsAccountCreatedSuccessfully(false); 
                setFailedResettingPassword(false);
                setHasToChangePassword(false);
              }}>
                Revenir au menu de connexion
              </Text>
            </View>
          ) : null}
          { !isForgotPassword && !showSignIn && !hasToChangePassword ? (
            <View style={showSignIn ? styles.loginOptionContainer : [styles.loginOptionContainer, {flexDirection: 'row'}] }>
              <View>
                <Text style={[styles.white, styles.underline, isPasswordHovered && [styles.blue, styles.underline]]} 
                onMouseEnter={handlePasswordHoverEnter} 
                onMouseLeave={handlePasswordHoverLeave}
                onPress={() => {
                  setIsForgotPassword(true);
                  setIsAccountCreatedSuccessfully(false);
                  }}>
                  Mot de passe oublié ?
                </Text>
              </View>
              <View style={{ marginHorizontal: '50%' }}></View>
              <View>
                <Text style={[styles.white, styles.underline, isSignUpHovered && [styles.blue, styles.underline]]} 
                onMouseEnter={handleSignUpHoverEnter} 
                onMouseLeave={handleSignUpHoverLeave}
                onPress={() => {
                  setShowSignIn(true);
                  setIsAccountCreatedSuccessfully(false);
                }}>
                  S'inscrire
                </Text>
              </View>
            </View>
          ) : null}
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}
