import React, { Component } from 'react';
import { ScrollView, AsyncStorage, Alert, StyleSheet } from 'react-native';
import { Tile, List, ListItem, Button, Avatar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import firebase from '../firebase';

class ProfileScreen extends Component {
  _signOut = async () => {
    try {
      await firebase.auth().signOut();
      await AsyncStorage.clear();
      this.props.navigation.navigate('Auth');
    } catch (e) {
      console.log('sign out failed', error);
    }
  };

  _showAlertMessage = () => {
    Alert.alert(
      'Sign out',
      'Are you sure you want to sign out ?',
      [
        { text: 'Yes', onPress: this._signOut },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  render() {
    const user = firebase.auth().currentUser;
    return (
      <ScrollView style={{ backgroundColor: 'black' }}>
        <Tile
          imageSrc={{ uri: user.photoURL }}
          featured
          // title={`${user.displayName.toUpperCase()}`}
          // caption={user.email}
        />
        <Button
          title="SIGN OUT"
          // buttonStyle={{ marginTop: 20 }}
          onPress={this._showAlertMessage}
          titleStyle={styles.title}
          buttonStyle={styles.button}
        />

        <List>
          <ListItem title="Name" rightTitle={user.displayName} hideChevron />
          <ListItem title="Email" rightTitle={user.email} hideChevron />
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    backgroundColor: '#EA0000',
    padding: 1,
    borderRadius: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
