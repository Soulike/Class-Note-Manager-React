import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';

import LoginReducer from './Pages/Login/Reducer';
import {Reducer as NoteWriterEditorReducer} from './Pages/NoteWriter/Components/Editor';

// Store 中的初始值，根据开发需要进行改变
const initValues = {
    Login: {
        hasLoggedIn: false
    },
    NoteWriterEditor: {
        innerHTML: ''
    }
};

// 所有中间件放在此处
const middleWares = [thunk];

const storeEnhancers = compose(
    applyMiddleware(...middleWares)
);

// 所有 Reducer 放在此处
const Reducer = combineReducers({
    Login: LoginReducer,
    NoteWriterEditor: NoteWriterEditorReducer
});

export default createStore(Reducer, initValues, storeEnhancers);
