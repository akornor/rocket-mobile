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
		isLoading: true
	}

	navigate(routeName){
		const action = NavigationActions.reset({index:0, key: null, actions:[NavigationActions.navigate({routeName: routeName})]})
		this.props.navigation.dispatch(action)
	}
	componentDidMount(){
		// const token = await AsyncStorage.getItem('token');
		// if (token){
		// 	this.navigate('Tabs');
		// 	// return;
		// }
		// check if user is authenticated
		this.unSubscribe = firebase.auth().onAuthStateChanged((user)=>{
			// console.log(user) //eslint-disable-line
			if (user){
				this.navigate('Tabs')
				// AsyncStorage.removeItem('token')
			}
			else{
				this.setState({isLoading: false})
			}
		})
	}
	componentWillUnmount(){
		this.unSubscribe()
	}
	// componentWillReceiveProps(nextProps){
	// 	if (nextProps.token){
	// 		this.navigate('Tabs')
	// 	}
	// }
	render(){
		return(
			this.state.isLoading ? 
			<View style={styles.container}>
			<ProgressBar/>
			</View>
			:<View style={styles.container}>
				<SocialIcon
				  title='Sign In With Facebook'
				  button
				  type='facebook'
				  style={styles.button}
				  onPress={this.props.actions.loginWithFacebook}
				/>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'black',
	},
	button:{
		alignItems: 'center',
	}
})

function mapStateToProps({ auth }){
	return {token: auth.token};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(AuthScreen);



