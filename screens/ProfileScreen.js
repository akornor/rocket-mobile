import React, { Component } from 'react';
import { ScrollView, AsyncStorage, Alert } from 'react-native';
import { Tile, List, ListItem, Button, Avatar } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import firebase from '../firebase';

class ProfileScreen extends Component {
  navigate(routeName) {
    const action = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: routeName })],
    });
    this.props.navigation.dispatch(action);
  }

  _signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(async () => {
        await AsyncStorage.clear();
        this.navigate('Auth');
      })
      .catch(error => {
        console.log('sign out failed', error);
      });
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
        // {text: 'OK', onPress: () => console.log('OK Pressed')},
      ],
      { cancelable: true },
    );
  };

  render() {
    const user = firebase.auth().currentUser;
    // console.log(user.displayName, user.email, user.photoURL)
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
          titleStyle={{
            fontWeight: 'bold',
          }}
          buttonStyle={{
            marginTop: 20,
            backgroundColor: '#EA0000',
            padding: 1,
            borderRadius: 5,
          }}
        />

        <List>
          <ListItem title="Name" rightTitle={user.displayName} hideChevron />
          <ListItem title="Email" rightTitle={user.email} hideChevron />
        </List>
      </ScrollView>
    );
  }
}

export default ProfileScreen;
