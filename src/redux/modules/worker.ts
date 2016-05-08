///<reference path="../../../typings/browser.d.ts"/>

/**
 *
 * Created by HanRui on 2016/4/15.
 */

import {createAction, handleActions} from "redux-actions";
import {message} from 'antd'
import {stat} from "fs";
import {push} from 'react-router-redux';
let BeginGetData = createAction('BeginGetData');
let FinishGetData = createAction('FinishGetData');
let GetData = (): ReduxThunk.ThunkInterface => (
  // 获取本部门所有职工数
    (dispatch: Redux.Dispatch, state: () => any) => {
        let url = '/api/worker/worker/';
        fetch(url).then(response => {
            switch (response.status) {
                case 200:
                    response.json().then(json=>dispatch(FinishGetData(json)));
                    break;
                case 403:
                    console.log(111);
                    dispatch(push('/login'));
                    break;
                default:
                    message.error(response.json().toString());
                    FinishGetData()
            }
        })
    }
);
export let actions = {
    BeginGetData,
    FinishGetData,
    GetData,
};
export default handleActions({
    BeginGetData: (state, action) => {
        return state
    },
    FinishGetData: (state, action) => {
        return Object.assign({},state,{person:action.payload})
    },
},
    {person:{}})
export interface worker_store {
  person:{id:number,class_number:number,figures:any[],name:string,is_study:boolean,alter:boolean,position:number}[]
}
