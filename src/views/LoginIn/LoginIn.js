"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
/**
 *
 *
 * Created by Administrator on 2016/1/26.
 */
const React = require('react');
const react_redux_1 = require('react-redux');
const antd_1 = require('antd');
require('./style.scss');
const LoginForm_1 = require('./LoginForm');
const mapStateToProps = (state) => ({
    login: state.login
});
class Login extends React.Component {
    render() {
        return (React.createElement("div", null, React.createElement(antd_1.Row, {className: 'form', type: "flex", justify: "center"}, React.createElement(antd_1.Col, {span: 10}, React.createElement(LoginForm_1.default, __assign({}, this.props))))));
    }
}
exports.Login = Login;
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(Login);
//# sourceMappingURL=LoginIn.js.map