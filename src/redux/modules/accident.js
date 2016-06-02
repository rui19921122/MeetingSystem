"use strict";
///<reference path="../../../typings/browser.d.ts"/>
/**
 *
 * Created by hanrui on 2016/3/1.
 */
const redux_actions_1 = require('redux-actions');
const antd_1 = require('antd');
const UPDATE_UNLEARNED_ACCIDENT = redux_actions_1.createAction('UPDATE_UNLEARNED_ACCIDENT');
const UPDATE_LEARNED_ACCIDENT = redux_actions_1.createAction('UPDATE_LEARNED_ACCIDENT');
const get_unlearn_department_accident = () => {
    return (dispatch, state) => {
        const url = '/api/accident/get-unlearned-accident/';
        fetch(url, { credentials: 'include' }).then(response => {
            if (response.status == 200) {
                response.json().then(json => dispatch(UPDATE_UNLEARNED_ACCIDENT(json)));
            }
            else {
                response.json().then(json => {
                    antd_1.message.error(JSON.parse(json));
                });
            }
        });
    };
};
const SHOW_ADD_ACCIDENT_MODAL = redux_actions_1.createAction("SHOW_ADD_ACCIDENT_MODAL");
const add_accident = (content) => {
    return (dispatch, state) => {
        const url = '/api/accident/accident/';
        fetch(url, {
            method: 'post',
            credentials: 'include',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ content: content })
        }).then(response => {
            if (response.status == 201) {
                response.json().then(json => {
                    dispatch(SHOW_ADD_ACCIDENT_MODAL(false));
                    dispatch(get_unlearn_department_accident());
                });
            }
            else {
                response.json().then(json => {
                    antd_1.message.error('提交失败，错误码为' + response.status);
                    console.log(json);
                });
            }
        });
    };
};
const get_learned_accident = () => {
    return (dispatch, state) => {
        const url = '/api/accident/accident/';
        fetch(url, {
            credentials: 'include',
            method: 'get', headers: { "Content-Type": 'application/json' } }).then(response => {
            if (response.status == 200) {
                response.json().then(json => {
                    dispatch(UPDATE_LEARNED_ACCIDENT(json));
                });
            }
            else {
                response.json().then(json => {
                    antd_1.message.error('获取失败，错误码为' + response.status);
                    console.log(json);
                });
            }
        });
    };
};
const delete_accident = (id) => {
    return (dispatch, state) => {
        const url = '/api/accident/accident/' + id + '/';
        fetch(url, {
            credentials: 'include',
            method: 'delete', headers: { "Content-Type": 'application/json' } }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                antd_1.message.success('删除成功');
                dispatch(get_unlearn_department_accident());
            }
            else {
                response.json().then(json => {
                    antd_1.message.error('提交失败，错误码为' + response.status);
                    console.log(json);
                });
            }
        });
    };
};
const delete_files = (id) => {
    return (dispatch, state) => {
        const url = '/api/upload/delete-accident-files/' + id + '/';
        fetch(url, {
            credentials: 'include',
            method: 'delete', headers: { "Content-Type": 'application/json' } }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                dispatch(get_unlearn_department_accident());
            }
            else {
                response.json().then(json => {
                    antd_1.message.error('提交失败，错误码为' + response.status);
                    console.log(json);
                });
            }
        });
    };
};
exports.actions = {
    get_unlearn_department_accident: get_unlearn_department_accident,
    SHOW_ADD_ACCIDENT_MODAL: SHOW_ADD_ACCIDENT_MODAL,
    add_accident: add_accident,
    delete_accident: delete_accident,
    get_learned_accident: get_learned_accident,
    delete_files: delete_files
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    UPDATE_UNLEARNED_ACCIDENT: (state, action) => {
        return Object.assign({}, state, { items: action.payload });
    },
    UPDATE_LEARNED_ACCIDENT: (state, action) => {
        return Object.assign({}, state, { items_learned: action.payload });
    },
    SHOW_ADD_ACCIDENT_MODAL: (state, action) => {
        return Object.assign({}, state, { show_accident: action.payload });
    },
}, {
    items: undefined,
    show_accident: false
});
//# sourceMappingURL=accident.js.map