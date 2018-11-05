import {CONVERT_FAILED, CONVERT_SUCCESS} from './Actions/ActionTypes';

export default (state = {}, action) =>
{
    const {type} = action;
    if (type === CONVERT_SUCCESS)
    {
        return {
            ...state,
            innerHTML: action.innerHTML
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
