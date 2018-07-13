import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import defaultNavigationOptions from '../navigation/defaultNavOptions';
import { Button } from 'react-native-elements';
import CardThree from '../components/CardThree';

export default class TicketListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Tickets',
      ...defaultNavigationOptions,
    };
  };
  render() {
    const info = {
      poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
      original_title: 'Coco',
      overview:
        "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
      release_date: '2017-10-27',
      vote_average: 7.8,
    };
    return (
      <View style={{ padding: 10, backgroundColor: 'black', flex: 1 }}>
        {/* <Text>TicketListScreen</Text> */}
        <CardThree
          info={info}
          viewMovie={() => {
            this.props.navigation.navigate('Ticket');
          }}
        />
      </View>
    );
  }
}
