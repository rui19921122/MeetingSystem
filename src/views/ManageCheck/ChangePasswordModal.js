"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
///<reference path="../../../typings/browser.d.ts"/>
const React = require('react');
const antd_1 = require('antd');
const manage_check_1 = require('../../redux/modules/manage-check');
class ChangePasswordModal extends React.Component {
    handleSubmit() {
    }
    render() {
        //noinspection TypeScriptUnresolvedVariable
        const { getFieldProps } = this.props.form;
        //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        const formItemLayout = {
            labelCol: { span: 5, offset: 0 },
            wrapperCol: { span: 19, offset: 0 },
        };
        return (React.createElement(antd_1.Form, {onSubmit: v => {
            v.preventDefault();
            console.log(manage_check_1.actions.ChangePassword);
            this.props.dispatch(manage_check_1.actions.ChangePassword(getFieldProps('username').value, getFieldProps('password').value));
        }, horizontal: true}, React.createElement(antd_1.Row, {type: 'flex', align: 'middle', justify: 'center'}, React.createElement(antd_1.Form.Item, __assign({label: "用户名", style: { width: '70%' }}, formItemLayout), React.createElement(antd_1.Input, __assign({}, getFieldProps('username')))), React.createElement(antd_1.Form.Item, __assign({label: "密码", style: { width: '70%' }}, formItemLayout), React.createElement(antd_1.Input, __assign({type: 'password'}, getFieldProps('password'))))), React.createElement(antd_1.Form.Item, {wrapperCol: { span: 24, offset: 12 }, style: { marginTop: 24 }}, React.createElement(antd_1.Button, {type: "primary", htmlType: "submit"}, "确定"))));
    }
}
const ChangePasswordModalForm = antd_1.Form.create()(ChangePasswordModal);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ChangePasswordModalForm;
//# sourceMappingURL=ChangePasswordModal.js.map