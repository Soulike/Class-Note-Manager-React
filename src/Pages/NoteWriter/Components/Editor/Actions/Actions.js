import {CONVERT_FAILED, CONVERT_SUCCESS} from './ActionTypes';
import showdown from 'showdown';

export function convert(markdown)
{
    return async dispatch =>
    {
        const converter = new showdown.Converter();
        dispatch(convertSuccess(converter.makeHtml(markdown)));
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
