import React, { useState, useEffect } from 'react';
import ReactMarkdownDisplay from 'react-native-markdown-display';
import { View, Text, Image, Dimensions, Picker } from 'react-native';
import axios from 'axios';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function VersionScreen({ navigation }) {
    const [dimensions, setDimensions] = useState({
      window: windowDimensions,
      screen: screenDimensions,
    });
    const [versions, setVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState('');
    const [date, setDate] = useState('');
    const [changelog, setChangelog] = useState('');
    const [image, setImage] = useState(null);
  
    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
          setDimensions({ window, screen });
        });
      
        fetchVersions();
        const interval = setInterval(fetchVersions, 5000); // Fetch versions every 5 seconds
      
        return () => {
          subscription?.remove();
          clearInterval(interval);
        };
    }, [selectedVersion]);
      
    const fetchVersions = async () => {
        try {
            const response = await axios.get('http://localhost:4444/versions');
            const versionsData = response.data.versions;
        
            setVersions(versionsData);
        
            if (!selectedVersion && versionsData.length > 0) {
            const defaultVersion = versionsData[versionsData.length - 1].toString();
            setSelectedVersion(defaultVersion);
            handleVersionChange(defaultVersion);
            }
        } catch (error) {
            console.error('Error fetching versions:', error);
        }
    };
      
  
    const handleVersionChange = (version) => {
      setSelectedVersion(version);
    };
  
    useEffect(() => {
      if (selectedVersion) {
        fetchVersionData(selectedVersion);
      }
    }, [selectedVersion]);
  
    const fetchVersionData = async (version) => {
      try {
        const [dateResponse, changelogResponse, imageResponse] = await Promise.all([
           axios.get(`http://localhost:4444/versions/date/${version}`),
           axios.get(`http://localhost:4444/versions/changelog/${version}`),
           axios.get(`http://localhost:4444/versions/image/${version}`),
        ]);

        const { date } = dateResponse.data;
        const { changelog } = changelogResponse.data;
        const { image } = imageResponse.data;


        setDate(date);
        setChangelog(changelog);
        setImage(image);
      } catch (error) {
        console.error('Error fetching version data:', error);
      }
    };
  

  if (dimensions.window.height >= dimensions.screen.width) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 26, fontWeight: 'bold' }}>Version Screen</Text>
      </View>
    );
  } else {
    return (
      <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
        <View style={[styles.versionContainer, styles.boxShadow]}>
          <View style={styles.versionTextContainer}>
            <View style={[styles.versionNumberContainer]}>
              <View style={styles.justifyContent}>
                <Text style={[styles.white, styles.bold, styles.title]}>Version</Text>
              </View>
              <View style={[styles.versionPickerPos, styles.justifyContent]}>
                <Picker
                  selectedValue={selectedVersion}
                  onValueChange={(version) => handleVersionChange(version)}
                >
                  {versions.map((version) => (
                    <Picker.Item key={version} label={version.toString()} value={version.toString()} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.versionChangelogContainer}>
              <ReactMarkdownDisplay style={{body: {color: 'white'}}}>{changelog}</ReactMarkdownDisplay>
            </View>
            <View style={styles.versionDateContainer}>
                <View>
                    <Text style={[styles.white, styles.underline]}>Date de mise à jour :</Text>
                </View>
                <View>
                    <Text style={[styles.white, styles.bold, styles.justifyContent]}>{date}</Text>
                </View>
            </View>
          </View>
          <View style={styles.versionImageContainer}>
            {image && <Image source={require(`../../assets/versions/${image}`)} style={styles.penalityLogo} />}
          </View>
        </View>
        <Footer navigation={navigation} />
      </View>
    );
  }
}
