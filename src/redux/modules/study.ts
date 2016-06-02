///<reference path="../../../typings/browser.d.ts"/>
/**
 *
 * Created by hanrui on 2016/3/1.
 */
import {createAction, handleAction, handleActions} from 'redux-actions'
import {message} from 'antd'
import {push} from 'react-router-redux'
const UPDATE_UNLEARNED_STUDY = createAction('UPDATE_UNLEARNED_STUDY')
const UPDATE_LEARNED_STUDY = createAction('UPDATE_LEARNED_STUDY')
const get_unlearn_department_study = (): ReduxThunk.ThunkInterface => {
    return (dispatch, state) => {
        const url = '/api/study/get-unlearned-study/'
      fetch(url, {
        credentials: 'include',
      }).then(response => {
            if (response.status == 200) {
                response.json().then(json => dispatch(UPDATE_UNLEARNED_STUDY(json)))
            } else {
                response.json().then(json => {
                    message.error(JSON.parse(json))
                })
            }
        })
    }
}
const SHOW_ADD_STUDY_MODAL = createAction("SHOW_ADD_STUDY_MODAL")
const add_study = (question:string, answer:string = ''):ReduxThunk.ThunkInterface => {
  return (dispatch, state) => {
    const url = '/api/study/professional-study/'
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {"Content-Type": 'application/json'},
      body: JSON.stringify({answer: answer, title: question})
    }).then(response => {
      if (response.status == 201) {
        response.json().then(json => {
          dispatch(SHOW_ADD_STUDY_MODAL(false))
          dispatch(get_unlearn_department_study())
        })
      } else {
        response.json().then(json => {
          message.error('提交失败，错误码为' + response.status)
          console.log(json)
        })
      }
    })
  }
}
const get_learned_study = ():ReduxThunk.ThunkInterface => {
  return (dispatch, state) => {
    const url = '/api/study/professional-study/'
    fetch(url, {
      credentials:'include',
      method: 'get', headers: {"Content-Type": 'application/json'}}).then(response => {
      if (response.status == 200) {
        response.json().then(json => {
          dispatch(UPDATE_LEARNED_STUDY(json))
        })
      } else {
        response.json().then(json => {
          message.error('获取失败，错误码为' + response.status)
          console.log(json)
        })
      }
    })
  }
}
const delete_study = (id):ReduxThunk.ThunkInterface => {
  return (dispatch, state) => {
    const url = '/api/study/professional-study/' + id
    fetch(url, {
      credentials:'include',
      method: 'delete', headers: {"Content-Type": 'application/json'}}).then(response => {
      if (response.status >= 200 && response.status < 300) {
        dispatch(get_unlearn_department_study())
      } else {
        response.json().then(json => {
          message.error('提交失败，错误码为' + response.status)
          console.log(json)
        })
      }
    })
  }
}

export const actions = {
    get_unlearn_department_study,
  SHOW_ADD_STUDY_MODAL,
  add_study,
  delete_study,
  get_learned_study
}
export default handleActions({
  UPDATE_UNLEARNED_STUDY: (state, action) => {
    return Object.assign({}, state, {items: action.payload})
  },
  UPDATE_LEARNED_STUDY: (state, action) => {
    return Object.assign({}, state, {items_learned: action.payload})
  },
  SHOW_ADD_STUDY_MODAL: (state, action) => {
    return Object.assign({}, state, {show_study: action.payload})
  },

}, {
  items: undefined,
  show_study: false
})
interface ItemInterface {
  publish_time:string,
  title:string,
  answer:string,
  publish_person:string,
  checked_by_first:number,
  checked_by_second:number,
  checked_by_third:number,
  checked_by_forth:number,
  department:number
}
export interface StudyInterface {
  items:ItemInterface[],
  show_study:boolean,
  items_learned:ItemInterface[]
}
