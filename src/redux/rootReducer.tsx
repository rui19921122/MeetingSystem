import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import worker from './modules/worker'

export default combineReducers({
  counter,
  router,
  worker
})
