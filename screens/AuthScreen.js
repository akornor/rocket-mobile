import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { SocialIcon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as authActions from '../state/authActions';

class AuthScreen extends Component {
	state = {
		isLoading: true
	}

	navigate(routeName){
		const action = NavigationActions.reset({index:0, key: null, actions:[NavigationActions.navigate({routeName: routeName})]})
		this.props.navigation.dispatch(action)
	}
	async componentWillMount(){
		user = await AsyncStorage.getItem('token')
		console.log(user) //eslint-disable-line
		if (user){
			this.navigate('Tabs')
			AsyncStorage.removeItem('token')
		}
		else{
			this.setState({isLoading: false})
		}
	}

	componentWillReceiveProps(nextProps){
		if (nextProps.token){
			this.navigate('Tabs')
		}
	}
	render(){
		return(
			this.state.isLoading ? <ProgressBar/>
			:<View style={styles.container}>
				<SocialIcon
				  title='Sign In With Facebook'
				  button
				  type='facebook'
				  style={styles.button}
				  onPress={this.props.actions.facebookLogin}
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

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);



