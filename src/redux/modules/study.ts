///<reference path="../../../typings/browser.d.ts"/>
/**
 *
 * Created by hanrui on 2016/3/1.
 */
import {createAction, handleAction, handleActions} from 'redux-actions'
import {message} from 'antd'
import {push} from 'react-router-redux'
const UPDATE_UNLEARNED_STUDY = createAction('UPDATE_UNLEARNED_STUDY')
const get_unlearn_department_study = (): ReduxThunk.ThunkInterface => {
    return (dispatch, state) => {
        const url = '/api/study/get-unlearned-study/'
        fetch(url).then(response => {
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

export const actions = {
    get_unlearn_department_study,
}
export default handleActions({
  UPDATE_UNLEARNED_STUDY: (state,action)=>{
    return Object.assign({},state,{items:action.payload})
  }
}, {
    items: undefined
})
interface ItemInterface{
	publish_time: string,
	title: string,
	answer: string,
	publish_person: string,
	checked_by_first: number,
	checked_by_second:number,
	checked_by_third:number,
	checked_by_forth:number,
	department: number
}
export interface StudyInterface{
	items:ItemInterface[]
}
