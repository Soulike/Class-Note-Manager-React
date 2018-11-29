import Store from '../../Store';
import {View as Alert} from '../../Components/Alert';
import {setOffline, setOnline} from './Actions/Actions';
import {getAsync, localStorageGet, localStorageRemove, localStorageSet, requestPrefix} from '../../Static/Functions';

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
            const {isSuccess} = res;
            if (!isSuccess)
            {
                setLocalStorageOfflineToken();
                Store.dispatch(setOffline());
            }
            else
            {
                setLocalStorageOnlineToken();
                Store.dispatch(setOnline());
            }
        })
        .catch(e =>
        {
            console.log(e);
        });
}

export function setLocalStorageOnlineToken()
{
    localStorageSet('hasLoggedIn', true.toString());
}

export function setLocalStorageOfflineToken()
{
    localStorageRemove('hasLoggedIn');
}
