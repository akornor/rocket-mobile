import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
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
          paddingRight: 15
        }}
      >
        <Icon name="ios-close" color="#fff" size={35} />
      </TouchableOpacity>
    );
  }

  _dismissModal = () => {
    this.props.navigation.goBack();
  };
}
