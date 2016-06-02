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
const accident_1 = require('../../redux/modules/accident');
class addStudyForm extends React.Component {
    handleSubmit() {
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (React.createElement(antd_1.Form, {onSubmit: this.handleSubmit.bind(this)}, React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Col, null, React.createElement("h2", null, "添加事故案例"))), React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, null, "内容")), React.createElement("textarea", __assign({}, getFieldProps('content'), {className: "text-area"})), React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Col, null, React.createElement(antd_1.Button, {onClick: () => this.props.dispatch(accident_1.actions.add_accident(this.props.form.getFieldProps('content').value))}, "添加"), React.createElement(antd_1.Button, {onClick: () => {
            alert('自己删！别懒');
        }}, "重置")))));
    }
}
const AddStudyModalForm = antd_1.Form.create({})(addStudyForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddStudyModalForm;
//# sourceMappingURL=AddAccidentModalForm.js.map