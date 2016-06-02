"use strict";
/**
 *
 * Created by hanrui on 2016/3/1.
 */
const redux_actions_1 = require('redux-actions');
const antd_1 = require('antd');
const react_router_redux_1 = require('react-router-redux');
const BEGIN_LOGIN = 'BEGIN_LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
let begin_login = redux_actions_1.createAction(BEGIN_LOGIN);
let login_sucess = redux_actions_1.createAction(LOGIN_SUCCESS);
exports.login = (username, password) => (dispatch, state) => {
    dispatch(begin_login);
    fetch('/api/auth/login/', {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        "body": JSON.stringify({
            username: username,
            password: password
        }), credentials: 'include'
    }).then((response => {
        switch (response.status) {
            case 200:
                dispatch(login_sucess);
                dispatch(react_router_redux_1.push('/'));
                break;
            default:
                response.json().then(json => {
                    antd_1.message.error('未成功登陆，原因为' + json.non_field_errors[0]);
                });
                break;
        }
    }));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_actions_1.handleActions({
    [BEGIN_LOGIN]: (state, { payload }) => Object.assign(state, state.log = { auth: false, fetch: true }),
    [LOGIN_SUCCESS]: (state, { payload }) => Object.assign(state, state.log = { auth: true, fetch: false }),
}, { log: { auth: false, fetch: false } });
//# sourceMappingURL=login.js.map