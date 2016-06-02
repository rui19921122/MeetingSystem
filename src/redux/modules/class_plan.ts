///<reference path="../../../typings/browser.d.ts"/>
/**
 *
 * Created by hanrui on 2016/3/1.
 */
import {createAction, handleAction, handleActions} from 'redux-actions'
import {message} from 'antd'
const SelectDateChange = createAction('SelectDateChange');
const UpdateClassPlan = createAction('UpdateClassPlan');
const query_class_plan = ():ReduxThunk.ThunkInterface => {
  return (dispatch, getState)=> {
    const state = getState();
    const date = state.class_plan.select_date;
    const url = '/api/class_plan/classPlan/' + date + '/';
    fetch(url,
      {
        credentials: 'include',
      }
    ).then(response=> {
      if (response.status === 404) {
        dispatch(UpdateClassPlan(null));
      } else if (response.status === 200) {
        response.json().then(json=>dispatch(UpdateClassPlan(json)))
      } else {
        message.error('发生错误，错误码为' + response.status)
      }
    })
  }
};

export const actions = {
  SelectDateChange,
  query_class_plan
};
export default handleActions({
  SelectDateChange: (state, action)=> {
    const date:Date = action.payload;
    const url = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    return Object.assign({}, state, {select_date: url})
  },
  UpdateClassPlan: (state, action)=> {
    return Object.assign({}, state, {items: action.payload})
  }
}, {
  select_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
  items: null
})
interface ItemInterface {
  day_detail:any[]
  lock:boolean
}
export interface ClassPlanInterface {
  select_date:string,
  items:ItemInterface
}
