import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import defaultNavigationOptions from '../navigation/defaultNavOptions';

export default class PaymentOptionScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'PAYMENT OPTION',
      ...defaultNavigationOptions,
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <Button
            title="PAY WITH MOBILE MONEY"
            onPress={() => {
              this.props.navigation.navigate('MobileMoney');
            }}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
          />
          <Button
            title="USE COUPON"
            onPress={() => {
              this.props.navigation.navigate('Coupon');
            }}
            buttonStyle={styles.buttonStyle}
            titleStyle={styles.titleStyle}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    padding: 10,
  },
  titleStyle: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
  buttonStyle: {
    borderRadius: 5,
    backgroundColor: '#EA0000',
    paddingVertical: 10,
    marginVertical: 10,
    width: 300,
  },
  buttonContainer: {
    // alignContent: 'flex-start',
    // flexDirection: 'row'
  },
});
