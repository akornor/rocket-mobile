import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Button } from 'react-native-elements';
import * as authActions from '../state/authActions';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from '../firebase';

class ProfileScreen extends React.Component {
  navigate(routeName){
		const action = NavigationActions.reset({index:0, key: null, actions:[NavigationActions.navigate({routeName: routeName})]})
		this.props.navigation.dispatch(action)
  }
  
  _onPress = () =>{
    firebase.auth().signOut().then(async () => {
      await AsyncStorage.clear();
      this.navigate('Auth');
    }).catch((error)=> {
      console.log('sign out failed')
    })
  }

  render() {
    return (
      <View style={{flex: 1, backgroundColor: '#000'}}>
      <Button
      title='Logout'
      onPress={this._onPress}
      />
      </View>
    );
  }
}

function mapDispatchToProps(dispatch){
  return{
    actions: bindActionCreators(authActions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(ProfileScreen)



