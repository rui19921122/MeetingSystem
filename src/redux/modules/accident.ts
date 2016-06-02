///<reference path="../../../typings/browser.d.ts"/>
/**
 *
 * Created by hanrui on 2016/3/1.
 */
import {createAction, handleAction, handleActions} from 'redux-actions'
import {message} from 'antd'
import {push} from 'react-router-redux'
const UPDATE_UNLEARNED_ACCIDENT = createAction('UPDATE_UNLEARNED_ACCIDENT');
const UPDATE_LEARNED_ACCIDENT = createAction('UPDATE_LEARNED_ACCIDENT');
const get_unlearn_department_accident = ():ReduxThunk.ThunkInterface => {
  return (dispatch, state) => {
    const url = '/api/accident/get-unlearned-accident/';
    fetch(url,{credentials:'include'}).then(response => {
      if (response.status == 200) {
        response.json().then(json => dispatch(UPDATE_UNLEARNED_ACCIDENT(json)))
      } else {
        response.json().then(json => {
          message.error(JSON.parse(json))
        })
      }
    })
  }
};
const SHOW_ADD_ACCIDENT_MODAL = createAction("SHOW_ADD_ACCIDENT_MODAL");
const add_accident = (content:string):ReduxThunk.ThunkInterface => {
  return (dispatch, state) => {
    const url = '/api/accident/accident/';
    fetch(url, {
      method: 'post',
      credentials:'include',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({content: content})
    }).then(response => {
      if (response.status == 201) {
        response.json().then(json => {
          dispatch(SHOW_ADD_ACCIDENT_MODAL(false));
          dispatch(get_unlearn_department_accident())
        })
      } else {
        response.json().then(json => {
          message.error('提交失败，错误码为' + response.status);
          console.log(json)
        })
      }
    })
  }
};
const get_learned_accident = ():ReduxThunk.ThunkInterface => {
  return (dispatch, state) => {
    const url = '/api/accident/accident/';
    fetch(url, {
      credentials:'include',
      method: 'get', headers: {"Content-Type": 'application/json'}}).then(response => {
      if (response.status == 200) {
        response.json().then(json => {
          dispatch(UPDATE_LEARNED_ACCIDENT(json))
        })
      } else {
        response.json().then(json => {
          message.error('获取失败，错误码为' + response.status);
          console.log(json)
        })
      }
    })
  }
};
const delete_accident = (id):ReduxThunk.ThunkInterface => {
  return (dispatch, state) => {
    const url = '/api/accident/accident/' + id + '/';
    fetch(url, {
      credentials:'include',
      method: 'delete', headers: {"Content-Type": 'application/json'}}).then(response => {
      if (response.status >= 200 && response.status < 300) {
        message.success('删除成功');
        dispatch(get_unlearn_department_accident())
      } else {
        response.json().then(json => {
          message.error('提交失败，错误码为' + response.status);
          console.log(json)
        })
      }
    })
  }
};
const delete_files = (id):ReduxThunk.ThunkInterface => {
  return (dispatch, state) => {
    const url = '/api/upload/delete-accident-files/' + id + '/';
    fetch(url, {
      credentials:'include',
      method: 'delete', headers: {"Content-Type": 'application/json'}}).then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(get_unlearn_department_accident())
      } else {
        response.json().then(json => {
          message.error('提交失败，错误码为' + response.status);
          console.log(json)
        })
      }
    })
  }
};

export const actions = {
  get_unlearn_department_accident,
  SHOW_ADD_ACCIDENT_MODAL,
  add_accident,
  delete_accident,
  get_learned_accident,
  delete_files
};
export default handleActions({
  UPDATE_UNLEARNED_ACCIDENT: (state, action) => {
    return Object.assign({}, state, {items: action.payload})
  },
  UPDATE_LEARNED_ACCIDENT: (state, action) => {
    return Object.assign({}, state, {items_learned: action.payload})
  },
  SHOW_ADD_ACCIDENT_MODAL: (state, action) => {
    return Object.assign({}, state, {show_accident: action.payload})
  },

}, {
  items: undefined,
  show_accident: false
})
interface ItemInterface {
  publish_time:string,
  content:string,
  publish_person:string,
  checked_by_first:number,
  checked_by_second:number,
  checked_by_third:number,
  checked_by_forth:number,
  department:number,
  files:{
    id:number,
    file:string,
    upload_date:string,
    filename:string
  }
}
export interface AccidentInterface {
  items:ItemInterface[],
  show_accident:boolean,
  items_learned:ItemInterface[]
}
