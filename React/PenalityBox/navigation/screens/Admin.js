import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Button, Picker } from 'react-native';
import styles from '../../styles/styles';
import { launchImageLibrary } from 'react-native-image-picker';
import { fetchRecentUsers, fetchUsers, updateAdmin } from '../../api/account';
import { handleImageUpload, fetchVersions, fetchVersionData, updateVersion } from '../../api/version';

export default function AdminScreen({ navigation }) {

  //Handling accounts states
  const [recentUsers, setRecentUsers] = useState([]);
  const [users, setUsers] = useState([]);

  //Handling insert version database fields
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [selectedVersionData, setSelectedVersionData] = useState(null);
  const [versionNumbers, setVersionNumbers] = useState([]);

  const [imageUri, setImageUri] = useState(null);
  const [changelog, setChangelog] = useState('');
  const [developers, setDevelopers] = useState('');

  const [isUpdate, setIsUpdate] = useState(false);

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
  };

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
    const fetchData = async () => {
      const recentUsers = await fetchRecentUsers();
      setRecentUsers(recentUsers);
      const users = await fetchUsers();
      setUsers(users);
  
      const versions = await fetchVersions(); // Fetch the versions
      setVersionNumbers(versions);
    };
  
    fetchData(); // Fetch initial data
  
    const interval = setInterval(fetchData, 5000); // Fetch recent users, users, and versions every 5 seconds
  
    return () => {
      clearInterval(interval); // Clear the interval when the component unmounts
    };
  }, []);

  // Fetch version fields values
  useEffect(() => {
    if (selectedVersion) {
      const fetchSelectedVersionData = async () => {
        const data = await fetchVersionData(selectedVersion);
        setSelectedVersionData(data);
      };

      fetchSelectedVersionData();
    }
  }, [selectedVersion]);
  
  

  //Request handling user admin Yes/No
  const toggleAdmin = async (mail, admin) => {
    try {
      await updateAdmin(mail, admin); // Call the updateAdmin function from api.js
      const updatedUsers = await fetchUsers(); // Fetch the updated list of users
      setUsers(updatedUsers);
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

  // Request handling Image import Client --> Server
  const handleImageUploadWrapper = async () => {
    if (!imageUri && (changelog === null || changelog === '') && (developers === null || developers === '')) {
      setIsEmptyVersionChangelog(false);
      setIsEmptyVersionImage(false);
      setIsEmptyVersionDevelopers(false);
      setIsEmptyVersionFields(true);
      return;
    } else if (!imageUri) {
      setIsEmptyVersionChangelog(false);
      setIsEmptyVersionFields(false);
      setIsEmptyVersionDevelopers(false);
      setIsEmptyVersionImage(true);
      return;
    } else if (changelog === null || changelog === '') {
      setIsEmptyVersionFields(false);
      setIsEmptyVersionImage(false);
      setIsEmptyVersionDevelopers(false);
      setIsEmptyVersionChangelog(true);
      return;
    } else if (developers === null || developers === '') {
      setIsEmptyVersionChangelog(false);
      setIsEmptyVersionFields(false);
      setIsEmptyVersionImage(false);
      setIsEmptyVersionDevelopers(true);
      return;
    } else {
      resetErrors();
      setShowSuccessMessage(true);
    }
  
    await handleImageUpload(imageUri, changelog, developers, setImageUri, setChangelog, setDevelopers);
  };
  
  const handlePickerChange = (value) => {
    setIsUpdate(value);
    setImageUri(null);
    if (value === 'Update' && versionNumbers.length > 0) {
      setSelectedVersion(versionNumbers[0].toString());
    } else {
      setSelectedVersion(null);
      setSelectedVersionData(null);
    }
  };

  const handleUpdateVersionData = async () => {
    if (!selectedVersion || !selectedVersionData) {
      return;
    }
  
    try {
      const data = {
        changelog: selectedVersionData.changelog,
        dev: selectedVersionData.dev,
        image: imageUri, // Add the image URI to the data object
      };
  
      console.log('Data (before calling updateVersion): ', data);
      await updateVersion(selectedVersion, data);
      // Handle success or perform any additional actions
      console.log('Version data updated successfully');
  
    } catch (error) {
      console.error('Error updating version data:', error);
      // Handle error or show error message
    }
  };
  

  return (
    <View style={[styles.background, styles.flexOne, styles.row, styles.alignItems, styles.justifyContent]}>
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
      <View style={[styles.insertVersionContainer, styles.adminPanelContainerPos, styles.boxBackground, styles.boxShadow]}>
        <View>
          <Text style={[styles.title, styles.bold, styles.white, styles.textAlign]}>Gestion version</Text>
        </View>
        <View style={styles.littleBr} />
        <View style={styles.divider} />
        <View style={[styles.justifyContent, styles.row]}>
          <View>
            <Picker
              style={[styles.title, styles.bold, styles.textAlign]}
              selectedValue={isUpdate}
              onValueChange={handlePickerChange}
            >
              <Picker.Item label="Créer" value="Créer" />
              <Picker.Item label="Update" value="Update" />
            </Picker>
            {isUpdate === 'Update' && (
              <Picker
                style={[styles.title, styles.bold, styles.textAlign]}
                selectedValue={selectedVersion}
                onValueChange={(value) => setSelectedVersion(value)}
              >
                {versionNumbers.map((version) => (
                  <Picker.Item key={version} label={version.toString()} value={version.toString()} />
                ))}
              </Picker>
            )}
          </View>
        </View>
        <View style={[styles.mediumBr, styles.justifyContent]} />
        <View style={[styles.versionEditorContainer, styles.alignItems, {flexDirection: 'column', justifyContent: 'center'}]}>
          <View style={[styles.editorSubView ,styles.row]}>
            <View style={[styles.versionChangelogEditor, styles.alignItems]}>
              {isUpdate === 'Update' ?
              <View style={{ width: '100%', height: '100%' }}>
                <TextInput
                  style={[styles.versionChangelogBox, styles.boxShadow, styles.white]}
                  placeholder="La nouvelle version de la penalitybox améliore l'interface utilisateur"
                  placeholderTextColor="black"
                  multiline={true}
                  value={selectedVersionData ? selectedVersionData.changelog : ''}
                  onChangeText={(text) => setSelectedVersionData({ ...selectedVersionData, changelog: text })}
                />
                <View style={styles.littleBr} />
                <TextInput
                  style={[styles.versionDevBox, styles.boxShadow, styles.white]}
                  placeholder="Développeur site internet : BOISSEAU Romain"
                  placeholderTextColor="black"
                  multiline={true}
                  value={selectedVersionData ? selectedVersionData.dev : ''}
                  onChangeText={(text) => setSelectedVersionData({ ...selectedVersionData, dev: text })}
                />
              </View>
              :
                <View style={{width: '100%', height: '100%'}}>
                  <TextInput
                    style={[styles.versionChangelogBox, styles.boxShadow, styles.white]}
                    placeholder="La nouvelle version de la penalitybox améliore l'interface utilisateur"
                    placeholderTextColor="black"
                    multiline={true}
                    value={changelog}
                    onChangeText={(text) => setChangelog(text)}
                  />
                  <View style={styles.littleBr} />
                  <TextInput
                    style={[styles.versionDevBox, styles.boxShadow, styles.white]}
                    placeholder="Développeur site internet : BOISSEAU Romain"
                    placeholderTextColor="black"
                    multiline={true}
                    value={developers}
                    onChangeText={(text) => setDevelopers(text)}
                  />
                </View>
              }
            </View>
            <View style={[styles.versionImageImport, styles.verticalAlign, styles.alignItems, styles.justifyContent]}>
              <TouchableOpacity style={[styles.alignItems, styles.justifyContent, styles.selectPos]} onPress={handleImagePicker}>
                <Text style={[styles.green, styles.textShadow]}>Select Image</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.versionImagePreview, styles.justifyContent, styles.alignItems, styles.boxShadow]}>
              {isUpdate === 'Update' && selectedVersionData && selectedVersionData.image ? (
                imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                ) : (
                  <Image source={require(`../../assets/versions/${selectedVersionData.image}`)} style={styles.imagePreview} />
                )
              ) : (
                <Image source={{ uri: imageUri }} style={styles.imagePreview} />
              )}
            </View>
          </View>
          <Text style={[ [styles.bold, styles.textShadow, [
            isEmptyVersionFields ||
            isEmptyVersionImage ||
            isEmptyVersionChangelog ||
            isEmptyVersionDevelopers ? [styles.red] : showSuccessMessage ? [styles.green] : null
          ]]]}>
            {isEmptyVersionFields 
              ? 'Veuillez mettre un changelog, développeurs et une image'
              : isEmptyVersionImage
              ? 'Veuillez insérer une image'
              : isEmptyVersionChangelog
              ? 'Veuillez insérer un changelog'
              : isEmptyVersionDevelopers
              ? 'Veuillez insérer des développeurs'
              : showSuccessMessage
              ? 'Version insérée avec succès'
              : null}
          </Text>
          <View style={[styles.validateButton, styles.boxShadow, styles.justifyContent]}>
            <Button title="Valider" color="grey" onPress={isUpdate === 'Update' ? handleUpdateVersionData : handleImageUploadWrapper} />
          </View>
        </View>
        <View style={styles.littleBr} />
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
    </View>
  );
}
