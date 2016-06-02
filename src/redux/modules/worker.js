///<reference path="../../../typings/browser.d.ts"/>
"use strict";
/**
 *
 * Created by HanRui on 2016/4/15.
 */
const redux_actions_1 = require("redux-actions");
const antd_1 = require('antd');
const react_router_redux_1 = require('react-router-redux');
let BeginGetData = redux_actions_1.createAction('BeginGetData');
let FinishGetData = redux_actions_1.createAction('FinishGetData');
let GetData = () => (
// 获取本部门所有职工数
// 获取本部门所有职工数
    (dispatch, state) => {
    let url = '/api/worker/worker/';
    fetch(url, {
        credentials: 'include',
    }).then(response => {
        switch (response.status) {
            case 200:
                response.json().then(json => dispatch(FinishGetData(json)));
                break;
            case 403:
                console.log(111);
                dispatch(react_router_redux_1.push('/login'));
                break;
            default:
                antd_1.message.error(response.json().toString());
                FinishGetData();
        }
    });
});
exports.actions = {
    BeginGetData: BeginGetData,
    FinishGetData: FinishGetData,
    GetData: GetData,
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    BeginGetData: (state, action) => {
        return state;
    },
    FinishGetData: (state, action) => {
        return Object.assign({}, state, { person: action.payload });
    },
}, { person: {} });
//# sourceMappingURL=worker.js.map