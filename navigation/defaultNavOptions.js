import { StyleSheet } from 'react-native';

const defaultNavigationOptions = {
  headerTintColor: 'white',
  headerTitleStyle: { color: '#fff', fontWeight: '700' },
  // headerTransparent: true,
  // headerRight: (Platform.OS === 'ios' && <CloseButton/> ),
  headerStyle: {
    backgroundColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: 'rgba(255,255,255,0.1)'
  },
  headerBackTitle: null,
  headerBackTitleStyle: {
    color: 'white',
  },
};

export default defaultNavigationOptions;
