import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import ModalScreen from '../screens/ModalScreen';
import MovieScreen from '../screens/MovieScreen';
import MoviesListScreen from '../screens/MoviesListScreen';
import MoviesScreen from '../screens/MoviesScreen';
import SearchScreen from '../screens/SearchScreen';
import AuthScreen from '../screens/AuthScreen';
import PresaleScreen from '../screens/PresaleScreen';
import {
  Ionicons,
} from '@expo/vector-icons';


export const MoviesStack = StackNavigator({
	Movies:{
		screen: MoviesScreen,
	},
	// MoviesList:{
	// 	screen: MoviesListScreen
	// }
	// Movie:{
	// 	screen: MovieScreen,
	// }
});

// export const ProfileStack = StackNavigator({
// 	Profile:{
// 		screen: ProfileScreen,
// 	}
// });
export const AuthStack = StackNavigator({
	Auth:{
		screen: AuthScreen
	},
})
export const SearchStack = StackNavigator({
	Search:{
		screen: SearchScreen,
	}
})

export const MoviesListStack = StackNavigator({
	MoviesList:{
		screen: MoviesListScreen,
	}
})

const MovieStack = StackNavigator({
	Movie:{
		screen: MovieScreen
	}
})

export const Tabs = TabNavigator({
	Movies:{
		screen: MoviesStack,
		navigationOptions:{
			tabBarLabel: 'Home',
			tabBarIcon: ({ tintColor, focused }) => (focused ? <Ionicons name="ios-home" size={35}/> : <Ionicons name="ios-home-outline" size={35}/>)
		}
	},
	Profile:{
		screen: ProfileScreen,
		navigationOptions:{
			tabBarLabel: 'Profile',
			tabBarIcon: ({ tintColor, focused }) => (focused ? <Ionicons name="ios-person" size={35}/> : <Ionicons name="ios-person-outline" size={35}/>)
		}
	}
},{
	tabBarOptions: {
     // style:{
     // 	backgroundColor: '#000',
     // }
     showLabel: false,
    },
});


export const RootNavigator = StackNavigator({
	Auth:{
		screen: AuthScreen,
	},
	Tabs:{
		screen: Tabs,
	},
	Movie:{
		screen: MovieScreen,
	},
	Search:{
		screen: SearchStack
	},
	MoviesList:{
		screen: MoviesListStack
	},
	Presale:{
		screen: PresaleScreen
	}
},{
	mode: 'modal',
	headerMode: 'none',
});