///<reference path="../../../typings/browser.d.ts"/>

/**
 *
 * Created by HanRui on 2016/4/15.
 */

import {createAction, handleActions} from "redux-actions";
import {message} from 'antd'
import {stat} from "fs";
import {push} from 'react-router-redux';
let BeginGetPositionData = createAction('BeginGetPositionData');
let FinishGetPositionData = createAction('FinishGetPositionData');
let GetPositionData = (): ReduxThunk.ThunkInterface => (
  // 获取本部门所有职位数
    (dispatch: Redux.Dispatch, state: () => any) => {
        let url = '/api/worker/position/';
        fetch(url).then(response => {
            switch (response.status) {
                case 200:
                    response.json().then(json=>dispatch(FinishGetPositionData(json)));
                    break;
                case 403:
                    console.log(111);
                    dispatch(push('/login'));
                    break;
                default:
                    message.error(response.json().toString());
                    FinishGetPositionData()
            }
        })
    }
);
export let actions = {
    BeginGetPositionData,
    FinishGetPositionData,
    GetPositionData
};
export default handleActions({
    BeginGetPositionData: (state, action) => {
        return state
    },
    FinishGetPositionData: (state, action) => {
        return Object.assign({},state,{position:action.payload})
    },
},
    {position:{}})
export interface position_store {
  position:{id:number,class_number:number,figures:any[],name:string,is_study:boolean,alter:boolean,position:number}[]
}
