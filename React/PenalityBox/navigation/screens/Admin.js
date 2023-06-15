import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import axios from 'axios';
import styles from '../../styles/styles';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AdminScreen({ navigation }) {

  //Handling insert version database fields
  const [recentUsers, setRecentUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [changelog, setChangelog] = useState('');
  const [developers, setDevelopers] = useState('');

  //Handling insert version errors
  const [isEmptyVersionFields, setIsEmptyVersionFields] = useState(false);
  const [isEmptyVersionImage, setIsEmptyVersionImage] = useState(false);
  const [isEmptyVersionChangelog, setIsEmptyVersionChangelog] = useState(false);
  const [isEmptyVersionDevelopers, setIsEmptyVersionDevelopers] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  //Clear message when empty field
  const resetErrors = async () => {
    setIsEmptyVersionChangelog(false);
    setIsEmptyVersionFields(false);
    setIsEmptyVersionImage(false);
    setIsEmptyVersionDevelopers(false);
  }

  //Timer for the message when insert version is done successfully
  useEffect(() => {
    let timer;
    if (showSuccessMessage) {
      timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showSuccessMessage]);

  //Auto refreshing listing recent / all users
  useEffect(() => {
    const fetchUsersAndRecent = async () => {
      await fetchRecentUsers();
      await fetchUsers();
    };

    fetchUsersAndRecent(); // Fetch initial data

    const interval = setInterval(fetchUsersAndRecent, 5000); // Fetch recent users and users every 5 seconds

    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  //Request that list recent users (limit 5)
  const fetchRecentUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4444/account/recent');
      const { users } = response.data;
      setRecentUsers(users);
    } catch (error) {
      console.error('Error fetching recent users:', error);
    }
  };

  //Request that list all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4444/account/list');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  //Request handling user admin Yes/No
  const toggleAdmin = async (mail, admin) => {
    try {
      // Send a request to update the admin value for the user
      await axios.put('http://localhost:4444/account/update/admin', { mail, admin });
      // Fetch the recent users to update the list
      fetchUsers();
    } catch (error) {
      console.error('Error toggling admin:', error);
    }
  };

  //Function to select image from computer
  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
      }
    });
  };

  //Request handling Image import Client --> Server
  const handleImageUpload = async () => {

    //Handling errors/crashes when empty fields
    if(!imageUri && (changelog === null || changelog === '')) {
      setIsEmptyVersionChangelog(false);
      setIsEmptyVersionImage(false);
      setIsEmptyVersionFields(true);
      return;
    } else if (!imageUri) {
      setIsEmptyVersionChangelog(false);
      setIsEmptyVersionFields(false);
      setIsEmptyVersionImage(true);
      return;
    } else if (changelog === null || changelog === '') {
      setIsEmptyVersionFields(false);
      setIsEmptyVersionImage(false);
      setIsEmptyVersionChangelog(true);
      return;
    } else {
      resetErrors();
      setShowSuccessMessage(true);
    }

    try {
      const formData = new FormData();
  
      const selectedImage = await fetch(imageUri);
      const imageBlob = await selectedImage.blob(); //Retrieve image data as needed for the server

      formData.append('file', imageBlob, 'image.jpg');

      const response = await axios.post('http://localhost:4444/upload', formData);
      if (response.status === 200) {
        console.log('File uploaded successfully');
        insertVersionData(changelog, response.data.filename); // Pass the filename to insertVersionData
        setImageUri(null); // Reset imageUri field to empty
        setChangelog(''); // Reset changelog field to empty
      } else {
        console.log('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  //Request that insert a new version in Db
  const insertVersionData = async (changelog, dev, image) => {
    try {
      const response = await axios.post(
        'http://localhost:4444/versions/insert',
        {
          changelog, 
          dev,
          image,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      
      if (response.status === 200) {
        console.log('Version data inserted successfully!');
      } else {
        console.log('Error inserting version data!');
      }
    } catch (error) {
      console.error('Error inserting version data:', error);
    }
  };

  return (
    <View style={[styles.background, styles.flexOne, styles.row]}>
      <View style={[styles.recentUsersContainer, styles.adminPanelContainerPos, styles.boxBackground, styles.boxShadow]}>
        <Text style={[styles.title, styles.bold, styles.white, styles.textAlign]}>Comptes récents</Text>
        <View style={styles.littleBr}>
          <View style={styles.divider} />
          {recentUsers.map((user) => (
            <View style={styles.mediumBr} key={user.id}>
              <Text style={[styles.white, styles.textAlign]}>{user.mail}</Text>
            </View>
          ))}
        </View>
        <View style={styles.mediumBr} />
      </View>
      <View style={[styles.handleAdminContainer, styles.adminPanelContainerPos, styles.boxBackground, styles.boxShadow]}>
        <Text style={[styles.title, styles.bold, styles.white, styles.textAlign]}>Gestion rôle admin</Text>
        <View style={styles.littleBr}>
          <View style={styles.divider} />
          {users.map((user) =>
            user.admin ? (
              <View style={[styles.mediumBr, styles.justifyContent]} key={user.mail}>
                <View style={[styles.row, styles.justifyContent]}>
                  <View style={{ width: '70%' }}>
                    <Text style={[styles.white, styles.textAlign]}>{user.mail}</Text>
                  </View>
                  <View style={[styles.verticalDivider, { marginHorizontal: '5%' }]} />
                  <View>
                    <TouchableOpacity onPress={() => toggleAdmin(user.mail, !user.admin)}>
                      <Text
                        style={[
                          styles.adminToggle,
                          styles.bold,
                          styles.textShadow,
                          user.admin ? [styles.adminToggleActive, styles.bold, styles.textShadow] : null,
                        ]}
                      >
                        {user.admin ? 'Yes' : 'No'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null
          )}
        </View>
        <View style={styles.littleBr} />
        <View style={styles.divider} />
        <View style={styles.littleBr} />
        {users.map((user) =>
          !user.admin ? (
            <View style={[styles.mediumBr, styles.justifyContent]} key={user.mail}>
              <View style={[styles.row, styles.justifyContent]}>
                <View style={{ width: '70%' }}>
                  <Text style={[styles.white, styles.textAlign]}>{user.mail}</Text>
                </View>
                <View style={[styles.verticalDivider, { marginHorizontal: '5%' }]} />
                <View>
                  <TouchableOpacity onPress={() => toggleAdmin(user.mail, !user.admin)}>
                    <Text
                      style={[
                        styles.adminToggle,
                        styles.bold,
                        styles.textShadow,
                        user.admin ? [styles.adminToggleActive, styles.bold, styles.textShadow] : null,
                      ]}
                    >
                      {user.admin ? 'Yes' : 'No'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null
        )}
        <View style={styles.br} />
      </View>
      <View style={[styles.insertVersionContainer, styles.adminPanelContainerPos, styles.boxBackground, styles.boxShadow]}>
        <View>
          <Text style={[styles.title, styles.bold, styles.white, styles.textAlign]}>Création de version</Text>
        </View>
        <View style={styles.littleBr} />
        <View style={styles.divider} />
        <View style={[styles.mediumBr, styles.justifyContent]} />
        <View style={[styles.versionEditorContainer, styles.alignItems, {flexDirection: 'column', justifyContent: 'center'}]}>
          <View style={[styles.editorSubView ,styles.row]}>
            <View style={[styles.versionChangelogEditor, styles.alignItems]}>
              <TextInput
                style={[styles.versionChangelogBox, styles.boxShadow, styles.white]}
                placeholder="La nouvelle version de la penalitybox améliore l'interface utilisateur"
                placeholderTextColor="black"
                multiline={true}
                value={changelog}
                onChangeText={(text) => setChangelog(text)}
              />
            </View>
            <View style={[styles.versionImageImport, styles.verticalAlign, styles.alignItems, styles.justifyContent]}>
                <TouchableOpacity style={[styles.alignItems, styles.justifyContent, styles.selectPos]} onPress={handleImagePicker}>
                  <Text style={[styles.green, styles.textShadow]}>Select Image</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.versionImagePreview, styles.justifyContent, styles.alignItems, styles.boxShadow]}>
              {imageUri && <Image source={{uri: imageUri}} style={styles.imagePreview} />}
            </View>
          </View>
          <Text style={[ [styles.bold, styles.textShadow, [
            isEmptyVersionFields ||
            isEmptyVersionImage ||
            isEmptyVersionChangelog ? [styles.red] : showSuccessMessage ? [styles.green] : null
          ]]]}>
            {isEmptyVersionFields 
              ? 'Veuillez mettre un changelog et une image'
              : isEmptyVersionImage
              ? 'Veuillez insérer une image'
              : isEmptyVersionChangelog
              ? 'Veuillez insérer un changelog'
              : showSuccessMessage
              ? 'Version insérée avec succès'
              : null}
          </Text>
          <View style={[styles.validateButton, styles.boxShadow, styles.justifyContent]}>
            <Button title="Valider" color="grey" onPress={handleImageUpload}/>
          </View>
        </View>
        <View style={styles.br} />
      </View>
    </View>
  );
}
