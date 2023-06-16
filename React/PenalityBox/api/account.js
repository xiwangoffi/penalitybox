import axios from 'axios';

  //Request that list recent users (limit 5)
  export const fetchRecentUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4444/account/recent');
      return response.data.users;
    } catch (error) {
      console.error('Error fetching recent users:', error);
      return [];
    }
  };

  //Request that list all users
  export const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:4444/account/list');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  export const updateAdmin = async (mail, admin) => {
    try {
      await axios.put('http://localhost:4444/account/update/admin', { mail, admin });
      const updatedUsers = await fetchUsers(); // Fetch the updated list of users
      return updatedUsers;
    } catch (error) {
      console.error('Error toggling admin:', error);
      return []; // Return an empty array in case of an error
    }
  };
