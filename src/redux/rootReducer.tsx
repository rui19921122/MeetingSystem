import {combineReducers} from 'redux'
import {routerReducer as router} from 'react-router-redux'
import counter from './modules/counter'
import worker from './modules/worker'
import menu from './modules/menu'
import login from './modules/login'
import manage_check from './modules/manage-check'
import position from './modules/position'
import study from './modules/study'
import accident from './modules/accident'
import class_plan from './modules/class_plan'
import query_list from './modules/query';
import query_detail from './modules/query_detail'

export default combineReducers({
  counter,
  router,
  worker,
  menu,
  login,
  manage_check,
  position,
  study,
  accident,
  class_plan,
  query_list,
  query_detail
})
