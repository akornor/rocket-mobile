/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { AppLoading, Asset, Font, Icon } from 'expo';
import { Platform, View } from 'react-native';
import Sentry from 'sentry-expo';
import { Provider } from 'react-redux';
import store from './state/store';
import AppNavigator from './navigation/AppNavigator';

// Remove this once Sentry is correctly setup.
Sentry.enableInExpoDevelopment = true;

Sentry.config('https://e3aff86309c34bc6ae290990712ac160@sentry.io/1049742').install();

export default class App extends Component {
  state = {
    isLoadingComplete: false,
  };

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        // require('./assets/images/robot-dev.png'),
        // require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        // 'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={{ flex: 1, backgroundColor: '#000' }}>
          <Provider store={store}>
            <AppNavigator />
          </Provider>
        </View>
      );
    }
  }
}
