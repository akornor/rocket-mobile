import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import defaultNavigationOptions from '../navigation/defaultNavOptions';

export default class Coupon extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'COUPON',
      ...defaultNavigationOptions,
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus
          style={styles.textInput}
          placeholder="Enter coupon code"
          maxLength={10}
          keyboardType="phone-pad"
        />
        <Button
          title="REDEEM"
          onPress={() => {}}
          buttonStyle={styles.button}
          titleStyle={styles.title}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    paddingTop: 30,
    paddingHorizontal: 10,
  },
  textInput: {
    height: 40,
    backgroundColor: 'white',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#EA0000',
    borderRadius: 5,
    padding: 3,
  },
  title: {
    fontWeight: 'bold',
  },
});
