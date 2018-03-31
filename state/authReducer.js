import * as types from '../constants/ActionTypes';

export default function(state={}, action){
    switch(action.type){
        case types.FACEBOOK_LOGIN_SUCCESS:
            return {token: action.payload};
        case types.FACEBOOK_LOGIN_FAIL:
            return {token: null};
        case types.USER_LOGOUT_SUCCESS:
            return state
        case types.USER_LOGOUT_FAIL:
            return state
        default:
            return state;
    }
}