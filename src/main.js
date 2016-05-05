"use strict";
const React = require('react');
const ReactDOM = require('react-dom');
const createBrowserHistory = require('history/lib/createBrowserHistory');
const react_router_1 = require('react-router');
const react_router_redux_1 = require('react-router-redux');
const index_1 = require('./routes/index');
const Root_1 = require('./containers/Root');
const configureStore_1 = require('./redux/configureStore');
require('antd/lib/index.css');
let __BASENAME__;
const browserHistory = react_router_1.useRouterHistory(createBrowserHistory)({
    basename: __BASENAME__
});
const initialState = window.__INITIAL_STATE__;
const store = configureStore_1.default(initialState, browserHistory);
const history = react_router_redux_1.syncHistoryWithStore(browserHistory, store, {
    selectLocationState: (state) => state.router
});
const routes = index_1.default(store);
ReactDOM.render(React.createElement(Root_1.default, {history: history, routes: routes, store: store}), document.getElementById('root'));
//# sourceMappingURL=main.js.map