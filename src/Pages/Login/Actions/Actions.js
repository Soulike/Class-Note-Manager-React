import {LOGIN_FAILED, LOGIN_SUCCESS, SET_OFFLINE, SET_ONLINE} from './ActionTypes';
import {getSHA256, postAsync, requestPrefix} from '../../../Static/Functions';
import * as REGEX from '../../../Static/Regex';
import {browserHistory} from 'react-router';
import {View as Alert} from '../../../Components/Alert';
import {setLocalStorageOfflineToken, setLocalStorageOnlineToken} from '../Functions';

export function login(username, password)
{
    return async (dispatch) =>
    {
        try
        {
            if (!REGEX.USERNAME.test(username))
            {
                dispatch(loginFailed());
                Alert.show('用户名不合法', false);
            }
            else if (!REGEX.PASSWORD.test(password))
            {
                dispatch(loginFailed());
                Alert.show('密码不合法', false);
            }
            else
            {
                const res = await postAsync(requestPrefix('/login'), {
                    username,
                    password: getSHA256(password)
                });
                const {isSuccess, msg} = res;
                if (isSuccess)
                {
                    dispatch(loginSuccess());
                    setLocalStorageOnlineToken();
                    browserHistory.push('/NoteList');
                }
                else
                {
                    dispatch(loginFailed());
                    setLocalStorageOfflineToken();
                }
                Alert.show(msg, isSuccess);
            }
        }
        catch (e)
        {
            dispatch(loginFailed());
            Alert.show('登录失败', false);
            console.log(e);
        }
    };
}

export function loginSuccess()
{
    return {
        type: LOGIN_SUCCESS
    };
}


export function loginFailed()
{
    return {
        type: LOGIN_FAILED
    };
}

export function setOnline()
{
    return {
        type: SET_ONLINE
    };
}


export function setOffline()
{
    return {
        type: SET_OFFLINE
    };
}


