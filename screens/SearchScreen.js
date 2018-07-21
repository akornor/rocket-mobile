import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Platform, View, ListView, TextInput, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { TMDB_URL, TMDB_API_KEY } from '../constants/Api';
import * as moviesActions from '../state/moviesActions';
import CardThree from '../components/CardThree';
import styles from './styles/Search';
import CloseButton from '../navigation/CloseButton';
import { SearchBar } from 'react-native-elements';
import defaultNavigationOptions from '../navigation/defaultNavOptions';
import { logErrorRemotely } from '../utils';

class Search extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.title,
      // headerTransparent: true,
      headerRight: Platform.OS === 'ios' && <CloseButton />,
      ...defaultNavigationOptions,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      currentPage: 1,
      searchResults: {
        results: [],
      },
      query: null,
    };

    this._viewMovie = this._viewMovie.bind(this);
    this._handleTextInput = this._handleTextInput.bind(this);
  }

  _handleTextInput(event) {
    const query = event.nativeEvent.text;
    this.setState({ query });
    if (!query) this.setState({ query: '' });

    setTimeout(() => {
      if (query.length) {
        this.props.actions.retrieveMoviesSearchResults(this.state.query, 1).then(() => {
          const ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
          });
          const dataSource = ds.cloneWithRows(this.props.searchResults.results);
          this.setState({
            dataSource,
            isLoading: false,
          });
        });
      }
    }, 500);
  }

  async _retrieveNextPage() {
    if (this.state.currentPage !== this.props.searchResults.total_pages) {
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
        res = await axios.get(
          `${TMDB_URL}/search/movie/?api_key=${TMDB_API_KEY}&query=${
            this.state.query
          }&page=${page}`,
        );
        const data = this.state.searchResults.results;
        const newData = res.data.results;

        newData.map((item, index) => data.push(item));

        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(this.state.searchResults.results),
        });
      } catch (err) {
        console.log('next page', err); // eslint-disable-line
        logErrorRemotely(error);
      }
    }
  }

  _viewMovie(movieId) {
    this.props.navigation.navigate('Movie', { movieId });
  }
  _keyExtractor = ({ item, index }) => index + 1;

  _renderItem = ({ item }) => <CardThree info={item} viewMovie={this._viewMovie} />;
  _renderListView() {
    if (this.state.query) {
      listView = (
        <FlatList
          enableEmptySections
          onEndReached={type => this._retrieveNextPage()}
          onEndReachedThreshold={1200}
          dataSource={this.state.dataSource}
          data={this.props.searchResults.results}
          // keyExtractor={this._keyExtractor}
          // renderRow={rowData => <CardThree info={rowData} viewMovie={this._viewMovie} />}
          renderItem={this._renderItem}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
          ItemSeparatorComponent={() => <View style={styles.seperator} />}
        />
      );
    } else {
      listView = <View />;
    }

    return listView;
  }

  _onClear = () => {
    this.setState({ query: null });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginBottom: 15 }}>
          <SearchBar
            // showLoading={this.state.isLoading}
            style={styles.textInput}
            autoFocus
            returnKeyType={'search'}
            placeholder="Search Movie"
            platform={Platform.OS}
            onClear={this._onClear}
            value={this.state.query}
            onChange={this._handleTextInput}
            underlineColorAndroid="transparent"
          />
        </View>
        {!this.state.isLoading && this._renderListView()}
      </View>
    );
  }
}

Search.propTypes = {
  actions: PropTypes.object.isRequired,
  searchResults: PropTypes.object.isRequired,
  navigation: PropTypes.object,
};

function mapStateToProps(state, ownProps) {
  return {
    searchResults: state.movies.searchResults,
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
)(Search);
