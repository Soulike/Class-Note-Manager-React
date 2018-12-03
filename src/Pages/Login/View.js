import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as Actions from './Actions/Actions';
import {View as Title} from '../../Components/Title';
import style from './Login.module.scss';
import {Link} from 'react-router';

class Login extends Component
{
    constructor()
    {
        super(...arguments);
        this.state = {
            username: '',
            password: ''
        };
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

    onSubmit = (e) =>
    {
        e.preventDefault();
        const {username, password} = this.state;
        const {login} = this.props;
        login(username, password);
    };

    render()
    {
        return (
            <div className={style.Login}>
                <Title text={'登录'}/>
                <form action="#" className={style.form}>
                    <input type="text"
                           placeholder={'用户名'}
                           className={style.input}
                           autoFocus={true}
                           onChange={this.onUsernameChange}/>
                    <input type="password" placeholder={'密码'} className={style.input} onChange={this.onPasswordChange}/>
                    <button className={style.submitButton} onClick={this.onSubmit}>登录</button>
                </form>
                <div className={style.hint}>
                    没有账号？<Link to={'/signUp'}>注册</Link>一个
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) =>
{
    return {
        login: (username, password) =>
        {
            dispatch(Actions.login(username, password));
        }
    };
};

export default connect(null, mapDispatchToProps)(Login);
