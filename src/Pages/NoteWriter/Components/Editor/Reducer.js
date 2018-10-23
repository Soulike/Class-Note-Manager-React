import {CONVERT_SUCCESS, CONVERT_FAILED} from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === CONVERT_SUCCESS)
    {
        return {
            ...state,
            html: action.html
        };
    }
    else if (type === CONVERT_FAILED)
    {
        return state;
    }
    else
    {
        return state;
    }
}
