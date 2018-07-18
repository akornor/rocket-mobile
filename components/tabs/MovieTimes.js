import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  NativeModules,
  Platform,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Card, Button } from 'react-native-elements';
import { withNavigation } from 'react-navigation';
import { Calendar, Agenda, CalendarList } from 'react-native-calendars';

@withNavigation
class MovieTimes extends Component {
  _onPress = () => {
    this.props.navigation.navigate('Presale', {
      movieId: this.props.movieId,
      info: this.props.info,
    });
    // if (Platform.OS === 'ios') {
    //   NativeModules.StatusBarManager.setHidden(false, 'slide');
    // }
  };

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <Card
      key={item.id}
      title={item.name}
      containerStyle={{ backgroundColor: 'black' }}
      titleStyle={{ color: 'white', fontWeight: 'bold' }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          flex: 1,
        }}
      >
        {item.movietimes.map(a => {
          return (
            <Button
              title={a}
              key={a}
              onPress={this._onPress}
              titleStyle={styles.title}
              disabledTitleStyle={styles.disabledTitle}
              buttonStyle={styles.button}
            />
          );
        })}
      </ScrollView>
    </Card>
  );

  render() {
    const data = this.props.data || [
      { id: 1, name: 'Silverbird Cinema', movietimes: ['10:00a', '11:20a', '12:20p', '01:30p'] },
      { id: 2, name: 'Global Cinema', movietimes: ['10:00a', '11:20a', '12:20p', '10:00p'] },
      {
        id: 3,
        name: 'Silverbird Cinema Weija',
        movietimes: ['10:00a', '11:20a', '12:20p', '01:30p'],
      },
      { id: 4, name: 'Poop Town Cinema', movietimes: ['10:00a', '11:20a', '12:20p', '01:30p'] },
    ];
    return (
      <View>
        <FlatList
          data={data}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          // ListEmptyComponent={() => <Text style={styles.empty}>No Tickets Available</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  disabledTitle: {
    fontSize: 13,
  },
  button: {
    backgroundColor: '#EA0000',
    borderRadius: 5,
    padding: 1,
  },
});
export default MovieTimes;
