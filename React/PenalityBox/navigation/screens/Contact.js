import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import styles from '../../styles/styles';
import Footer from '../../components/footer';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function ContactScreen({ navigation }) {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    sujet: '',
    message: '',
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window, screen }) => {
        setDimensions({ window, screen });
      }
    );
    return () => subscription?.remove();
  });

  const handleSubmit = () => {
    // Send the form data to the server
    axios
      .post('http://localhost:4444/contact/send', formData)
      .then((response) => {
        console.log('Contact form submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting contact form', error);
      });
  };

  if (dimensions.window.height >= dimensions.screen.width) {
    return (
      //Gestion téléphone
      <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
        <TextInput
          style={[styles.phoneInformationContainer, styles.textAlign, styles.phoneInformationBox, styles.white]}
          placeholder="Nom"
          placeholderTextColor="white"
          onChangeText={(text) => setFormData({ ...formData, firstName: text })}
        />
        <TextInput
          style={[styles.phoneInformationContainer, styles.textAlign, styles.phoneInformationBox, styles.white]}
          placeholder="Prénom"
          placeholderTextColor="white"
          onChangeText={(text) => setFormData({ ...formData, lastName: text })}
        />
        <TextInput
          style={[styles.phoneInformationContainer, styles.textAlign, styles.phoneInformationBox, styles.white]}
          placeholder="Mail"
          keyboardType="email-address"
          placeholderTextColor="white"
          onChangeText={(text) => setFormData({ ...formData, email: text })}
        />
        <TextInput
          style={[styles.phoneInformationContainer, styles.textAlign, styles.phoneInformationBox, styles.white]}
          placeholder="Sujet"
          placeholderTextColor="white"
          onChangeText={(text) => setFormData({ ...formData, subject: text })}
        />
        <TextInput
          style={[styles.phoneInformationContainer, styles.phoneMessageBox, styles.white]}
          placeholder="Message"
          multiline={true}
          placeholderTextColor="white"
          onChangeText={(text) => setFormData({ ...formData, message: text })}
        />
        <View style={styles.phoneValidateButton}>
          <Button title="Valider" color="grey" onPress={handleSubmit} />
        </View>
      </View>
    );
  } else {
    return (
      //Gestion PC
      <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
        <View style={styles.iconContainer}>
          <Icon name="user" size={20} color="lightgrey" />
          <TextInput
            style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.formBoxShadow, styles.boxBackground, styles.white]}
            placeholder="Nom"
            placeholderTextColor="lightgrey"
            onChangeText={(text) => setFormData({ ...formData, firstName: text })}
          />
        </View>
        <View style={styles.iconContainer}>
          <Icon name="user" size={20} color="lightgrey" />
          <TextInput
            style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.formBoxShadow, styles.boxBackground, styles.white]}
            placeholder="Prénom"
            placeholderTextColor="lightgrey"
            onChangeText={(text) => setFormData({ ...formData, lastName: text })}
          />
        </View>
        <View style={styles.iconContainer}>
          <Icon name="envelope" size={15} color="lightgrey" />
          <TextInput
            style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.formBoxShadow, styles.boxBackground, styles.white]}
            placeholder="Mail"
            keyboardType="email-address"
            placeholderTextColor="lightgrey"
            onChangeText={(text) => setFormData({ ...formData, email: text })}
          />
        </View>
        <View style={styles.iconContainer}>
          <Icon name={'lightbulb-o'} size={15} color="lightgrey" />
          <TextInput
            style={[styles.informationContainer, styles.textAlign, styles.informationBox, styles.formBoxShadow, styles.boxBackground, styles.white]}
            placeholder="Sujet"
            placeholderTextColor="lightgrey"
            onChangeText={(text) => setFormData({ ...formData, sujet: text })}
          />
        </View>
        <TextInput
          style={[styles.informationContainer, styles.messageBox, styles.boxShadow, styles.boxBackground, styles.white]}
          placeholder="Message"
          multiline={true}
          placeholderTextColor="lightgrey"
          onChangeText={(text) => setFormData({ ...formData, message: text })}
        />
        <View style={[styles.validateButton, styles.boxShadow]}>
          <Button title="Valider" color="grey" onPress={handleSubmit} />
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}
