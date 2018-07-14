import React from 'react';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import MovieScreen from '../screens/MovieScreen';
import MoviesListScreen from '../screens/MoviesListScreen';
import MoviesScreen from '../screens/MoviesScreen';
import SearchScreen from '../screens/SearchScreen';
import AuthScreen from '../screens/AuthScreen';
import PresaleScreen from '../screens/PresaleScreen';
import PaymentOptionScreen from '../screens/PaymentScreen';
import MobileMoneyScreen from '../screens/MobileMoneyScreen';
import CouponScreen from '../screens/CouponScreen';
import TicketListScreen from '../screens/TicketListScreen';
import TicketScreen from '../screens/TicketScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

import { Ionicons, FontAwesome } from '@expo/vector-icons';

const MoviesStack = createStackNavigator({
  Movies: {
    screen: MoviesScreen,
  },
});

const SearchStack = createStackNavigator({
  Search: {
    screen: SearchScreen,
  },
});

const MoviesListStack = createStackNavigator({
  MoviesList: {
    screen: MoviesListScreen,
  },
});

const MovieStack = createStackNavigator({
  Movie: {
    screen: MovieScreen,
  },
});

const TicketStack = createStackNavigator({
  TicketList: {
    screen: TicketListScreen,
  },
  Ticket: {
    screen: TicketScreen,
  },
});

const PresaleStack = createStackNavigator({
  Presale: {
    screen: PresaleScreen,
  },
  PaymentOption: {
    screen: PaymentOptionScreen,
  },
  MobileMoney: {
    screen: MobileMoneyScreen,
  },
  Coupon: {
    screen: CouponScreen,
  },
});

const Tabs = createBottomTabNavigator(
  {
    Home: {
      screen: MoviesStack,
      navigationOptions: {
        // tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <Ionicons name="md-home" size={35} />
          ) : (
            <Ionicons name="md-home" size={35} color={tintColor} />
          ),
      },
    },
    Tickets: {
      screen: TicketStack,
      navigationOptions: {
        tabBarLabel: 'Ticket',
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <Ionicons name="ios-barcode" size={35} />
          ) : (
            <Ionicons name="ios-barcode-outline" size={35} color={tintColor} />
          ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <FontAwesome name="user" size={35} />
          ) : (
            <FontAwesome name="user" size={35} color={tintColor} />
          ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export const AppStack = createStackNavigator(
  {
    Tabs: {
      screen: Tabs,
    },
    Movie: {
      screen: MovieScreen,
    },
    Search: {
      screen: SearchStack,
    },
    MoviesList: {
      screen: MoviesListStack,
    },
    Presale: {
      screen: PresaleStack,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthScreen,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);
