///<reference path="../typings/browser.d.ts"/>

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as createBrowserHistory from 'history/lib/createBrowserHistory'
import {useRouterHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import makeRoutes from './routes/index'
import Root from './containers/Root'
import configureStore from './redux/configureStore'
import 'antd/lib/index.css'

// Configure history for react-router
let __BASENAME__;
const browserHistory = useRouterHistory(createBrowserHistory as any)({
  basename: __BASENAME__
})
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the key "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = (window as any).__INITIAL_STATE__
const store = configureStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
}) as any

// Now that we have the Redux store, we can create our routes. We provide
// the store to the route definitions so that routes have access to it for
// hooks such as `onEnter`.
const routes = makeRoutes(store)

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!

ReactDOM.render(
  <Root history={history} routes={routes} store={store}/>,
  document.getElementById('root')
)
