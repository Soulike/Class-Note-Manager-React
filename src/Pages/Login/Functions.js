import Store from '../../Store';
import {View as Alert} from '../../Components/Alert';
import {loginFailed, loginSuccess} from './Actions/Actions';
import {getAsync, requestPrefix} from '../../Static/Functions';

export function requireLogin(nextState, replace)
{
    const {hasLoggedIn} = Store.getState()['Login'];
    console.log(Store.getState());
    if (!hasLoggedIn)
    {
        getAsync(requestPrefix('/validSession'), false)
            .then(res =>
            {
                const {isSuccess, msg, data} = res;
                if (!isSuccess)
                {
                    Alert.show('请先登录', false);
                    replace('/Login');
                    Store.dispatch(loginFailed());
                }
                else
                {
                    Store.dispatch(loginSuccess());
                }
            })
            .catch(e =>
            {
                Alert.show('无法连接到服务器', false);
                replace('/Login');
                console.log(e);
            });
    }
}
