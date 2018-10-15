import React from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Root from './Pages/Root/View';

// 所有页面的 View 在此处导入


const Routes = () => (
    <Router history={browserHistory}>
        <Route path={'/'} component={Root}>

        </Route>
    </Router>
);

export default Routes;
