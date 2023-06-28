import * as React from 'react';
import { View, Text, Alert } from 'react-native';
import styles from '../styles/styles';

export default function phoneHome() {
    return (
        <View style={{backgroundColor: 'yellow', height: '100%', width: '100%'}}>
          <Text style={[styles.textAlignCenter, styles.bold, {fontSize: 26}]}>
            La PenalityBox
          </Text>
        </View>
      );
}