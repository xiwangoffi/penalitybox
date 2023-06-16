import axios from 'axios';

export const handleImageUpload = async (imageUri, changelog, developers, setImageUri, setChangelog, setDevelopers) => {
    try {
      const formData = new FormData();
  
      const selectedImage = await fetch(imageUri);
      const imageBlob = await selectedImage.blob(); //Retrieve image data as needed for the server
  
      formData.append('file', imageBlob, 'image.jpg');
  
      const response = await axios.post('http://localhost:4444/upload', formData);
      if (response.status === 200) {
        console.log('File uploaded successfully');
        await insertVersionData(changelog, developers, response.data.filename);
        //insertVersionData(changelog, developers, response.data.filename);
        setImageUri(null); // Reset imageUri field to empty
        setChangelog(''); // Reset changelog field to empty
        setDevelopers(''); // Reset developeur field to empty
      } else {
        console.log('Error uploading file');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };
  
  export const insertVersionData = async (changelog, dev, image) => {
    try {
        const response = await axios.post(
            'http://localhost:4444/versions/insert',
            {
              changelog,
              dev,
              image,
            },
            {
              headers: {
                'Content-Type': 'application/json',
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

  export const fetchVersions = async () => {
    try {
      const response = await axios.get('http://localhost:4444/versions');
      return response.data.versions;
    } catch (error) {
      console.error('Error fetching versions:', error);
      return [];
    }
  };
  
  export const fetchVersionData = async (version) => {
    try {
      const [dateResponse, changelogResponse, imageResponse, developerResponse] = await Promise.all([
        axios.get(`http://localhost:4444/versions/date/${version}`),
        axios.get(`http://localhost:4444/versions/changelog/${version}`),
        axios.get(`http://localhost:4444/versions/image/${version}`),
        axios.get(`http://localhost:4444/versions/developer/${version}`),
      ]);
  
      const { date } = dateResponse.data;
      const { changelog } = changelogResponse.data;
      const { image } = imageResponse.data;
      const { dev } = developerResponse.data;      
  
      return { date, changelog, dev, image };
    } catch (error) {
      console.error('Error fetching version data:', error);
      return {};
    }
  };

  export const updateVersionData = async (version, data) => {
    try {
      const response = await axios.put(`http://localhost:4444/versions/update/${version}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating version data:', error);
      throw error;
    }
  };
  
  