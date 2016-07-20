"use strict";
const React = require('react');
const antd_1 = require('antd');
const login_1 = require('../../redux/modules/login');
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props;
        // TODO: 解决这里无法引用this的错误
        let username = e.target.username.value;
        let password = e.target.password.value;
        dispatch(login_1.login(username, password));
    }
    render() {
        return (React.createElement(antd_1.Form, {horizontal: true, onSubmit: this.handleSubmit}, React.createElement(antd_1.Form.Item, {label: "用户名", labelCol: { span: 6, offset: 0 }, wrapperCol: { span: 14, offset: 0 }}, React.createElement(antd_1.Input, {id: "username", placeholder: "请输入您的用户名"})), React.createElement(antd_1.Form.Item, {label: "密码", labelCol: { span: 6, offset: 0 }, wrapperCol: { span: 14, offset: 0 }}, React.createElement(antd_1.Input, {id: "password", type: "password", placeholder: "请输入您的密码"})), React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 16, offset: "6"}, React.createElement(antd_1.Button, {type: "primary", htmlType: "submit"}, "登陆")))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Login;
//# sourceMappingURL=LoginForm.js.map