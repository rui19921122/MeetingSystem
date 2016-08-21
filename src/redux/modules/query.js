/**
 * Created by Administrator on 2016/8/20.
 */
"use strict";
const redux_actions_1 = require('redux-actions');
const antd_1 = require('antd');
const UpdateListData = redux_actions_1.createAction("UpdateListData");
const UpdateDatePicker = redux_actions_1.createAction("UpdateDatePicker");
const parse_data = (value, type) => {
    if (value) {
        return type + '=' + value.getFullYear() + '-' + (value.getMonth() + 1) + '-' + value.getDate() + '&';
    }
    else {
        return '';
    }
};
const GetQueryData = () => ((dispatch, state) => {
    let _state = state().query_list;
    if (_state.start && !_state.end) {
        antd_1.message.error("当指定开始时间时，必须同时指定结束时间");
        return;
    }
    if (_state.end && !_state.start) {
        antd_1.message.error("当指定结束时间时，必须同时指定开始时间");
        return;
    }
    if (_state.end < _state.start) {
        antd_1.message.error("结束时间不能小于开始时间");
        return;
    }
    const url = `/api/query/query-call-over/?${parse_data(_state.start, 'start')}${parse_data(_state.end, 'end')}department=${_state.current_department}`;
    fetch(url, {
        credentials: 'include',
        method: 'get',
    }).then(response => {
        if (response.status == 200) {
            response.json().then((json) => {
                dispatch(UpdateListData(json));
            });
        }
        else {
            response.json().then(json => antd_1.message.error(JSON.stringify(json)));
        }
    });
    return;
});
const ChangeCurrentDepartment = redux_actions_1.createAction("ChangeCurrentDepartment");
exports.actions = {
    GetQueryData: GetQueryData,
    ChangeCurrentDepartment: ChangeCurrentDepartment,
    UpdateListData: UpdateListData,
    UpdateDatePicker: UpdateDatePicker
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    UpdateListData: (state, action) => {
        let obj = Object.assign({}, state, {
            department_can_select: action.payload['department_can_query'],
            fetching: false,
            data: action.payload['call_over_list'],
        });
        if (state.current_department) {
            return obj;
        }
        else {
            let current = action.payload['department_can_query'][0]['id'];
            return Object.assign({}, obj, { current_department: current });
        }
    },
    ChangeCurrentDepartment: (state, action) => {
        return Object.assign({}, state, { current_department: action.payload });
    },
    UpdateDatePicker: (state, action) => {
        if (action.payload.type == 'start') {
            return Object.assign({}, state, { start: action.payload.value });
        }
        else if (action.payload.type == 'end') {
            return Object.assign({}, state, { end: action.payload.value });
        }
    },
}, {
    fetching: false,
    department_can_select: [],
    current_department: undefined,
    data: undefined,
    start: undefined,
    end: undefined
});
//# sourceMappingURL=query.js.map