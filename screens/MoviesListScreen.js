import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
} from 'react-native';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';

import { TMDB_URL, TMDB_API_KEY } from '../constants/Api';
import * as moviesActions from '../state/moviesActions';
import CardThree from '../components/CardThree';
import ProgressBar from '../components/ProgressBar';
import styles from './styles/MoviesList';
import CloseButton from '../navigation/CloseButton';
import defaultNavigationOptions from '../navigation/defaultNavOptions';

class MoviesList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('title'),
      headerRight: Platform.OS === 'ios' && <CloseButton />,
      ...defaultNavigationOptions,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false,
      currentPage: 1,
      list: {
        results: [],
      },
    };

    this._viewMovie = this._viewMovie.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
  }

  componentWillMount() {
    this._retrieveMoviesList();
  }

  _retrieveMoviesList(isRefreshed) {
    this.props.actions
      .retrieveMoviesList(this.props.navigation.getParam('type'), this.state.currentPage)
      .then(() => {
        this.setState({
          list: this.props.list,
          isLoading: false,
        });
      });
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  async _retrieveNextPage(type) {
    if (this.state.currentPage !== this.props.list.total_pages) {
      this.setState({
        currentPage: this.state.currentPage + 1,
      });

      let page;
      if (this.state.currentPage === 1) {
        page = 2;
        this.setState({ currentPage: 2 });
      } else {
        page = this.state.currentPage + 1;
      }
      try {
        let res = await axios.get(`${TMDB_URL}/movie/${type}?api_key=${TMDB_API_KEY}&page=${page}`);
        const data = this.state.list.results;
        const newData = res.data.results;

        newData.map((item, index) => data.push(item));
      } catch (error) {
        console.log('next page', err); // eslint-disable-line
      }
    }
  }

  _viewMovie(movieId) {
    this.props.navigation.navigate('Movie', { movieId });
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this._retrieveMoviesList('isRefreshed');
  }

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => <CardThree info={item} viewMovie={this._viewMovie} />;

  render() {
    // const topInset = this.props.route.getContentInsetsStyle().marginTop + 15;
    const { navigation } = this.props;
    const topInset = 10;

    return this.state.isLoading ? (
      <View style={styles.progressBar}>
        <ProgressBar />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.container}
          contentInset={{ top: topInset }}
          contentOffset={{ y: -topInset }}
          contentContainerStyle={{
            paddingTop: Platform.OS === 'android' ? 15 : 0,
          }}
          enableEmptySections
          onEndReached={type => this._retrieveNextPage(navigation.getParam('type'))}
          onEndReachedThreshold={1200}
          keyExtractor={this._keyExtractor}
          data={_.uniq(this.props.list.results)}
          renderItem={this._renderItem}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
          ListFooterComponent={() => (
            <View style={{ height: 50 }}>
              <ProgressBar />
            </View>
          )}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this._onRefresh}
              colors={['#EA0000']}
              tintColor="white"
              title="loading..."
              titleColor="white"
              progressBackgroundColor="white"
            />
          }
        />

        <StatusBar showHideTransition="fade" hidden={false} barStyle="light-content" animated />
      </View>
    );
  }
}

MoviesList.propTypes = {
  actions: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  // type: PropTypes.string.isRequired,
  // navigator: PropTypes.object,
  navigation: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    list: state.movies.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(moviesActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MoviesList);
