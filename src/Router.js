import React from 'react';
import {browserHistory, IndexRedirect, Route, Router} from 'react-router';
import {Functions as LoginFunctions, View as Login} from './Pages/Login';
import {View as SignUp} from './Pages/SignUp';
import {View as Root} from './Pages/Root';
import {View as NoteList} from './Pages/NoteList';
import {View as NoteWriter} from './Pages/NoteWriter';
import {View as NoteReader} from './Pages/NoteReader';

// 所有页面的 View 在此处导入


const Routes = () => (
    <Router history={browserHistory}>
        <Route path={'/'} component={Root}>
            <IndexRedirect to={'/NoteList'}/>
            <Route path={'/Login'} component={Login}/>
            <Route path={'/SignUp'} component={SignUp}/>
            <Route path={'/NoteList'} component={NoteList} onEnter={LoginFunctions.requireLogin}/>
            <Route path={'/NoteWriter'} component={NoteWriter} onEnter={LoginFunctions.requireLogin}/>
            <Route path={'/NoteReader'} component={NoteReader} onEnter={LoginFunctions.requireLogin}/>
        </Route>
    </Router>
);

export default Routes;
