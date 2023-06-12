import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, Button } from 'react-native';
import axios from 'axios';
import styles from '../../styles/styles';
import { launchImageLibrary } from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';

export default function AdminScreen({ navigation }) {
  const [recentUsers, setRecentUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [imageUri, setImageUri] = useState(null);

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
  }
  

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

  const insertVersionData = async (version, changelog, image) => {
  
    try {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const versionDate = year + "-" + month + "-" + day;
  
      const versionData = {
        version: version,
        changelog: changelog,
        date: versionDate,
        image: image.uri
      };
  
      const response = await axios.post('http://localhost:4444/versions/insert', versionData);
      if (response.status === 200) {
        console.log('Version data inserted successfully!');
      } else {
        console.log('Error inserting version data!');
      }
    } catch (error) {
      console.error('Error inserting version data:', error);
    }
  };

  const handleImagePicker = () => {
    const options = {
      mediaType: 'photo', // Specify the media type as photo
      quality: 1, // Set the image quality (0 to 1)
    };
  
    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error:', response.error);
      } else if (response.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        setImageUri(selectedImage.uri);
        // Call function to upload the image to the server
        uploadImage(selectedImage);
      }
    });
  };

  const uploadImage = async (selectedImage) => {
    const imageUri = selectedImage.uri;

    RNFetchBlob.fetch('POST', 'http://localhost:4444/upload', {
      'Content-Type': 'multipart/form-data',
    }, [
      {
        name: 'image',
        filename: selectedImage.fileName || 'image.jpg',
        data: RNFetchBlob.wrap(imageUri),
      },
    ])
      .then((res) => {
        console.log('Image uploaded:', res.data);
      })
      .catch((error) => {
        console.error('Error uploading image:', error);
      });
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
      </View>
      <View style={[styles.handleAdminContainer, styles.adminPanelContainerPos, styles.boxBackground, styles.boxShadow]}>
        <Text style={[styles.title, styles.bold, styles.white, styles.textAlign]}>Gestion rôle admin</Text>
        <View style={styles.littleBr}>
          <View style={styles.divider} />
          {users.map((user) => (
            user.admin ? (
              <View style={[styles.mediumBr, styles.justifyContent]} key={user.mail}>
                <View style={[styles.row, styles.justifyContent]}>
                  <View style={{ width: '70%' }}>
                    <Text style={[styles.white, styles.textAlign]}>{user.mail}</Text>
                  </View>
                  <View style={[styles.verticalDivider, { marginHorizontal: '5%' }]} />
                  <View>
                    <TouchableOpacity onPress={() => toggleAdmin(user.mail, !user.admin)}>
                      <Text style={[
                        styles.adminToggle,
                        styles.bold,
                        styles.textShadow,
                        user.admin ? [styles.adminToggleActive, styles.bold, styles.textShadow] : null]}>{user.admin ? 'Yes' : 'No'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ) : null
          ))}
        </View>
        <View style={styles.littleBr} />
        <View style={styles.divider} />
        <View style={styles.littleBr} />
        {users.map((user) => (
          !user.admin ? (
            <View style={[styles.mediumBr, styles.justifyContent]} key={user.mail}>
              <View style={[styles.row, styles.justifyContent]}>
                <View style={{ width: '70%' }}>
                  <Text style={[styles.white, styles.textAlign]}>{user.mail}</Text>
                </View>
                <View style={[styles.verticalDivider, { marginHorizontal: '5%' }]} />
                <View>
                  <TouchableOpacity onPress={() => toggleAdmin(user.mail, !user.admin)}>
                    <Text style={[
                      styles.adminToggle,
                      styles.bold,
                      styles.textShadow,
                      user.admin ? [styles.adminToggleActive, styles.bold, styles.textShadow] : null]}>{user.admin ? 'Yes' : 'No'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : null
        ))}
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
            <TextInput style={styles.versionChangelogBox} multiline={true} />
          </View>
          <View style={styles.versionImageImport}>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}
            <Button title="Select Image" onPress={handleImagePicker} />
          </View>
        </View>
        <View style={styles.br} />
      </View>
    </View>
  );
}
