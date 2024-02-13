import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer.js';
import thunk from 'redux-thunk';

const extension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, extension(applyMiddleware(thunk)));

export default store;