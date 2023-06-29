import React, { useState, useEffect } from 'react';
import ReactMarkdownDisplay from 'react-native-markdown-display';
import { View, Text, Image, Dimensions, Picker } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';
import { fetchVersions, fetchVersionData } from '../../api/version'; // Import the updated functions
import LegalInfo from '../../components/Legal';
import PhoneVersions from '../../components/phoneVersions';

const windowDimensions = Dimensions.get('window');
const screenDimensions = Dimensions.get('screen');

export default function VersionScreen() {
  const [dimensions, setDimensions] = useState({
    window: windowDimensions,
    screen: screenDimensions,
  });
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [date, setDate] = useState('');
  const [changelog, setChangelog] = useState('');
  const [developers, setDevelopers] = useState('');
  const [image, setImage] = useState(null);

  const [showLegalInfos, setShowLegalInfos] = useState(false);

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setDimensions({ window, screen });
    });

    fetchVersionsData();
  }, []);

  const fetchVersionsData = async () => {
    const versionsData = await fetchVersions();
    setVersions(versionsData);

    if (versionsData.length === 0) {
      setSelectedVersion('');
      setDate('');
      setChangelog('');
      setDevelopers('');
      setImage(null);
    } else if (!selectedVersion && versionsData.length > 0) {
      const defaultVersion = versionsData[versionsData.length - 1].toString();
      setSelectedVersion(defaultVersion);
      handleVersionChange(defaultVersion);
    } else if (selectedVersion && !versionsData.includes(selectedVersion)) {
      setSelectedVersion('');
      setDate('');
      setChangelog('');
      setDevelopers('');
      setImage(null);
    }
  };
  
  const handleVersionChange = async (version) => {
    setSelectedVersion(version);

    const versionData = await fetchVersionData(version);
    const { date, changelog, image, dev } = versionData;
    setDate(date);
    setChangelog(changelog);
    setImage(image);
    setDevelopers(dev);
  };

  if (dimensions.window.height >= dimensions.screen.width) {
    return (
      <PhoneVersions />
    );
  } else if (showLegalInfos){
    return <LegalInfo setShowLegalInfos={setShowLegalInfos} />
  } else {
    return (
      <View style={[styles.background, styles.alignItems, styles.justifyContent]}>
        <View style={[styles.versionContainer, styles.boxShadow, {marginBottom: '4%'}]}>
          <View style={styles.versionTextContainer}>
            <View style={[styles.versionNumberContainer]}>
              <View style={styles.justifyContent}>
                <Text style={[styles.white, styles.bold, styles.title]}>Version</Text>
              </View>
              <View style={[styles.versionPickerPos, styles.justifyContent]}>
                <Picker
                  selectedValue={selectedVersion}
                  onValueChange={handleVersionChange}
                >
                  {versions.map((version) => (
                    <Picker.Item key={version} label={version.toString()} value={version.toString()} />
                  ))}
                </Picker>
              </View>
            </View>
            <View style={styles.versionChangelogContainer}>
              <ReactMarkdownDisplay style={{ body: { color: 'white', fontSize: 16 } }}>{changelog}</ReactMarkdownDisplay>
            </View>
            <View style={styles.versionDeveloperContainer}>
              <Text style={[styles.title, styles.bold, styles.white]}>Développeurs :</Text>
              <ReactMarkdownDisplay style={{body: {color: 'white', fontSize: 16 } }}>{developers}</ReactMarkdownDisplay>
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
          <View style={[styles.versionImageContainer, styles.alignItems, styles.justifyContent]}>
            {image && <Image source={require(`../../assets/versions/${image}`)} style={styles.versionLogo} />}
          </View>
        </View>
        <Footer setShowLegalInfos={setShowLegalInfos} />
      </View>
    );
  }
}
