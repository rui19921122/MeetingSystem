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
const study_1 = require('../../redux/modules/study');
class addStudyForm extends React.Component {
    handleSubmit() {
    }
    render() {
        //noinspection TypeScriptUnresolvedVariable
        const { getFieldProps } = this.props.form;
        //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
        return (React.createElement(antd_1.Form, {onSubmit: this.handleSubmit.bind(this)}, React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Col, null, React.createElement("h2", null, "添加学习内容"))), React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, null, "标题/问题")), React.createElement("textarea", __assign({}, getFieldProps('question'), {className: "text-area"})), React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, null, "答案")), React.createElement("textarea", __assign({}, getFieldProps('answer'), {className: "text-area"})), React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Col, null, React.createElement(antd_1.Button, {onClick: () => this.props.dispatch(study_1.actions.add_study(this.props.form.getFieldProps('question').value, this.props.form.getFieldProps('answer').value))}, "添加"), React.createElement(antd_1.Button, {onClick: () => {
            alert('自己删！别懒');
        }}, "重置")))));
    }
}
const AddStudyModalForm = antd_1.Form.create()(addStudyForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddStudyModalForm;
//# sourceMappingURL=AddStudyModalForm.js.map