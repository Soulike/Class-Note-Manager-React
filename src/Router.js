import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {requireLogin} from './Static/Functions';
import {View as Root} from './Pages/Root';
import {View as NoteList} from './Pages/NoteList';
import {View as Login} from './Pages/Login';
import {View as NoteWriter} from './Pages/NoteWriter';
import {View as NoteReader} from './Pages/NoteReader';

// 所有页面的 View 在此处导入


const Routes = () => (
    <Router history={browserHistory}>
        <Route path={'/'} component={Root}>
            <IndexRoute component={Login}/>
            <Route path={'/NoteList'} component={NoteList} onEnter={requireLogin}/>
            <Route path={'/Login'} component={Login}/>
            <Route path={'/NoteWriter'} component={NoteWriter} onEnter={requireLogin}/>
            <Route path={'/NoteReader'} component={NoteReader} onEnter={requireLogin}/>
        </Route>
    </Router>
);

export default Routes;
