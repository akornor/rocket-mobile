import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import CloseButton from '../navigation/CloseButton';
import CardThree from '../components/CardThree';
import defaultNavigationOptions from '../navigation/defaultNavOptions';

export default class PresaleScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'BUY YOUR TICKETS',
      headerRight: Platform.OS === 'ios' && <CloseButton />,
      ...defaultNavigationOptions,
    };
  };

  constructor(props) {
    super(props);
    this.state = { counter: 0 };
  }

  _onPress = () => {
    this.props.navigation.navigate('PaymentOption');
  };

  _increment = () => {
    this.setState((prevState, props) => {
      return { counter: prevState.counter + 1 };
    });
  };
  _decrement = () => {
    this.setState((prevState, props) => {
      return { counter: prevState.counter - 1 };
    });
  };
  render() {
    // const {info} = this.props.navigation.state.params
    // console.log(info.release_date, info.vote_average, info.overview, info.poster_path)
    const { navigation } = this.props;
    const info = navigation.getParam('info');
    return (
      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <CardThree info={info} viewMovie={id => {}} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.textStyle}> HOW MANY TICKETS? </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            justifyContent: 'space-between',
          }}
        >
          <Text
            style={{
              fontWeight: '700',
              fontSize: 31,
              color: 'white',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            GHS {20.0 * this.state.counter}
          </Text>
          <View style={{ flexDirection: 'row', alignContent: 'flex-end' }}>
            <Button
              containerStyle={{ width: 50 }}
              disabled={this.state.counter <= 0}
              title="-"
              onPress={this._decrement}
              titleStyle={styles.buttonTitleStyle}
              disabledTitleStyle={styles.buttonTitleStyle}
              buttonStyle={styles.buttonStyle}
            />
            <Text
              style={{
                color: 'white',
                fontSize: 35,
                fontWeight: '700',
                marginHorizontal: 20,
              }}
            >
              {this.state.counter}
            </Text>
            <Button
              containerStyle={{ width: 50 }}
              disabled={this.state.counter >= 10}
              buttonStyle={styles.buttonStyle}
              title="+"
              titleStyle={styles.buttonTitleStyle}
              disabledTitleStyle={styles.buttonTitleStyle}
              onPress={this._increment}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <Button
            title="NEXT"
            disabled={this.state.count === 0}
            onPress={this._onPress}
            buttonStyle={styles.buttonStyle}
            titleStyle={{ fontWeight: 'bold' }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    paddingVertical: 20,
  },
  cardContainer: {
    marginTop: 10,
    // flex: 1,
    minHeight: 170,
  },
  titleContainer: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 15,
    color: 'white',
  },
  buttonStyle: {
    backgroundColor: '#EA0000',
    borderRadius: 5,
    paddingHorizontal: 8,
  },
  buttonTitleStyle: {
    fontSize: 23,
    fontWeight: '700',
  },
});
