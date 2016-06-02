"use strict";
///<reference path="../../../typings/browser.d.ts"/>
/**
 *
 * Created by hanrui on 2016/3/1.
 */
const redux_actions_1 = require('redux-actions');
const antd_1 = require('antd');
const SelectDateChange = redux_actions_1.createAction('SelectDateChange');
const UpdateClassPlan = redux_actions_1.createAction('UpdateClassPlan');
const query_class_plan = () => {
    return (dispatch, getState) => {
        const state = getState();
        const date = state.class_plan.select_date;
        const url = '/api/class_plan/classPlan/' + date + '/';
        fetch(url, {
            credentials: 'include',
        }).then(response => {
            if (response.status === 404) {
                dispatch(UpdateClassPlan(null));
            }
            else if (response.status === 200) {
                response.json().then(json => dispatch(UpdateClassPlan(json)));
            }
            else {
                antd_1.message.error('发生错误，错误码为' + response.status);
            }
        });
    };
};
exports.actions = {
    SelectDateChange: SelectDateChange,
    query_class_plan: query_class_plan
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    SelectDateChange: (state, action) => {
        const date = action.payload;
        const url = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        return Object.assign({}, state, { select_date: url });
    },
    UpdateClassPlan: (state, action) => {
        return Object.assign({}, state, { items: action.payload });
    }
}, {
    select_date: new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
    items: null
});
//# sourceMappingURL=class_plan.js.map