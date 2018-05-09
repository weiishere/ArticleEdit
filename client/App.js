import React, { Component } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import createBrowserHistory from 'history/createBrowserHistory';
import Immutable from 'immutable';
import Bundle from './util/Bundle';
/**
 * 配置 store
 * @param reducers
 * @param initialState
 * @returns {*}
 */
export function configureStore(reducers, initialState) {
    const middleware = [thunk];
    const store = createStore(
        reducers,
        initialState,
        compose(
            applyMiddleware(...middleware)
        ));

    return store;
}


const createSelectLocationState = () => {
    let prevRoutingState, prevRoutingStateJS;
    return (state) => {
        const routingState = state.get('routing'); // or state.routing
        if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
            prevRoutingState = routingState;
            prevRoutingStateJS = routingState.toJS();
        }
        return prevRoutingStateJS;
    };
}
const App = ({ routes, reducers, basename }) => {
    // //初始化 store
    const store = configureStore(reducers, Immutable.fromJS({}));
    return <Provider store={store}>
        <Router>
            {routes({ history, location })}
        </Router>
    </Provider>;
};

App.propTypes = {
    routes: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    reducers: PropTypes.func,
    basename: PropTypes.string
};

export default App;
