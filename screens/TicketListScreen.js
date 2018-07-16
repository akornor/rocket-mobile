import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import defaultNavigationOptions from '../navigation/defaultNavOptions';
import CardFour from '../components/CardThree';

export default class TicketListScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Tickets',
      ...defaultNavigationOptions,
    };
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <CardFour
      info={item}
      viewMovie={() => {
        this.props.navigation.navigate('Ticket');
      }}
    />
  );
  render() {
    const data = [
      {
        id: 1,
        poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        original_title: 'Coco',
        overview:
          "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        release_date: '2017-10-27',
        vote_average: 7.8,
      },
      {
        id: 2,
        poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        original_title: 'Coco',
        overview:
          "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        release_date: '2017-10-27',
        vote_average: 7.8,
      },
      {
        id: 3,
        poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        original_title: 'Coco',
        overview:
          "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        release_date: '2017-10-27',
        vote_average: 7.8,
      },
      {
        id: 4,
        poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        original_title: 'Coco',
        overview:
          "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        release_date: '2017-10-27',
        vote_average: 7.8,
      },
      {
        id: 5,
        poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        original_title: 'Coco',
        overview:
          "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        release_date: '2017-10-27',
        vote_average: 7.8,
      },
      {
        id: 6,
        poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        original_title: 'Coco',
        overview:
          "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        release_date: '2017-10-27',
        vote_average: 7.8,
      },
      {
        id: 7,
        poster_path: '/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg',
        original_title: 'Coco',
        overview:
          "Despite his family’s baffling generations-old ban on music, Miguel dreams of becoming an accomplished musician like his idol, Ernesto de la Cruz. Desperate to prove his talent, Miguel finds himself in the stunning and colorful Land of the Dead following a mysterious chain of events. Along the way, he meets charming trickster Hector, and together, they set off on an extraordinary journey to unlock the real story behind Miguel's family history.",
        release_date: '2017-10-27',
        vote_average: 7.8,
      },
    ];
    return (
      <View style={styles.container}>
        <FlatList
          data={data}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={() => <Text style={styles.empty}>No Tickets Available</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'black',
    flex: 1,
  },
  separator: {
    marginTop: 10,
    backgroundColor: '#8E8E8E',
  },
  empty: {
    color: 'white',
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '700',
  },
});
