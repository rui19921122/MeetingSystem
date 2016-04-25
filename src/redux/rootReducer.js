"use strict";
const redux_1 = require('redux');
const react_router_redux_1 = require('react-router-redux');
const counter_1 = require('./modules/counter');
const worker_1 = require('./modules/worker');
const menu_1 = require('./modules/menu');
const login_1 = require('./modules/login');
const manage_check_1 = require('./modules/manage-check');
const position_1 = require('./modules/position');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = redux_1.combineReducers({
    counter: counter_1.default,
    router: react_router_redux_1.routerReducer,
    worker: worker_1.default,
    menu: menu_1.default,
    login: login_1.default,
    manage_check: manage_check_1.default,
    position: position_1.default
});
//# sourceMappingURL=rootReducer.js.map