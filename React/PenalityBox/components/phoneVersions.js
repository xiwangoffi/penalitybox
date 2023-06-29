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

    return (
        <SafeAreaView style={[styles.background, styles.alignItems, styles.justifyContent]}>
            <ScrollView>

            </ScrollView>
        </SafeAreaView>
    );
}