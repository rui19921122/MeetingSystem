///<reference path="../../../typings/browser.d.ts"/>
"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const query_1 = require('../../redux/modules/query');
const Menu_1 = require('../../components/Menu/Menu');
const antd_1 = require('antd');
const react_router_redux_1 = require('react-router-redux');
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
class QueryListView extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(query_1.actions.GetQueryData());
    }
    render() {
        window.document.title = '查询模块';
        const props = this.props;
        const Option = antd_1.Select.Option;
        const tableHeaders = [
            { key: 'index', title: '序号', dataIndex: 'id', render: (text, record, index) => index + 1, width: '5%' },
            {
                key: 'date', title: '日期', dataIndex: 'date',
                width: '10%'
            },
            {
                key: 'department', title: '部门', dataIndex: 'department',
                filters: this.props.query_list.department_can_select.map((value) => {
                    return { value: value.name, text: value.name };
                }),
                onFilter: (value, record) => record.department == value,
                width: '10%'
            },
            {
                key: 'start', title: '开始时间', dataIndex: 'begin_time',
                render: (text, record, index) => {
                    return text.split('.')[0];
                },
                width: '15%'
            },
            {
                key: 'end', title: '结束时间', dataIndex: 'end_time',
                render: (text, record, index) => {
                    return text.split('.')[0];
                },
                width: '15%'
            },
            {
                key: 'person', title: '点名人', dataIndex: 'host_person',
                width: '10%'
            },
            {
                key: 'class_number', title: '班次', dataIndex: 'class_number', render: (value) => value + '班',
                width: '10%'
            },
            {
                key: 'day_number',
                title: '属性', dataIndex: 'day_number', render: (value) => value === 1 ? '白班' : '夜班',
                width: '10%'
            },
        ];
        return (React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 4}, React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch})), React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Row, {align: 'middle', justify: 'center', type: 'flex'}, React.createElement("h1", {className: "title-header"}, "查询模块")), React.createElement(antd_1.Row, {align: 'middle', justify: 'center', type: 'flex'}, React.createElement(antd_1.Col, {style: { margin: '0 10px' }}, React.createElement("span", null, "开始日期"), React.createElement(antd_1.DatePicker, {defaultValue: this.props.query_list.start || new Date(), onChange: (value) => this.props.dispatch(query_1.actions.UpdateDatePicker({ type: 'start', value: value }))})), React.createElement(antd_1.Col, {style: { margin: '0 10px' }}, React.createElement("span", null, "结束日期"), React.createElement(antd_1.DatePicker, {defaultValue: this.props.query_list.end || new Date(), onChange: (value) => this.props.dispatch(query_1.actions.UpdateDatePicker({ type: 'end', value: value }))})), React.createElement(antd_1.Col, {style: { margin: '0 10px' }}, React.createElement("span", null, "部门"), this.generateOption()), React.createElement(antd_1.Col, {style: { margin: '0 10px' }}, React.createElement(antd_1.Button, {onClick: () => this.props.dispatch(query_1.actions.GetQueryData())}, "查询"))), React.createElement(antd_1.Row, {align: 'middle', justify: 'center', type: 'flex', style: { marginTop: '20px' }}, React.createElement(antd_1.Col, {span: 17}, React.createElement(antd_1.Table, {columns: tableHeaders, className: 'justify_table table', onRowClick: (value) => !!value.id ? this.props.dispatch(react_router_redux_1.push(`/query-detail/${value.id}/`)) : '', dataSource: this.props.query_list.data, pagination: 15}))))));
    }
    generateOption() {
        const Option = antd_1.Select.Option;
        const data = this.props.query_list;
        if (data.department_can_select.length == 0) {
            return React.createElement(antd_1.Select, null);
        }
        else {
            return React.createElement(antd_1.Select, {key: "select", defaultValue: data.current_department.toString(), style: { width: '70px' }, onChange: (value) => this.props.dispatch(query_1.actions.ChangeCurrentDepartment(value))}, data.department_can_select.map((value, index, array) => React.createElement(Option, {value: value.id.toString(), key: `select-{value.id}`}, value.name)));
        }
    }
}
exports.QueryListView = QueryListView;
const mapStateToProps = (state) => ({
    menu: state.menu,
    manage_check: state.manage_check,
    worker: state.worker,
    position: state.position,
    query_list: state.query_list
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(QueryListView);
//# sourceMappingURL=QueryListView.js.map