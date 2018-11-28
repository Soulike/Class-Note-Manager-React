import React, {Component} from 'react';
import style from './SignUp.module.scss';
import * as REGEX from '../../Static/Regex';
import {View as Title} from '../../Components/Title';
import {checkSession} from '../Login/Functions';
import {View as Alert} from '../../Components/Alert';
import {getSHA256, postAsync, requestPrefix} from '../../Static/Functions';
import {browserHistory, Link} from 'react-router';

class SignUp extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            username: '',
            password: '',
            repeatPassword: ''
        };
    }

    componentDidMount()
    {
        checkSession();
    }


    onUsernameChange = (e) =>
    {
        e.preventDefault();
        this.setState({
            username: e.target.value
        });
    };

    onPasswordChange = (e) =>
    {
        e.preventDefault();
        this.setState({
            password: e.target.value
        });
    };

    onRepeatPasswordChange = (e) =>
    {
        e.preventDefault();
        this.setState({
            repeatPassword: e.target.value
        });
    };

    onSubmit = (e) =>
    {
        e.preventDefault();
        const {username, password, repeatPassword} = this.state;
        if (password !== repeatPassword)
        {
            Alert.show('两个密码不一致', password);
        }
        else if (!REGEX.USERNAME.test(username))
        {
            Alert.show('用户名不合法', password);
        }
        else if (!REGEX.PASSWORD.test(password))
        {
            Alert.show('密码不合法', password);
        }
        else
        {
            postAsync(requestPrefix('/signUp'), {username, password: getSHA256(password)})
                .then(res =>
                {
                    const {isSuccess, msg} = res;
                    Alert(msg, isSuccess);
                    if (isSuccess)
                    {
                        browserHistory.push('/Login');
                    }
                })
                .catch(e =>
                {
                    console.log(e);
                    Alert.show('注册失败，请重试', false);
                });
        }
    };


    render()
    {
        return (
            <div className={style.SignUp}>
                <Title text={'注册'}/>
                <form action="#" className={style.form}>
                    <input type="text"
                           placeholder={'用户名'}
                           className={style.input}
                           autoFocus={true}
                           onChange={this.onUsernameChange}/>
                    <input type="password" placeholder={'密码'} className={style.input} onChange={this.onPasswordChange}/>
                    <input type="password" placeholder={'重复密码'} className={style.input}
                           onChange={this.onRepeatPasswordChange}/>
                    <button className={style.submitButton} onClick={this.onSubmit}>注册</button>
                </form>
                <div className={style.hint}>
                    已有账号？<Link to={'/login'}>登录</Link>
                </div>
            </div>
        );
    }
}

export default SignUp;