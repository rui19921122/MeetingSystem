"use strict";
///<reference path="../../../typings/browser.d.ts"/>
/**
 *
 * Created by hanrui on 2016/3/1.
 */
const redux_actions_1 = require('redux-actions');
const antd_1 = require('antd');
const UPDATE_UNLEARNED_STUDY = redux_actions_1.createAction('UPDATE_UNLEARNED_STUDY');
const UPDATE_LEARNED_STUDY = redux_actions_1.createAction('UPDATE_LEARNED_STUDY');
const get_unlearn_department_study = () => {
    return (dispatch, state) => {
        const url = '/api/study/get-unlearned-study/';
        fetch(url, {
            credentials: 'include',
        }).then(response => {
            if (response.status == 200) {
                response.json().then(json => dispatch(UPDATE_UNLEARNED_STUDY(json)));
            }
            else {
                response.json().then(json => {
                    antd_1.message.error(JSON.parse(json));
                });
            }
        });
    };
};
const SHOW_ADD_STUDY_MODAL = redux_actions_1.createAction("SHOW_ADD_STUDY_MODAL");
const add_study = (question, answer = '') => {
    return (dispatch, state) => {
        const url = '/api/study/professional-study/';
        fetch(url, {
            method: 'post',
            credentials: 'include',
            headers: { "Content-Type": 'application/json' },
            body: JSON.stringify({ answer: answer, title: question })
        }).then(response => {
            if (response.status == 201) {
                response.json().then(json => {
                    dispatch(SHOW_ADD_STUDY_MODAL(false));
                    dispatch(get_unlearn_department_study());
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
const get_learned_study = () => {
    return (dispatch, state) => {
        const url = '/api/study/professional-study/';
        fetch(url, {
            credentials: 'include',
            method: 'get', headers: { "Content-Type": 'application/json' } }).then(response => {
            if (response.status == 200) {
                response.json().then(json => {
                    dispatch(UPDATE_LEARNED_STUDY(json));
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
const delete_study = (id) => {
    return (dispatch, state) => {
        const url = '/api/study/professional-study/' + id;
        fetch(url, {
            credentials: 'include',
            method: 'delete', headers: { "Content-Type": 'application/json' } }).then(response => {
            if (response.status >= 200 && response.status < 300) {
                dispatch(get_unlearn_department_study());
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
    get_unlearn_department_study: get_unlearn_department_study,
    SHOW_ADD_STUDY_MODAL: SHOW_ADD_STUDY_MODAL,
    add_study: add_study,
    delete_study: delete_study,
    get_learned_study: get_learned_study
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    UPDATE_UNLEARNED_STUDY: (state, action) => {
        return Object.assign({}, state, { items: action.payload });
    },
    UPDATE_LEARNED_STUDY: (state, action) => {
        return Object.assign({}, state, { items_learned: action.payload });
    },
    SHOW_ADD_STUDY_MODAL: (state, action) => {
        return Object.assign({}, state, { show_study: action.payload });
    },
}, {
    items: undefined,
    show_study: false
});
//# sourceMappingURL=study.js.map