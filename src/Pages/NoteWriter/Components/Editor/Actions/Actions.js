import {CONVERT_FAILED, CONVERT_SUCCESS} from './ActionTypes';
import {postAsync, requestPrefix} from '../../../../../Static/Functions';
import {View as Alert} from '../../../../../Components/Alert';

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
                Alert.show(msg, false);
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
