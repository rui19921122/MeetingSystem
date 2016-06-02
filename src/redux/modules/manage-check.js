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
let ChangeDatePicker = redux_actions_1.createAction('ChangeDatePicker');
let ChangeSelect = redux_actions_1.createAction('ChangeSelect');
let showModal = redux_actions_1.createAction('showModal');
let GetData = (date, classNumber) => ((dispatch, getState) => {
    let state = getState();
    let url = '/api/call_over/get-call-over-person/?';
    url = url + 'date=' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    url = url + '&day-number=' + classNumber;
    fetch(url, { credentials: 'include', }).then(response => {
        switch (response.status) {
            case 200:
                response.json().then(json => dispatch(FinishGetData({ sucess: true, data: json })));
                break;
            case 403:
                dispatch(react_router_redux_1.push('/login'));
                break;
            default:
                antd_1.message.error(response.json().toString());
                FinishGetData({ sucess: false });
        }
    });
});
let DeleteData = (id) => ((dispatch, getState) => {
    let url = `/api/call_over/update-call-over-person/${id}`;
    fetch(url, { method: 'delete' }).then(response => {
        if (response.status != 202) {
            antd_1.message.error("删除失败");
        }
        else {
            let state = getState();
            dispatch(GetData(state.manage_check.selectDate, state.manage_check.selectClassName));
        }
    });
});
let ReplaceData = (id, replace) => ((dispatch, getState) => {
    let url = `/api/call_over/update-call-over-person/${id}`;
    fetch(url, {
        method: 'post',
        credentials: 'include',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ replace: replace })
    }).then(response => {
        if (response.status != 202) {
            antd_1.message.error("替换失败");
        }
        else {
            let state = getState();
            dispatch(GetData(state.manage_check.selectDate, state.manage_check.selectClassName));
            antd_1.message.success("替换成功");
            dispatch(showModal(false));
        }
    });
});
let AddData = (id, position, worker) => ((dispatch, getState) => {
    let url = `/api/call_over/add-call-over-person/${id}/`;
    fetch(url, {
        credentials: 'include',
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ position: position, worker: worker })
    }).then(response => {
        if (response.status != 201) {
            antd_1.message.error("增加失败");
        }
        else {
            let state = getState();
            dispatch(GetData(state.manage_check.selectDate, state.manage_check.selectClassName));
            antd_1.message.success("增加成功");
            dispatch(AddModalShow(false));
        }
    });
});
let ChangeReplaceId = redux_actions_1.createAction('ChangeReplaceId');
let AddModalShow = redux_actions_1.createAction('AddModalShow');
exports.actions = {
    BeginGetData: BeginGetData,
    FinishGetData: FinishGetData,
    GetData: GetData,
    ChangeDatePicker: ChangeDatePicker,
    ChangeSelect: ChangeSelect,
    DeleteData: DeleteData,
    ReplaceData: ReplaceData,
    showModal: showModal,
    ChangeReplaceId: ChangeReplaceId,
    AddModalShow: AddModalShow,
    AddData: AddData
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    BeginGetData: (state, action) => {
        return Object.assign({}, state, { fetching: true });
    },
    FinishGetData: (state, action) => {
        if (action.payload.sucess) {
            let list = [];
            for (let i of action.payload.data.attend.person) {
                list.push(i.id);
            }
            return Object.assign({}, state, { fetching: false, person_list: list, items: action.payload.data.attend, replace: action.payload.data.replace });
        }
        else {
            return Object.assign({}, state, { fetching: false });
        }
    },
    ChangeDatePicker: (state, action) => {
        return Object.assign({}, state, { selectDate: action.payload });
    },
    ChangeSelect: (state, action) => {
        return Object.assign({}, state, { selectClassName: action.payload });
    },
    showModal: (state, action) => {
        return Object.assign({}, state, { showModal: action.payload['visiable'], modalSelect: action.payload['id'] });
    },
    AddModalShow: (state, action) => {
        return Object.assign({}, state, { addModalShow: action.payload });
    },
    ChangeReplaceId: (state, action) => {
        return Object.assign({}, state, { replaceId: action.payload });
    },
}, {
    selectDate: new Date(),
    selectClassName: 1,
    items: {},
    fetching: false,
    showModal: false,
    modalSelect: undefined,
    replaceId: undefined,
    addModalShow: false,
    replace: []
});
//# sourceMappingURL=manage-check.js.map