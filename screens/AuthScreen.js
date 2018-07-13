import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { Facebook } from 'expo';
import { SocialIcon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import firebase from '../firebase';

class AuthScreen extends Component {
  state = {
    isLoading: true,
    buttonLoading: false,
  };

  _signInAsync = async () => {
    let { token, type } = await Facebook.logInWithReadPermissionsAsync('1857060311217598', {
      permissions: ['public_profile', 'email'],
    });
    console.log(token, type); //eslint-disable-line
    if (type === 'cancel') {
      console.log(type);
      Alert.alert(
      'Error',
      'Authentication Failed. Try again.',
      [
        {text: 'Okay', onPress: () => {}, style: 'cancel'},
      ],
      { cancelable: false }
      )
      return;
    }
    const credential = firebase.auth.FacebookAuthProvider.credential(token);
    firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        // Handle Errors here.
        console.log(error);
      });
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.container}>
        <SocialIcon
          title="SIGN IN WITH FACEBOOK"
          button
          loading={this.state.buttonLoading}
          type="facebook"
          style={styles.button}
          onPress={this._signInAsync}
          style={{ borderRadius: 5 }}
          fontWeight="700"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black',
    flexDirection: 'column',
  },
  button: {
    alignContent: 'center',
  },
});

export default AuthScreen;
