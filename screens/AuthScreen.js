import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage, Alert } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { Facebook } from 'expo';
import { SocialIcon } from 'react-native-elements';
import firebase from '../firebase';
import Sentry from 'sentry-expo';

export default class AuthScreen extends Component {
  state = {
    isLoading: true,
    buttonLoading: false,
  };

  _signInWithGoogleAsync = async () => {
    try {
      const result = await Expo.Google.logInAsync({
        androidClientId: 'YOUR_CLIENT_ID_HERE',
        iosClientId: '858038913404-0hdl6mcdjin08ue5ub9op3jc601pk5du.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        let { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(idToken, accessToken);
        try {
          firebase.auth().signInWithCredential(credential);
          this.props.navigation.navigate('Home');
        } catch (e) {
          console.log(e);
          Sentry.captureException(e);
        }
      }
    } catch (e) {
      console.log(e);
      Sentry.captureException(e);
    }
  };

  _signInWithFacebookAsync = async () => {
    try {
      let { token, type } = await Facebook.logInWithReadPermissionsAsync('1857060311217598', {
        permissions: ['public_profile', 'email'],
      });
      console.log(token, type); //eslint-disable-line
      if (type === 'cancel') {
        console.log(type); //eslint-disable-line
        return;
      }

      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      try {
        firebase.auth().signInWithCredential(credential);
        this.props.navigation.navigate('Home');
      } catch (e) {
        console.log(e);
        Sentry.captureException(error);
      }
    } catch (e) {
      console.log(e);
      Sentry.captureException(error);
      Alert.alert(
        'Error',
        'Authentication Failed. Try again.',
        [{ text: 'Okay', onPress: () => {}, style: 'cancel' }],
        { cancelable: false },
      );
    }
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
          onPress={this._signInWithFacebookAsync}
          fontWeight="700"
        />
        <SocialIcon
          title="SIGN IN WITH GOOGLE"
          button
          loading={this.state.buttonLoading}
          type="google"
          style={styles.button}
          onPress={this._signInWithGoogleAsync}
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
    borderRadius: 5,
  },
});
