import React, { useEffect, useState } from 'react';
import { View, Text, Image, Picker, SafeAreaView, ScrollView} from 'react-native';
import ReactMarkdownDisplay from 'react-native-markdown-display';
import Footer from './footer';
import styles from '../styles/styles';
import { fetchVersions, fetchVersionData } from '../api/version';
import LegalInfo from './Legal';

export default function phoneVersions() {
    const [versions, setVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState('');
    const [date, setDate] = useState('');
    const [changelog, setChangelog] = useState('');
    const [developers, setDevelopers] = useState('');
    const [image, setImage] = useState(null);

    const [showLegalInfos, setShowLegalInfos] = useState(false);

    useEffect(() => {
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

    if(showLegalInfos) {
        return <LegalInfo setShowLegalInfos={setShowLegalInfos} />
    } else {
        return (
            <SafeAreaView style={[styles.background, styles.alignItems, styles.justifyContent, styles.phoneVersionContainer]}>
                <ScrollView>
                    <View>
                        <Text style={[styles.white, styles.bold, styles.title, styles.textAlignCenter]}>Version</Text>
                    </View>
                    <View style={[styles.versionPickerPos, styles.justifyContent]}>
                        <Picker
                        style={[styles.textAlignCenter, {marginRight: '40%', marginLeft: '40%'}]}
                        selectedValue={selectedVersion}
                        onValueChange={handleVersionChange}
                        >
                        {versions.map((version) => (
                            <Picker.Item key={version} label={version.toString()} value={version.toString()} />
                        ))}
                        </Picker>
                    </View>
                    <View style={{marginLeft: '5%', marginRight: '5%'}}>
                        <ReactMarkdownDisplay style={{ body: { color: 'white', fontSize: 16 } }}>{changelog}</ReactMarkdownDisplay>
                    </View>
                    <View style={styles.mediumBr} />
                    <View style={{marginLeft: '2%'}}>
                        <Text style={[styles.title, styles.bold, styles.white]}>Développeurs :</Text>
                        <ReactMarkdownDisplay style={{body: {color: 'white', fontSize: 16 } }}>{developers}</ReactMarkdownDisplay>
                    </View>
                    <View style={styles.br} />
                    <View style={[{marginLeft: '2%'}, styles.alignItems]}>
                        <View>
                            <Text style={[styles.white, styles.underline]}>Date de mise à jour :</Text>
                        </View>
                    <View>
                        <Text style={[styles.white, styles.bold, styles.justifyContent]}>{date}</Text>
                    </View>
                    </View>
                    <View style={styles.phoneDivider} />
                    <View style={[styles.alignItems, styles.justifyContent, {marginTop: '5%'}]}>
                        {image && <Image source={require(`../assets/versions/${image}`)} style={styles.versionLogo} />}
                    </View>
                    <View style={{marginTop: '30%'}}>
                        <Footer setShowLegalInfos={setShowLegalInfos} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}