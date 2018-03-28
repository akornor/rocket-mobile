/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import Expo from 'expo';
import { Platform, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Provider } from 'react-redux';
import store from './state/store';

import navigationContext from './navigation/CustomNavigationContext';
// import { NavigationProvider, StackNavigation } from '@expo/ex-navigation';
import { RootNavigator } from './navigation/routes';

export default class App extends Component {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <Provider store={store}>
          <RootNavigator/>
        </Provider>
      </View>
    );
  }
}

class AppContainer extends Component {
  state = {
    isLoaded: false
  };

  async componentWillMount() {
    await Expo.Font.loadAsync(Ionicons.font);
    this.setState({ isLoaded: true });
  }

  render() {
    if (!this.state.isLoaded) {
      return <Expo.AppLoading />;
    }

    return <App />;
  }
}

Expo.registerRootComponent(AppContainer);
