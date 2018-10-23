import {CONVERT_SUCCESS, CONVERT_FAILED} from './ActionTypes';
import {postAsync, requestPrefix} from '../../../../../Static/Functions';

export function convert(markdown)
{
    return async dispatch =>
    {
        try
        {
            const {isSuccess, msg, data} = await postAsync(requestPrefix('/noteConvert'), {markdown});
            if (isSuccess)
            {
                dispatch(convertSuccess(data));
            }
            else
            {
                convertFailed();
                console.log(msg);
            }
        }
        catch (e)
        {
            console.log(e);
        }
    };
}

export function convertSuccess(html)
{
    return {
        type: CONVERT_SUCCESS,
        innerHTML: html
    };
}

export function convertFailed()
{
    return {
        type: CONVERT_FAILED
    };
}
