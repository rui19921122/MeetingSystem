"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
const React = require('react');
const antd_1 = require('antd');
const worker_1 = require('../../redux/modules/worker');
const position_1 = require('../../redux/modules/position');
class addStudyWorkerForm extends React.Component {
    getPositionSelect() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let callbackfn = (value, index, array) => {
            return (React.createElement(antd_1.Radio, {key: value.id, style: radioStyle, value: value.id}, 
                "  ", 
                value.name));
        };
        if (this.props.position.position.length > 0) {
        }
        else {
            this.props.dispatch(position_1.actions.GetPositionData());
        }
        const position = this.props.position.position;
        if (position.length > 0) {
            return (position.map(callbackfn));
        }
    }
    getAddRadioSelect() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let callbackfn = (value, index, array) => {
            let disabled;
            const list = this.props.manage_check.person_list;
            for (let i of this.props.worker.person) {
                if (list.indexOf(i.id) >= 0) {
                    disabled = true;
                }
                else {
                    disabled = false;
                }
            }
            return (React.createElement(antd_1.Radio, {key: value.id, style: radioStyle, value: value.id, disabled: disabled}, value.name));
        };
        if (this.props.worker.person.length > 0) {
        }
        else {
            this.props.dispatch(worker_1.actions.GetData());
        }
        const worker = this.props.worker.person;
        if (worker.length > 0) {
            return (worker.map(callbackfn));
        }
    }
    onSubmit(evnet) {
        const form = this.props.form.getFieldsValue();
        console.log(form);
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (React.createElement(antd_1.Form, {onSubmit: this.onSubmit.bind(this)}, 
            React.createElement(antd_1.Row, null, "选择职工"), 
            React.createElement(antd_1.Radio.Group, __assign({defaultValue: ''}, getFieldProps('radio')), this.getAddRadioSelect()), 
            React.createElement(antd_1.Row, null, "选择岗位"), 
            React.createElement(antd_1.Radio.Group, {defaultValue: ''}, 
                this.getPositionSelect(), 
                React.createElement(antd_1.Button, {onClick: this.onSubmit.bind(this)}, "添加"))));
    }
}
const AddStudyWorkerForm = antd_1.Form.create({})(addStudyWorkerForm);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AddStudyWorkerForm;
//# sourceMappingURL=AddStudyWorkerForm.js.map