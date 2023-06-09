import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import axios from 'axios';
import styles from '../../styles/styles';

export default function AdminScreen({ navigation }) {
  const [recentUsers, setRecentUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const [isVersionNotProvided, setIsVersionNotProvided] = useState(false);
  const [isChangelogNotProvided, setIsChangelogNotProvided] = useState(false);
  const [isNoneProvided, setIsNoneProvided] = useState(false);

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
    if (!version && !changelog) {
      setIsVersionNotProvided(false);
      setIsChangelogNotProvided(false);
      setIsNoneProvided(true);
      return;
    } else if (!version) {
      setIsChangelogNotProvided(false);
      setIsNoneProvided(false);
      setIsVersionNotProvided(true);
      return;
    } else if (!changelog) {
      setIsVersionNotProvided(false);
      setIsNoneProvided(false)
      setIsChangelogNotProvided(true);
      return;
    }
  
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
        image: image
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
          <View style={styles.versionChangelogEditor}>

          </View>
          <View style={styles.versionImageImport}>

          </View>
        </View>
        <View style={styles.br} />
      </View>
    </View>
  );
}
