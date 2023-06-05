import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import styles from '../../styles/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';

export default function UserAccount({ navigation ,setIsConnected, userEmail }) {
  const [mail, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const [isValidate, setIsValidate] = useState(false);
  const [isSignOutHovered, setIsSignOutHovered] = useState(false);
  const [isDeleteAccountHovered, setIsDeleteAccountHovered] = useState(false);

  const handleSignOutHoverEnter = () => {
    setIsSignOutHovered(true);
  };

  const handleSignOutHoverLeave = () => {
    setIsSignOutHovered(false);
  };

  const handleDeleteAccountHoverEnter = () => {
    setIsDeleteAccountHovered(true);
  };

  const handleDeleteAccountHoverLeave = () => {
    setIsDeleteAccountHovered(false);
  };

  const updatePassword = async () => {
    try {
      const response = await axios.put('http://localhost:4444/account/update/password', {
        mail: userEmail,
        previousPassword: oldPassword,
        newPassword: newPassword,
      });
      console.log(response.data.message);

      // Clear the input fields
      setOldPassword('');
      setNewPassword('');
      setIsValidate(true);
    } catch (error) {
      console.error('Error updating password:', error.message);
    }
  };

  const deleteAccount = async () => {
    try {
      const response = await axios.delete('http://localhost:4444/account/delete', {
        data: { mail: userEmail },
      });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error deleting account:', error.message);
    }
  };

  return (
    <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
      <View style={styles.iconContainer}>
        <Icon name="at" size={20} color="lightgrey" />
        <TextInput
          style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.boxShadow, styles.white]}
          keyboardType="email-address"
          placeholderTextColor="lightgrey"
          value={userEmail}
        />
      </View>
      <View style={[styles.iconContainer, styles.br]}>
        <Icon name="lock" size={20} color="lightgrey" />
        <TextInput
          style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.boxShadow, styles.white]}
          placeholder="Mot de passe actuel"
          placeholderTextColor="lightgrey"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
        />
      </View>
      <View style={styles.iconContainer}>
        <Icon name="lock" size={20} color="lightgrey" />
        <TextInput
          style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.boxShadow, styles.white]}
          placeholder="Nouveau mot de passe"
          placeholderTextColor="lightgrey"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
      </View>
      <View>
        <Text style={isValidate && styles.green}>{isValidate ? 'Mot de passe changé avec succès !' : ''}</Text>
      </View>
      <View style={[styles.validateButton, styles.boxShadow]}>
        <Button title="Valider" color="grey" onPress={updatePassword} />
      </View>
      <View style={styles.loginOptionContainer}>
          <View>
            <Text style={[styles.white, styles.underline, isSignOutHovered && [styles.red, styles.underline]]} 
            onMouseEnter={handleSignOutHoverEnter} 
            onMouseLeave={handleSignOutHoverLeave} 
            onPress={() => {setIsConnected(false); navigation.navigate('Accueil');}}>
              Se déconnecter
            </Text>
          </View>
          <View style={{ marginHorizontal: '50%' }}></View>
          <View>
            <Text style={[styles.white, styles.underline, isDeleteAccountHovered && [styles.red, styles.underline]]} 
            onMouseEnter={handleDeleteAccountHoverEnter} 
            onMouseLeave={handleDeleteAccountHoverLeave} 
            onPress={() => {setIsConnected(false); deleteAccount(); navigation.navigate('Accueil');}}>
              Supprimer mon compte
            </Text>
          </View>
        </View>
    </View>
  );
}
