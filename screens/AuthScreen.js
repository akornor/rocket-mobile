import React, { Component } from 'react';
import { View, Text, StyleSheet, AsyncStorage } from 'react-native';
import ProgressBar from '../components/ProgressBar';
import { Button, SocialIcon } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';


export default class AuthScreen extends Component {
	state = {
		isLoading: true
	}
	_onPress = () => {
		AsyncStorage.setItem('user', 'raymond')
		const action = NavigationActions.reset({index:0, key: null, actions:[NavigationActions.navigate({routeName: 'Tabs'})]})
		this.props.navigation.dispatch(action)

	}
	async componentWillMount(){
		user = await AsyncStorage.getItem('user')
		console.log(user)
		if (user){
			const action = NavigationActions.reset({index:0, key: null, actions:[NavigationActions.navigate({routeName: 'Tabs'})]})
			this.props.navigation.dispatch(action)
			// AsyncStorage.removeItem('user')
		}
		else{
			this.setState({isLoading: false})
		}

	}
	render(){
		return(
			this.state.isLoading ? <ProgressBar/>
			:<View style={styles.container}>
				<Text> AuthScreen </Text>
				<SocialIcon
				  title='Sign In With Facebook'
				  button
				  type='facebook'
				  style={styles.button}
				/>
				<Button
				title='GO HOME'
				onPress={this._onPress}
				/>
			</View>
			)
	}
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: 'center',
	},
	button:{
		alignItems: 'center',
	}
})