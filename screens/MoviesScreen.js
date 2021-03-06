import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  StatusBar,
} from 'react-native';
import Expo from 'expo';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import _ from 'lodash';

import * as moviesActions from '../state/moviesActions';
import CardOne from '../components/CardOne';
import CardTwo from '../components/CardTwo';
import ProgressBar from '../components/ProgressBar';
import styles from './styles/Movies';
import defaultNavigationOptions from '../navigation/defaultNavOptions';

@withNavigation
class SearchButton extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={this._openSearch}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingRight: 15,
        }}
      >
        <Icon name="ios-search" color="#fff" size={28} />
      </TouchableOpacity>
    );
  }

  _openSearch = () => {
    this.props.navigation.navigate('Search', { title: 'Search' });
  };
}

class Movies extends Component {
  static navigationOptions = {
    title: 'Home',
    headerRight: Platform.OS === 'ios' && <SearchButton />,
    ...defaultNavigationOptions,
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isRefreshing: false,
    };

    this._viewMovie = this._viewMovie.bind(this);
    this._onRefresh = this._onRefresh.bind(this);
    // this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
  }

  componentWillMount() {
    this._retrieveMovies();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.nowPlayingMovies && nextProps.list) {
      this.setState({ isLoading: false });
    }
  }

  _retrieveMovies(isRefreshed) {
    this.props.actions.retrieveNowPlayingMovies();
    // this.props.actions.retrievePopularMovies();
    this.props.actions.retrieveMoviesList('upcoming');
    if (isRefreshed && this.setState({ isRefreshing: false }));
  }

  _viewMoviesList(type, title) {
    this.props.navigation.navigate('MoviesList', { type, title });
  }

  _viewMovie(movieId) {
    this.props.navigation.navigate('Movie', { movieId });
  }

  _onRefresh() {
    this.setState({ isRefreshing: true });
    this._retrieveMovies('isRefreshed');
  }

  render() {
    const { nowPlayingMovies, popularMovies, list } = this.props;
    const iconPlay = (
      <Icon name="md-play" size={21} color="#9F9F9F" style={{ paddingLeft: 3, width: 22 }} />
    );
    const iconTop = <Icon name="md-trending-up" size={21} color="#9F9F9F" style={{ width: 22 }} />;
    const iconUp = <Icon name="md-recording" size={21} color="#9F9F9F" style={{ width: 22 }} />;
    // const topInset = this.props.route.getContentInsetsStyle().marginTop;

    return this.state.isLoading ? (
      <View style={styles.progressBar}>
        <ProgressBar />
      </View>
    ) : (
      <ScrollView
        style={styles.container}
        // contentInset={{ top: topInset }}
        // contentOffset={{ y: -topInset }}
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
      >
        <Swiper autoplay autoplayTimeout={4} showsPagination={false} height={248}>
          {nowPlayingMovies.results.map(info => (
            <CardOne key={info.id} info={info} viewMovie={this._viewMovie} />
          ))}
        </Swiper>
        <View>
          <View style={styles.listHeading}>
            <Text style={styles.listHeadingLeft}>In Theatres</Text>
            <TouchableOpacity>
              <Text
                style={styles.listHeadingRight}
                onPress={this._viewMoviesList.bind(this, 'popular', 'Popular')}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {nowPlayingMovies.results.map(info => (
              <CardTwo key={info.id} info={info} viewMovie={this._viewMovie} />
            ))}
          </ScrollView>

          <View style={styles.listHeading}>
            <Text style={styles.listHeadingLeft}>Coming soon</Text>
            <TouchableOpacity>
              <Text
                style={styles.listHeadingRight}
                onPress={this._viewMoviesList.bind(this, 'upcoming', 'Coming soon')}
              >
                See all
              </Text>
            </TouchableOpacity>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {_.filter(list.results, obj => {
              let today = new Date();
              let releaseDate = new Date(obj.release_date);
              return releaseDate >= today;
            }).map(info => <CardTwo key={info.id} info={info} viewMovie={this._viewMovie} />)}
          </ScrollView>

          <View style={styles.browseList}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this._viewMoviesList.bind(this, 'now_playing', 'Now Playing')}
            >
              <View style={styles.browseListItem}>
                {iconPlay}
                <Text style={styles.browseListItemText}>Now Playing</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this._viewMoviesList.bind(this, 'top_rated', 'Top Rated')}
            >
              <View style={styles.browseListItem}>
                {iconTop}
                <Text style={styles.browseListItemText}>Top Rated</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={this._viewMoviesList.bind(this, 'upcoming', 'Upcoming')}
            >
              <View style={styles.browseListItem}>
                {iconUp}
                <Text style={styles.browseListItemText}>Upcoming</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <StatusBar translucent animated barStyle="light-content" />
      </ScrollView>
    );
  }
}

Movies.propTypes = {
  actions: PropTypes.object.isRequired,
  nowPlayingMovies: PropTypes.object.isRequired,
  // popularMovies: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    nowPlayingMovies: state.movies.nowPlayingMovies,
    popularMovies: state.movies.popularMovies,
    list: state.movies.list,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(moviesActions, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
