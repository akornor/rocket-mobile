import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyB0DTxLsSMvxC63gxNbBDuYSWNVnlJb4BU',
  authDomain: 'ticketrocket-c892c.firebaseapp.com',
  databaseURL: 'https://ticketrocket-c892c.firebaseio.com',
  projectId: 'ticketrocket-c892c',
  storageBucket: 'ticketrocket-c892c.appspot.com',
  messagingSenderId: '476982805898',
};

firebase.initializeApp(config);

export default firebase;
