import React, { Component } from 'react';
import { withNavigation, NavigationActions } from 'react-navigation';
import { TouchableOpacity, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

@withNavigation
export default class CloseButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this._dismissModal}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: 15,
        }}
      >
        <Icon name="ios-close-outline" color="#fff" size={35} />
      </TouchableOpacity>
    );
  }

  _dismissModal = () => {
    if (this.props.onPress) {
      return this.props.onPress();
    }
    const backAction = NavigationActions.back();
    this.props.navigation.dispatch(backAction);
  };
}
