import * as React from 'react';
import { View, ScrollView, Text, SafeAreaView } from 'react-native';
import Footer from '../../components/footer';
import styles from '../../styles/styles';

export default function AppScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.flexOne}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={[styles.textContainer, styles.alignItems]}>
            <View style={{backgroundColor: 'yellow', width: '100%', height: '10%'}}>

            </View>
        </View>
        <View style={styles.footerWrapper}>
          <Footer navigation={navigation} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
