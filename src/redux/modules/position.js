///<reference path="../../../typings/browser.d.ts"/>
"use strict";
/**
 *
 * Created by HanRui on 2016/4/15.
 */
const redux_actions_1 = require("redux-actions");
const antd_1 = require('antd');
const react_router_redux_1 = require('react-router-redux');
let BeginGetPositionData = redux_actions_1.createAction('BeginGetPositionData');
let FinishGetPositionData = redux_actions_1.createAction('FinishGetPositionData');
let GetPositionData = () => (
// 获取本部门所有职位数
// 获取本部门所有职位数
    (dispatch, state) => {
    let url = '/api/worker/position/';
    fetch(url, {
        credentials: 'include',
    }).then(response => {
        switch (response.status) {
            case 200:
                response.json().then(json => dispatch(FinishGetPositionData(json)));
                break;
            case 403:
                console.log(111);
                dispatch(react_router_redux_1.push('/login'));
                break;
            default:
                antd_1.message.error(response.json().toString());
                FinishGetPositionData();
        }
    });
});
exports.actions = {
    BeginGetPositionData: BeginGetPositionData,
    FinishGetPositionData: FinishGetPositionData,
    GetPositionData: GetPositionData
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    BeginGetPositionData: (state, action) => {
        return state;
    },
    FinishGetPositionData: (state, action) => {
        return Object.assign({}, state, { position: action.payload });
    },
}, { position: {} });
//# sourceMappingURL=position.js.map