import {LOGIN_FAILED, LOGIN_SUCCESS} from './ActionTypes';
import {getHash, postAsync, requestPrefix} from '../../../Static/Functions';
import {browserHistory} from 'react-router';
import {View as Alert} from '../../../Components/Alert';
import {setLocalStorageOfflineItem, setLocalStorageOnlineItem} from '../Functions';

export function login(username, password)
{
    return async (dispatch) =>
    {
        try
        {
            if (username.length === 0)
            {
                dispatch(loginFailed());
                Alert.show('用户名不可为空', false);
            }
            else if (password.length === 0)
            {
                dispatch(loginFailed());
                Alert.show('密码不可为空', false);
            }
            else
            {
                const res = await postAsync(requestPrefix('/login'), {
                    username,
                    password: getHash(`${username}${password}`, 'sha256')
                });
                const {isSuccess, msg} = res;
                if (isSuccess)
                {
                    browserHistory.push('/NoteList');
                    dispatch(loginSuccess());
                    setLocalStorageOnlineItem();
                }
                else
                {
                    dispatch(loginFailed());
                    setLocalStorageOfflineItem();
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


