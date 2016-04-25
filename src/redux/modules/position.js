"use strict";
const redux_actions_1 = require("redux-actions");
const antd_1 = require('antd');
const react_router_redux_1 = require('react-router-redux');
let BeginGetPositionData = redux_actions_1.createAction('BeginGetPositionData');
let FinishGetPositionData = redux_actions_1.createAction('FinishGetPositionData');
let GetPositionData = () => ((dispatch, state) => {
    let url = '/api/worker/position/';
    fetch(url).then(response => {
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
    BeginGetPositionData,
    FinishGetPositionData,
    GetPositionData
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