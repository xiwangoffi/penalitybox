import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import styles from '../../styles/styles';

export default function AdminScreen({ navigation }) {
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    fetchRecentUsers();
    const interval = setInterval(fetchRecentUsers, 5000); // Fetch recent users every 5 seconds

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

  const toggleAdmin = async (mail, admin) => {
    try {
      // Send a request to update the admin value for the user
      await axios.put('http://localhost:4444/account/update/admin', { mail, admin });
      // Fetch the recent users to update the list
      fetchRecentUsers();
    } catch (error) {
      console.error('Error toggling admin:', error);
    }
  };

  return (
    <View style={[styles.background, styles.flexOne, styles.row]}>
      <View style={[styles.recentUsersContainer, styles.boxShadow]}>
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
      <View style={[styles.recentUsersContainer, styles.boxShadow]}>
        <Text style={[styles.title, styles.bold, styles.white, styles.textAlign]}>Gestion rôle admin</Text>
        <View style={styles.littleBr}>
          <View style={styles.divider} />
          {recentUsers.map((user) => (
            <View style={[styles.mediumBr, styles.row, styles.justifyContent]}>
                <View style={[styles.row, styles.justifyContent]} key={user.id}>
                  <View>
                    <Text style={[styles.white, styles.textAlign]}>{user.mail}</Text>
                  </View>
                  <View style={[styles.verticalDivider, {marginHorizontal: '5%'}]}/>
                  <View>
                    <TouchableOpacity
                      onPress={() => toggleAdmin(user.mail, !user.admin)}
                    >
                      <Text style={[
                        styles.adminToggle, 
                        styles.bold, 
                        styles.textShadow, 
                        user.admin 
                        ? [styles.adminToggleActive, styles.bold, styles.textShadow] : null]}>{user.admin ? 'Yes' : 'No'}</Text>
                    </TouchableOpacity>
                  </View>
                </View>
          </View>
        ))}
        </View>
      </View>
    </View>
  );
}
