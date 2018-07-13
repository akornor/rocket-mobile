import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import defaultNavigationOptions from '../navigation/defaultNavOptions';

export default class MobileMoneyScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'MOBILE MONEY',
      ...defaultNavigationOptions,
    };
  };
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          autoFocus
          style={styles.textInput}
          placeholder="Enter phone number"
          maxLength={10}
          keyboardType="phone-pad"
        />
        <Button
          title="BUY"
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
