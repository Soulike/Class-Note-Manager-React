import {LOGIN_FAILED, LOGIN_SUCCESS, SET_OFFLINE, SET_ONLINE} from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === LOGIN_SUCCESS || type === SET_ONLINE)
    {
        return {
            ...state,
            hasLoggedIn: true
        };
    }
    else if (type === LOGIN_FAILED || type === SET_OFFLINE)
    {
        return {
            ...state,
            hasLoggedIn: false
        };
    }
    else
    {
        return state;
    }
}
