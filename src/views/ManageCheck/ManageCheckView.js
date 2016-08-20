///<reference path="../../../typings/browser.d.ts"/>
"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const antd_1 = require('antd');
const Menu_1 = require('../../components/Menu');
const ChangePasswordModal_1 = require('./ChangePasswordModal');
const manage_check_1 = require('../../redux/modules/manage-check');
const worker_1 = require('../../redux/modules/worker');
const position_1 = require('../../redux/modules/position');
const AddStudyWorkerForm_1 = require("./AddStudyWorkerForm");
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
class ManageCheckView extends React.Component {
    constructor(props) {
        super(props);
    }
    getPositionSelect() {
        //todo ahh
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let callbackfn = (value, index, array) => {
            return (React.createElement(antd_1.Radio, {key: value.id, style: radioStyle, value: value.id}, "  ", value.name));
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
            const list = this.props.manage_check.person_list;
            for (let i of this.props.worker.person) {
                if (list.indexOf(i.id) >= 0) {
                    return React.createElement(antd_1.Radio, {key: value.id, style: radioStyle, value: value.id}, value.name);
                }
                else {
                }
            }
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
    getRadioSelect() {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let callbackfn = (value, index, array) => {
            return React.createElement(antd_1.Radio, {key: value.id, style: radioStyle, value: value.id}, value.name);
        };
        if (this.props.worker.person.length > 0) {
        }
        else {
            this.props.dispatch(worker_1.actions.GetData());
        }
        const worker = this.props.manage_check.replace;
        if (worker.length > 0) {
            return (worker.map(callbackfn));
        }
    }
    QueryButtonClick() {
        this.props.dispatch(manage_check_1.actions.BeginGetData());
        this.props.dispatch(manage_check_1.actions.GetData(this.props.manage_check.selectDate, this.props.manage_check.selectClassName));
    }
    DatePickerChange(value) {
        this.props.dispatch(manage_check_1.actions.ChangeDatePicker(value));
    }
    SelectChange(value) {
        this.props.dispatch(manage_check_1.actions.ChangeSelect(value));
    }
    render() {
        window.document.title = '预考勤模块';
        const Option = antd_1.Select.Option;
        const lock = this.props.manage_check.items.lock;
        let renderIndexTitle = (text, record, index) => {
            return index + 1;
        };
        let renderOperate = (text, record, index) => {
            if (record.study) {
                return React.createElement(antd_1.Button, {"data-id": record.id, onClick: () => this.props.dispatch(manage_check_1.actions.DeleteData(record.id)), disabled: lock}, "删除");
            }
            else {
                return React.createElement(antd_1.Button, {"data-id": record.id, onClick: () => {
                    this.props.dispatch(manage_check_1.actions.ChangeReplaceId(record.id));
                    this.props.dispatch(manage_check_1.actions.showModal({ id: record.id, visiable: true }));
                }, disabled: lock}, "替换");
            }
        };
        let renderAlter = (text, record, index) => {
            if (record.study) {
                return '是';
            }
            else {
                return '否';
            }
        };
        const Columns = [
            { title: "序号", render: renderIndexTitle, key: "index", width: "10%" },
            { title: "姓名", dataIndex: 'worker', key: "name", width: "20%" },
            { title: "职位", dataIndex: 'position', key: "position", width: "20%" },
            { title: "学员", dataIndex: 'study', key: "study", width: "20%", render: renderAlter },
            { title: "操作", key: "operate", render: renderOperate, width: "20%" },
        ];
        let scrapy_col;
        scrapy_col = [
            { title: '序号', dataIndex: 'number', key: 'index', width: '10%' },
            { title: '标题', dataIndex: 'title', key: 'title', width: '30%' },
            { title: '内容', dataIndex: 'content', key: 'content', width: '60%' },
        ];
        return (React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 4}, React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch})), React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Row, {type: 'flex', justify: 'center', align: 'middle'}, React.createElement(antd_1.Col, null, React.createElement("h1", {className: "title-header"}, "预考勤模块", React.createElement(antd_1.Button, {onClick: () => this.props.dispatch(manage_check_1.actions.change_password_modal(true))}, "更改路局网站信息")))), React.createElement(antd_1.Row, {type: "flex", justify: "center"}, React.createElement(antd_1.Col, null, React.createElement("span", null, "日期: "), React.createElement(antd_1.DatePicker, {defaultValue: new Date(), ref: 'date-picker', onChange: this.DatePickerChange.bind(this)}), React.createElement("span", null, " 班次: "), React.createElement(antd_1.Select, {defaultValue: "1", ref: 'selection', onChange: this.SelectChange.bind(this)}, React.createElement(Option, {value: "1"}, "白班"), React.createElement(Option, {value: "2"}, "夜班")), React.createElement(antd_1.Button, {onClick: this.QueryButtonClick.bind(this)}, "查询"))), lock ? React.createElement(antd_1.Row, {type: "flex", justify: 'center'}, React.createElement(antd_1.Col, null, React.createElement("h2", null, "考勤表已锁定，无法修改"))) : '', React.createElement(antd_1.Row, {type: "flex", justify: 'center', className: "table"}, React.createElement(antd_1.Col, {span: 20}, React.createElement("h1", {style: { textAlign: 'center' }}, "预考勤数据"), React.createElement(antd_1.Table, {dataSource: this.props.manage_check.items.person, columns: Columns, rowKey: record => record.id, pagination: false}), this.props.manage_check.items.id && !lock ?
            React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Col, null, React.createElement(antd_1.Button, {style: { marginTop: '15px' }, onClick: event => this.props.dispatch(manage_check_1.actions.AddModalShow(true))}, "添加新学员")))
            : '', React.createElement("h1", {style: { textAlign: 'center' }}, "路局班前预想表数据"), React.createElement(antd_1.Table, {columns: scrapy_col, dataSource: this.props.manage_check.items.scrapy, locale: { emptyText: '尚无数据,您可以点击下方的添加输入链接地址以添加' }, bordered: true}), this.props.manage_check.items.id && !lock ?
            React.createElement(antd_1.Row, {type: 'flex', justify: 'center', align: 'middle'}, React.createElement(antd_1.Input, {placeholder: '请输入URL地址', ref: "url_input", onChange: (event) => this.props.dispatch(manage_check_1.actions.ChangeUrlValue(event.target.value))}), React.createElement(antd_1.Button, {onClick: () => this.props.dispatch(manage_check_1.actions.AddScrapyData(this.refs['url_input'])), disabled: this.props.manage_check.items.lock || this.props.manage_check.url_button_disabled}, "添加"))
            : '', React.createElement(antd_1.Modal, {title: "请选择代替的职工", footer: '', visible: this.props.manage_check.showModal, onCancel: this.props.dispatch(v => () => this.props.dispatch(manage_check_1.actions.showModal(false)))}, React.createElement(antd_1.Radio.Group, {defaultValue: '', onChange: event => this.props.dispatch(manage_check_1.actions.ReplaceData(this.props.manage_check.replaceId, event.target.value))}, this.getRadioSelect())), React.createElement(antd_1.Modal, {title: "请选择增加的职工", footer: '', visible: this.props.manage_check.addModalShow, onCancel: this.props.dispatch(v => () => this.props.dispatch(manage_check_1.actions.AddModalShow(false)))}, React.createElement(AddStudyWorkerForm_1.default, {position: this.props.position, worker: this.props.worker, dispatch: this.props.dispatch, manage_check: this.props.manage_check})), React.createElement(antd_1.Modal, {title: "更改路局网站密码", footer: '', visible: this.props.manage_check.change_password_modal, onCancel: (event) => this.props.dispatch(this.props.dispatch(manage_check_1.actions.change_password_modal(false)))}, React.createElement(ChangePasswordModal_1.default, {dispatch: this.props.dispatch})))), React.createElement(antd_1.Row, {justify: 'center', type: 'flex', style: { marginTop: '20px' }}))));
    }
}
exports.ManageCheckView = ManageCheckView;
const mapStateToProps = (state) => ({
    menu: state.menu,
    manage_check: state.manage_check,
    worker: state.worker,
    position: state.position
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(ManageCheckView);
//# sourceMappingURL=ManageCheckView.js.map