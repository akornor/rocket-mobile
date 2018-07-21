import axios from 'axios';
import { logErrorRemotely } from '../utils';
import * as types from '../constants/ActionTypes';
import { TMDB_URL, TMDB_API_KEY } from '../constants/Api';

// GENRES
export function retrieveMoviesGenresSuccess(res) {
  return {
    type: types.RETRIEVE_MOVIES_GENRES_SUCCESS,
    moviesGenres: res.data,
  };
}

export function retrieveMoviesGenres() {
  return async function(dispatch) {
    try {
      let res = await axios.get(`${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}`);
      dispatch(retrieveMoviesGenresSuccess(res));
    } catch (error) {
      console.log(error); //eslint-disable-line
      logErrorRemotely(error);
    }
  };
}

// POPULAR
export function retrievePopularMoviesSuccess(res) {
  return {
    type: types.RETRIEVE_POPULAR_MOVIES_SUCCESS,
    popularMovies: res.data,
  };
}

export function retrievePopularMovies(page) {
  return async function(dispatch) {
    try {
      let res = await axios.get(`${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`);
      dispatch(retrievePopularMoviesSuccess(res));
    } catch (error) {
      console.log('Popular', error); //eslint-disable-line
      logErrorRemotely(error);
    }
  };
}

// NOW PLAYING
export function retrieveNowPlayingMoviesSuccess(res) {
  return {
    type: types.RETRIEVE_NOWPLAYING_MOVIES_SUCCESS,
    nowPlayingMovies: res.data,
  };
}

export function retrieveNowPlayingMovies(page) {
  return async function(dispatch) {
    try {
      let res = await axios.get(
        `${TMDB_URL}/movie/now_playing?api_key=${TMDB_API_KEY}&page=${page}`,
      );
      dispatch(retrieveNowPlayingMoviesSuccess(res));
    } catch (error) {
      console.log('Now Playing', error); //eslint-disable-line
      logErrorRemotely(error);
    }
  };
}

// MOVIES LIST
export function retrieveMoviesListSuccess(res) {
  return {
    type: types.RETRIEVE_MOVIES_LIST_SUCCESS,
    list: res.data,
  };
}

export function retrieveMoviesList(type, page) {
  return async function(dispatch) {
    try {
      let res = await axios.get(
        `${TMDB_URL}/movie/${type}?api_key=${TMDB_API_KEY}&page=${page}&region=US`,
      );
      dispatch(retrieveMoviesListSuccess(res));
    } catch (error) {
      console.log('Movies List', error); //eslint-disable-line
      logErrorRemotely(error);
    }
  };
}

// SEARCH RESULTS
export function retrieveMoviesSearchResultsSuccess(res) {
  return {
    type: types.RETRIEVE_MOVIES_SEARCH_RESULT_SUCCESS,
    searchResults: res.data,
  };
}

export function retrieveMoviesSearchResults(query, page) {
  return async function(dispatch) {
    try {
      let res = await axios.get(
        `${TMDB_URL}/search/movie/?api_key=${TMDB_API_KEY}&query=${query}&page=${page}`,
      );
      dispatch(retrieveMoviesSearchResultsSuccess(res));
    } catch (error) {
      console.log('Movies Search Results', error); //eslint-disable-line
      logErrorRemotely(error);
    }
  };
}

// MOVIE DETAILS
export function retrieveMovieDetailsSuccess(res) {
  return {
    type: types.RETRIEVE_MOVIE_DETAILS_SUCCESS,
    details: res.data,
  };
}

export function retrieveMovieDetails(movieId) {
  return async function(dispatch) {
    try {
      let res = await axios.get(
        `${TMDB_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&append_to_response=casts,images,videos`,
      );
      dispatch(retrieveMovieDetailsSuccess(res));
    } catch (error) {
      console.log('Movie Details', error); //eslint-disable-line
      logErrorRemotely(error);
    }
  };
}
