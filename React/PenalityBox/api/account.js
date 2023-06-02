import axios from 'axios';

export const getAllAccounts = async () => {
  try {
    const response = await axios.get('http://localhost:4444/account/list');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des comptes :', error.message);
    throw error;
  }
};
