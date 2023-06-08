import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Footer from './footer';
import styles from '../styles/styles';

import axios from 'axios'; //axios library for nodejs requests

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function Login({ navigation, setIsConnected, checkAdminStatus, handleEmailChange }) {
  const [mail, setEmail] = useState(''); // user mail
  const [password, setPassword] = useState(''); //user password

  const [isPasswordHovered, setIsPasswordHovered] = useState(false); //handle forgot password text hover
  const [isSignUpHovered, setIsSignUpHovered] = useState(false); //handle sign-in text hover
  const [showSignIn, setShowSignIn] = useState(false); //handle sign-in screen

  const [accountCreatedSuccessfully, setIsAccountCreatedSuccessfully] = useState(false); //handle account creation text

  const [isForgotPassword, setIsForgotPassword] = useState(false); //handle forgot password screen / text
  const [hasToChangePassword, setHasToChangePassword] = useState(false); //handle second step of forgot password screen / text
  const [failedResettingPassword, setFailedResettingPassword] = useState(false); //handle failed resetting password text
  const [isNoEmailProvided, setIsNoEmailProvided] = useState(false); //handle no email provided text

  const [isEmptyPasswordError, setIsEmptyPasswordError] = useState(false); //handle no password text
  const [isEmptyResetTokenError, setIsEmptyResetTokenError] = useState(false); //handle no token text
  const [isResetWrong, setIsResetWrong] = useState(false); //handle no token / password text
  const [isResetSuccess, setIsResetSuccess] = useState(false); //handle reset success text

  const [isLoginEmailEmpty, setIsLoginEmailEmpty] = useState(false); //handle login no email text
  const [isLoginPasswordEmpty, setIsLoginPasswordEmpty] = useState(false); //handle login no password text
  const [isLoginEmpty, setIsLoginEmpty] = useState(false); //handle login no email and password text

  const [resetToken, setResetToken] = useState(''); //handle reset token
  const [newPassword, setNewPassword] = useState(''); //handle new user password


  //Hover method
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

  const sendResetTokenRequest = async () => { //Reset token handle

    if(!mail) { //Troubleshooting
      setIsNoEmailProvided(true);
      return;
    }

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
  

  const resetPasswordRequest = async () => { //Reset password method

    if(!newPassword && !resetToken) { //Troubleshooting
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
        setIsResetSuccess(true);
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

  const validateCredentials = async () => { //Log-in method

    if(!mail && !password) { //Troubleshooting
      setIsLoginEmpty(true);
      setIsLoginEmailEmpty(false);
      setIsLoginPasswordEmpty(false);
      return;
    } else if(!mail) {
      setIsLoginEmailEmpty(true);
      setIsLoginEmpty(false);
      setIsLoginPasswordEmpty(false);
      return;
    } else if(!password) {
      setIsLoginPasswordEmpty(true);
      setIsLoginEmailEmpty(false);
      setIsLoginEmpty(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4444/account/login', {
        mail,
        password,
      });
      const { success } = response.data;
      setIsConnected(success);
      if (success) {
        setIsLoginEmailEmpty(false);
        setIsLoginPasswordEmpty(false);
        setIsLoginEmpty(false);
        setIsResetSuccess(false);
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

  const insertAccount = async () => { //Account creation method

    if(!mail && !password) { //Troubleshooting
      setIsLoginEmpty(true);
      setIsLoginEmailEmpty(false);
      setIsLoginPasswordEmpty(false);
      return;
    } else if(!mail) {
      setIsLoginEmailEmpty(true);
      setIsLoginEmpty(false);
      setIsLoginPasswordEmpty(false);
      return;
    } else if(!password) {
      setIsLoginPasswordEmpty(true);
      setIsLoginEmailEmpty(false);
      setIsLoginEmpty(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:4444/account/insert', {
        mail,
        password,
      });
      console.log(response.data);
      setIsLoginEmailEmpty(false);
      setIsLoginPasswordEmpty(false);
      setIsLoginEmpty(false);
      setIsAccountCreatedSuccessfully(true);
      setShowSignIn(false);
    } catch (error) {
      console.error('Error inserting account:', error.message);
    }
  };

  useEffect(() => { //Set-up screen width/height to handle responsive
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });
    return () => subscription?.remove();
  });

  if (dimensions.window.height >= dimensions.screen.width) {
    return (
      //Handle phone log-in screen
      <View>
        <Text>Login Screen for Phone</Text>
      </View>
    );
  } else {
    return (
      //Handle PC log-in screen
      <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
        <View style={styles.brBottom}>
          <Text style={[
            styles.white, 
            styles.bold, 
            styles.title, 
            styles.textAlign
          ]}>
          {showSignIn
            ? 'Inscription'
            : isForgotPassword
            ? 'Envoi jeton de réinitialisation'
            : hasToChangePassword
            ? 'Réinitialisation mot de passe'
            : 'Connexion'}
          </Text>
        </View>
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
        {!isForgotPassword && !hasToChangePassword ? ( //Input display " mot de passe " cancelled if user is in option reset password
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
        {hasToChangePassword ? ( //Handle password reset
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
              <Text style={ [ styles.red, styles.textShadow, styles.textAlign ] }>
                {isResetWrong //Si aucun champ n'est rempli
                  ? 'Veuillez remplir les 2 champs !'
                  : isEmptyPasswordError //Si le mot de passe est vide
                  ? 'Le mot de passe ne peut pas être vide !'
                  : isEmptyResetTokenError //Si le jeton est vide
                  ? 'Le jeton de réinitialisation ne peut pas être vide !'
                  : null}
              </Text>
            </View>
          </View>
        ) : null}
        <View>
          <Text style={[
            accountCreatedSuccessfully ||
            isResetSuccess ? [styles.green, styles.textShadow] : null,
            failedResettingPassword || 
            isNoEmailProvided || 
            isLoginEmailEmpty || 
            isLoginPasswordEmpty || 
            isLoginEmpty ? [styles.red, styles.bold, styles.textShadow] : null,
          ]}>
            {accountCreatedSuccessfully
              ? 'Compte créé avec succès!'
              : failedResettingPassword
              ? 'Échec réinitialisation du mot de passe ! Veuillez générer un nouveau jeton'
              : isNoEmailProvided
              ? 'Veuillez mettre votre email'
              : isLoginEmailEmpty
              ? 'Veuillez renseigner un email'
              : isLoginPasswordEmpty
              ? 'Veuillez renseigner un mot de passe'
              : isLoginEmpty
              ? 'Veuillez renseigner un mot de passe et un mail'
              : isResetSuccess
              ? 'Mot de passe changé avec succès'
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
        <View style={showSignIn ? [styles.loginOptionContainer, styles.row] : styles.loginOptionContainer}>
          {showSignIn || isForgotPassword || hasToChangePassword ? (
            <View style={showSignIn ? [styles.loginOptionContainer, styles.row] : styles.loginOptionContainer}>
              <Text style={[styles.white, styles.underline, isSignUpHovered && [styles.blue, styles.underline]]} 
              onMouseEnter={handleSignUpHoverEnter} 
              onMouseLeave={handleSignUpHoverLeave}
              onPress={() => {
                setShowSignIn(false); 
                setIsAccountCreatedSuccessfully(false); 
                setFailedResettingPassword(false);
                setHasToChangePassword(false);
                setIsNoEmailProvided(false);
                setIsForgotPassword(false);
                setIsLoginEmpty(false);
                setIsLoginEmailEmpty(false);
                setIsLoginPasswordEmpty(false);
              }}>
                Revenir au menu de connexion
              </Text>
            </View>
          ) : null}
          { !isForgotPassword && !showSignIn && !hasToChangePassword ? ( //Displaying options " mot de passe oublié " and " s'incrire " IF user isn't in option to change password or sign-in
            <View style={showSignIn ? styles.loginOptionContainer : [styles.loginOptionContainer, styles.row] }>
              <View>
                <Text style={[styles.white, styles.underline, isPasswordHovered && [styles.blue, styles.underline]]} 
                onMouseEnter={handlePasswordHoverEnter} 
                onMouseLeave={handlePasswordHoverLeave}
                onPress={() => {
                  setIsForgotPassword(true);
                  setIsAccountCreatedSuccessfully(false);
                  setIsLoginEmpty(false);
                  setIsLoginEmailEmpty(false);
                  setIsLoginPasswordEmpty(false);
                  setIsResetSuccess(false);
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
                  setIsLoginEmpty(false);
                  setIsLoginEmailEmpty(false);
                  setIsLoginPasswordEmpty(false);
                  setIsResetSuccess(false);
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
