"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const antd_1 = require('antd');
const Menu_1 = require('../../components/Menu');
const manage_check_1 = require('../../redux/modules/manage-check');
const worker_1 = require('../../redux/modules/worker');
const position_1 = require('../../redux/modules/position');
class HomeView extends React.Component {
    constructor(props) {
        super(props);
    }
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
            return (React.createElement(antd_1.Radio, {key: value.id, style: radioStyle, value: value.id}, 
                "  ", 
                value.name));
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
            return (React.createElement(antd_1.Radio, {key: value.id, style: radioStyle, value: value.id}, 
                "  ", 
                value.name));
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
    alterButtonClicked(e) {
        let id = e.target.attributes['data-id'].value;
        this.props.dispatch(manage_check_1.actions.ChangeReplaceId(id));
        this.props.dispatch(manage_check_1.actions.showModal({ id: id, visiable: true }));
    }
    deleteButtonClicked(e) {
        let id = e.target.attributes['data-id'].value;
        this.props.dispatch(manage_check_1.actions.DeleteData(id));
    }
    render() {
        window.document.title = '预考勤模块';
        const Option = antd_1.Select.Option;
        let renderIndexTitle = (text, record, index) => {
            return index + 1;
        };
        let renderOperate = (text, record, index) => {
            if (record.study) {
                return React.createElement(antd_1.Button, {"data-id": record.id, onClick: this.deleteButtonClicked.bind(this)}, "删除");
            }
            else {
                return React.createElement(antd_1.Button, {"data-id": record.id, onClick: this.alterButtonClicked.bind(this)}, "替换");
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
        return (React.createElement(antd_1.Row, null, 
            React.createElement(antd_1.Col, {span: "4"}, 
                React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch})
            ), 
            React.createElement(antd_1.Col, {span: "20"}, 
                React.createElement(antd_1.Row, null, 
                    React.createElement("h1", {className: "title-header"}, "预考勤模块")
                ), 
                React.createElement(antd_1.Row, {type: "flex", justify: "center"}, 
                    React.createElement(antd_1.Col, null, 
                        React.createElement("span", null, "日期: "), 
                        React.createElement(antd_1.DatePicker, {defaultValue: new Date(), ref: 'date-picker', onChange: this.DatePickerChange.bind(this)}), 
                        React.createElement("span", null, " 班次: "), 
                        React.createElement(antd_1.Select, {defaultValue: "1", ref: 'selection', onChange: this.SelectChange.bind(this)}, 
                            React.createElement(Option, {value: "1"}, "白班"), 
                            React.createElement(Option, {value: "2"}, "夜班")), 
                        React.createElement(antd_1.Button, {onClick: this.QueryButtonClick.bind(this)}, "查询"))
                ), 
                React.createElement(antd_1.Row, {type: "flex", align: 'center', className: "table"}, 
                    React.createElement(antd_1.Col, {span: '20'}, 
                        React.createElement(antd_1.Table, {dataSource: this.props.manage_check.items.person, columns: Columns, pagination: false}), 
                        this.props.manage_check.items.id ? React.createElement(antd_1.Button, {onClick: event => this.props.dispatch(manage_check_1.actions.AddModalShow(true))}, "添加新学员") : '', 
                        React.createElement(antd_1.Modal, {title: "请选择代替的职工", footer: '', visible: this.props.manage_check.showModal, onCancel: this.props.dispatch(v => () => this.props.dispatch(manage_check_1.actions.showModal(false)))}, 
                            React.createElement(antd_1.Radio.Group, {defaultValue: '', onChange: event => this.props.dispatch(manage_check_1.actions.ReplaceData(this.props.manage_check.replaceId, event.target.value))}, this.getRadioSelect())
                        ), 
                        React.createElement(antd_1.Modal, {title: "请选择增加的职工", footer: '', visible: this.props.manage_check.addModalShow, onCancel: this.props.dispatch(v => () => this.props.dispatch(manage_check_1.actions.AddModalShow(false)))}, 
                            React.createElement(antd_1.Row, null, "选择职工"), 
                            React.createElement(antd_1.Radio.Group, {defaultValue: ''}, this.getAddRadioSelect()), 
                            React.createElement(antd_1.Row, null, "选择岗位"), 
                            React.createElement(antd_1.Radio.Group, {defaultValue: ''}, 
                                this.getPositionSelect(), 
                                React.createElement(antd_1.Button, null, "添加"))))
                ))));
    }
}
exports.HomeView = HomeView;
const mapStateToProps = (state) => ({
    menu: state.menu,
    manage_check: state.manage_check,
    worker: state.worker,
    position: state.position
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(HomeView);
//# sourceMappingURL=ManageCheckView.js.map