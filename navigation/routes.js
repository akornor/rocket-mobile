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
import PaymentOptionScreen from '../screens/PaymentScreen';
import MobileMoneyScreen from '../screens/MobileMoneyScreen';
import CouponScreen from '../screens/CouponScreen';
import TicketListScreen from '../screens/TicketListScreen';
import TicketScreen from '../screens/TicketScreen';

import { Ionicons } from '@expo/vector-icons';

export const MoviesStack = StackNavigator({
  Movies: {
    screen: MoviesScreen,
  },
});

export const AuthStack = StackNavigator({
  Auth: {
    screen: AuthScreen,
  },
});
export const SearchStack = StackNavigator({
  Search: {
    screen: SearchScreen,
  },
});

export const MoviesListStack = StackNavigator({
  MoviesList: {
    screen: MoviesListScreen,
  },
});

const MovieStack = StackNavigator({
  Movie: {
    screen: MovieScreen,
  },
});

const TicketStack = StackNavigator({
  TicketList: {
    screen: TicketListScreen,
  },
  Ticket: {
    screen: TicketScreen,
  },
});

const Presale = StackNavigator({
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

export const Tabs = TabNavigator(
  {
    Movies: {
      screen: MoviesStack,
      navigationOptions: {
        // tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <Ionicons name="ios-home" size={35} />
          ) : (
            <Ionicons name="ios-home-outline" size={35} />
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
            <Ionicons name="ios-barcode-outline" size={35} />
          ),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor, focused }) =>
          focused ? (
            <Ionicons name="ios-person" size={35} />
          ) : (
            <Ionicons name="ios-person-outline" size={35} />
          ),
      },
    },
  },
  {
    tabBarOptions: {
      showLabel: false,
      tabBarPosition: 'bottom',
      tabBarComponent: TabBarBottom,
    },
  },
);

export const RootNavigator = StackNavigator(
  {
    Auth: {
      screen: AuthScreen,
    },
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
      screen: Presale,
    },
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);
