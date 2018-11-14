import Store from '../../Store';
import {View as Alert} from '../../Components/Alert';
import {loginFailed, loginSuccess} from './Actions/Actions';
import {getAsync, localStorageGet, localStorageSet, requestPrefix} from '../../Static/Functions';

export function requireLogin(nextState, replace)
{
    const hasLoggedIn = Store.getState()['Login'].hasLoggedIn || localStorageGet('hasLoggedIn');
    if (!hasLoggedIn)
    {
        replace('/Login');
        Alert.show('请先登录', false);
    }

    checkSession();
}

export function checkSession()
{
    getAsync(requestPrefix('/validSession'), false)
        .then(res =>
        {
            const {isSuccess, msg, data} = res;
            if (!isSuccess)
            {
                setLocalStorageOfflineItem();
                Store.dispatch(loginFailed());
            }
            else
            {
                setLocalStorageOnlineItem();
                Store.dispatch(loginSuccess());
            }
        })
        .catch(e =>
        {
            console.log(e);
        });
}

export function setLocalStorageOnlineItem()
{
    localStorageSet('hasLoggedIn', true);
}

export function setLocalStorageOfflineItem()
{
    localStorageSet('hasLoggedIn', false);
}
