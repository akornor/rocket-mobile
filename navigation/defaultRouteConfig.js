import { Platform, StyleSheet } from 'react-native';

const defaultRouteConfig = {
  navigationBar: {
    translucent: Platform.OS === 'ios',
    translucentTint: 'dark',
    backgroundColor: Platform.OS === 'android' ? '#0a0a0a' : 'rgba(0,0,0,0.01)',
    ...Platform.select({
      ios: {
        titleStyle: { color: '#fff', fontWeight: '500' },
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: 'rgba(255,255,255,0.1)',
      },
      android: {
        titleStyle: { color: '#fff', fontWeight: '500' }
      },
    })
  },
}

export default defaultRouteConfig;
