import React from 'react';
import { View } from 'react-native';

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Profile',
      translucent: true,
      backgroundColor: 'rgba(0,0,0,0.01)',
      titleStyle: {color: '#fff'},
    },
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}} />
    );
  }
}
