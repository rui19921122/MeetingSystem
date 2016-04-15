///<reference path="../../typings/browser.d.ts"/>

import {applyMiddleware, compose, createStore} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import {routerMiddleware} from 'react-router-redux'
interface Window { devToolsExtension: any; }

export default function configureStore(initialState = {}, history) {
  // Compose final middleware and use devtools in debug environment
  let middleware = applyMiddleware(thunk, routerMiddleware(history))
  let __DEBUG__
  if (__DEBUG__) {
    const devTools = window['devToolsExtension']
      ? (window as any).devToolsExtension()
      : require('containers/DevTools').default.instrument()
    middleware = compose(middleware, devTools)
  }

  // Create final store and subscribe router in debug env ie. for devtools
  const store = middleware(createStore)(rootReducer, initialState)

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer').default

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
