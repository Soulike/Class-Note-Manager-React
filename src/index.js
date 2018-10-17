import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import {Provider} from 'react-redux';
import Routes from './Router';
import Store from './Store';

ReactDOM.render(
    <Provider store={Store}>
        <Routes/>
    </Provider>,
    document.getElementById('root')
);


