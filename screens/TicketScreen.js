import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import defaultNavigationOptions from '../navigation/defaultNavOptions';
import QRCode from 'react-native-qrcode';

export default class TicketScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      ...defaultNavigationOptions,
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.qrContainer}>
          <QRCode value="vPb0wxHyb7bQ" size={260} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  qrContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
