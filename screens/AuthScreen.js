import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { SocialIcon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../state/authActions';
import firebase from '../firebase';

class AuthScreen extends Component {
  state = {
    isLoading: true,
    buttonLoading: false,
  };

  // navigate(routeName) {
  //   const action = NavigationActions.navigate({
  //     index: 0,
  //     key: null,
  //     actions: [NavigationActions.navigate({ routeName: routeName })],
  //   });
  //   this.props.navigation.dispatch(action);
  // }
  // async componentDidMount() {
  //   // check if user is authenticated
  //   // await AsyncStorage.clear()
  //   this.unSubscribe = firebase.auth().onAuthStateChanged(user => {
  //     // console.log(user) //eslint-disable-line
  //     if (user) {
  //       this.navigate('Tabs');
  //       // AsyncStorage.removeItem('token')
  //     } else {
  //       this.setState({ isLoading: false });
  //     }
  //   });
  // }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.token) {
  //     this.setState({ buttonLoading: true });
  //   }
  // }
  // componentWillUnmount() {
  //   this.unSubscribe();
  // }

  render() {
    return (
      <View style={styles.container}>
        <SocialIcon
          title="SIGN IN WITH FACEBOOK"
          button
          loading={this.state.buttonLoading}
          type="facebook"
          style={styles.button}
          onPress={this.props.actions.loginWithFacebook}
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

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);
