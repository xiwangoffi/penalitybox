import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native';
import axios from 'axios';
import styles from '../../styles/styles';
import { launchImageLibrary } from 'react-native-image-picker';

export default function AdminScreen({ navigation }) {
  const [recentUsers, setRecentUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  const [changelog, setChangelog] = useState('');

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

  useEffect(() => {
    if (imageUri) {
      handleImageUpload();
    }
  }, [imageUri]);

  const fetchRecentUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4444/account/recent');
      const { users } = response.data;
      setRecentUsers(users);
    } catch (error) {
      console.error('Error fetching recent users:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4444/account/list');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

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

  const handleImageUpload = async () => {
    try {
      const formData = new FormData();
  
      if (imageUri) {
        const selectedImage = await fetch(imageUri);
        const imageBlob = await selectedImage.blob();
  
        formData.append('file', imageBlob, 'image.jpg');
  
        const response = await axios.post('http://localhost:4444/upload', formData);
        if (response.status === 200) {
          console.log('File uploaded successfully');
          insertVersionData(changelog, response.data.filename); // Pass the filename to insertVersionData
        } else {
          console.log('Error uploading file');
        }
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const insertVersionData = async (changelog, image) => {
    try {
      const response = await axios.post(
        'http://localhost:4444/versions/insert',
        {
          changelog, 
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
        <View style={[styles.versionEditorContainer, styles.row]}>
          <View style={[styles.versionChangelogEditor, styles.alignItems]}>
            <TextInput
              style={styles.versionChangelogBox}
              multiline={true}
              value={changelog}
              onChangeText={(text) => setChangelog(text)}
            />
          </View>
          <View style={styles.versionImageImport}>
          {imageUri && <Image source={{ uri: imageUri }} style={styles.penalityLogo} />}
            <TouchableOpacity onPress={handleImagePicker}>
              <Text style={styles.green}>Select Image</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.br} />
      </View>
    </View>
  );
}
