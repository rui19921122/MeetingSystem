"use strict";
const React = require('react');
const react_router_1 = require('react-router');
const CoreLayout_1 = require('./../layouts/CoreLayout/CoreLayout');
const HomeView_1 = require('./../views/HomeView/HomeView');
const LoginIn_1 = require('./../views/LoginIn/LoginIn');
const ManageCheck_1 = require('./../views/ManageCheck');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (store) => (React.createElement(react_router_1.Route, {path: '/', component: CoreLayout_1.default}, 
    React.createElement(react_router_1.IndexRoute, {component: HomeView_1.default}), 
    React.createElement(react_router_1.Route, {path: "login", component: LoginIn_1.default}), 
    React.createElement(react_router_1.Route, {path: "manage-check", component: ManageCheck_1.default})));
//# sourceMappingURL=index.js.map