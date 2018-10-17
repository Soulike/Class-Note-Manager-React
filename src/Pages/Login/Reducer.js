import {LOGIN_SUCCESS, LOGIN_FAILED} from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === LOGIN_SUCCESS)
    {
        return {
            ...state,
            hasLoggedIn: true
        };
    }
    else if (type === LOGIN_FAILED)
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
