import { combineReducers } from 'redux';
import movies from './movieReducer';
import auth from './authReducer';

export default combineReducers({ movies, auth });
