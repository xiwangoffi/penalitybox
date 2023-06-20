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
  
  export const deleteImage = image => {
    axios
      .delete('http://localhost:4444/delete/image', { data: { image: image } })
      .then(response => {
        console.log(response.data); // Image deleted successfully!
        // Additional logic or state updates after successful deletion
      })
      .catch(error => {
        console.error(error);
        // Handle error
      });
  };

  // Function to perform the update request
  export const performUpdate = (versionNumber, updateData) => {
    console.log('Just before performing update, check versionNumber and updateData');
    console.log('versionNumber: ', versionNumber);
    console.log('updateData: ', updateData);
    axios
      .put(`http://localhost:4444/versions/update/${versionNumber}`, updateData)
      .then(response => {
        console.log(response.data); // Version data updated successfully!
        // Additional logic or state updates after successful update
      })
      .catch(error => {
        console.error(error);
        // Handle error during version update
      });
  };
  
  export const updateVersion = (versionNumber, changelog, dev, image) => {
    const updateData = {
      changelog: changelog,
      ...(dev && { dev }),
      ...(image && { image }),
    };
  
    console.log('Check dev value: ', dev);
    console.log('Check changelog value: ', changelog);
    console.log('Check image value: ', image);
    // Check if a new image is submitted
    if (image) {
      // Retrieve the previous image for deletion
      axios
        .get(`http://localhost:4444/versions/${versionNumber}`)
        .then(response => {
          const previousImage = response.data.image;
  
          // Delete the previous image
          deleteImage(previousImage)
            .then(() => {
              // Update the version data
              console.log('Delete image supposed to happens here');
              performUpdate(versionNumber, updateData);
            })
            .catch(error => {
              console.log('Error deleting image');
              console.error(error);
              // Handle error during image deletion
            });
        })
        .catch(error => {
          console.log('Error server response');
          console.error(error);
          // Handle error retrieving previous image
        });
    } else {
      console.log('Classic update insert');
      // No new image, perform the update directly
      performUpdate(versionNumber, updateData);
    }
  };