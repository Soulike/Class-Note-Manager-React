import Store from '../../Store';
import {View as Alert} from '../../Components/Alert';
import {loginFailed, loginSuccess} from './Actions/Actions';
import {getAsync, requestPrefix} from '../../Static/Functions';

export function requireLogin(nextState, replace)
{
    const {hasLoggedIn} = Store.getState()['Login'];
    if (!hasLoggedIn)
    {
        replace('/Login');
        Alert.show('请先登录', false);

        getAsync(requestPrefix('/validSession'), false)
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (!isSuccess)
                {
                    Store.dispatch(loginFailed());
                }
                else
                {
                    Store.dispatch(loginSuccess());
                }
            })
            .catch(e =>
            {
                console.log(e);
            });
    }
}
