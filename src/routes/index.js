"use strict";
const React = require('react');
const react_router_1 = require('react-router');
// NOTE: here we're making use of the `resolve.root` configuration
// option in webpack, which allows us to specify import paths as if
// they were from the root of the ~/src directory. This makes it
// very easy to navigate to files regardless of how deeply nested
// your current file is.
const CoreLayout_1 = require('./../layouts/CoreLayout/CoreLayout');
const HomeView_1 = require('./../views/HomeView/HomeView');
const LoginIn_1 = require('./../views/LoginIn/LoginIn');
const ManageCheck_1 = require('./../views/ManageCheck');
const UnlearnedStudy_1 = require('./../views/UnlearnedStudy');
const LearnedStudy_1 = require('./../views/LearnedStudy');
const LearnedAccident_1 = require('./../views/LearnedAccident');
const UnlearnedAccident_1 = require('./../views/UnlearnedAccident');
const ClassPlan_1 = require('./../views/ClassPlan');
const QueryList_1 = require('./../views/QueryList');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (store) => (React.createElement(react_router_1.Route, {path: '/', component: CoreLayout_1.default}, React.createElement(react_router_1.IndexRoute, {component: HomeView_1.default}), React.createElement(react_router_1.Route, {path: "login", component: LoginIn_1.default}), React.createElement(react_router_1.Route, {path: "manage-check", component: ManageCheck_1.default}), React.createElement(react_router_1.Route, {path: "manage-study", component: UnlearnedStudy_1.default}), React.createElement(react_router_1.Route, {path: "query-study", component: LearnedStudy_1.default}), React.createElement(react_router_1.Route, {path: "query-accident", component: LearnedAccident_1.default}), React.createElement(react_router_1.Route, {path: "manage-accident", component: UnlearnedAccident_1.default}), React.createElement(react_router_1.Route, {path: "class-plan", component: ClassPlan_1.default}), React.createElement(react_router_1.Route, {path: "query-check", component: QueryList_1.default}), React.createElement(react_router_1.Route, {path: "query-detail/:id/", component: QueryList_1.default})));
//# sourceMappingURL=index.js.map