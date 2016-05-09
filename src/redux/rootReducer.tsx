import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import counter from './modules/counter'
import worker from './modules/worker'
import menu from './modules/menu'
import login from './modules/login'
import manage_check from './modules/manage-check'
import position from './modules/position'
import study from './modules/study'

export default combineReducers({
  counter,
  router,
  worker,
  menu,
  login,
  manage_check,
  position,
  study
})
