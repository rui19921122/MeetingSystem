///<reference path="../../../typings/browser.d.ts"/>
"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const react_router_1 = require('react-router');
const antd_1 = require('antd');
const Menu_1 = require('../../components/Menu');
const accident_1 = require('../../redux/modules/accident');
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
class ViewLearnedAccident extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(accident_1.actions.get_learned_accident());
    }
    render() {
        const title_length = 10;
        const colunms = [
            {
                title: '序号',
                render: (text, record, index) => {
                    return index + 1;
                },
                key: 'index',
                width: '5%'
            },
            {
                title: '问题',
                dataIndex: 'title',
                render: (text, record, index) => {
                    if (text.length > 20) {
                        return text.slice(0, 19) + '...';
                    }
                    else {
                        return text;
                    }
                },
                key: 'title',
                width: '15%'
            },
            {
                title: '回答',
                dataIndex: 'answer',
                render: (text, record, index) => {
                    if (text.length > 20) {
                        return text.slice(0, 19) + '...';
                    }
                    else {
                        return text;
                    }
                },
                key: 'answer',
                width: '15%'
            },
            {
                title: '上传人',
                dataIndex: 'publish_person',
                key: 'publish_person',
                width: '15%'
            },
            {
                title: '一班学习',
                dataIndex: 'checked_by_first',
                key: 'checked_by_first',
                width: '10%',
                render: (text, reocrd, index) => {
                    return (React.createElement(react_router_1.Link, {to: '/query-meeting/' + text}, "查看"));
                }
            },
            {
                title: '二班学习',
                dataIndex: 'checked_by_second',
                key: 'accident_by_second',
                width: '10%',
                render: (text, reocrd, index) => {
                    return (React.createElement(react_router_1.Link, {to: '/query-meeting/' + text}, "查看"));
                }
            },
            {
                title: '三班学习',
                dataIndex: 'checked_by_third',
                key: 'checked_by_third',
                width: '10%',
                render: (text, reocrd, index) => {
                    return (React.createElement(react_router_1.Link, {to: '/query-meeting/' + text}, "查看"));
                }
            },
            {
                title: '四班学习',
                dataIndex: 'checked_by_forth',
                key: 'checked_by_forth',
                width: '10%',
                render: (text, reocrd, index) => {
                    return (React.createElement(react_router_1.Link, {to: '/query-meeting/' + text}, "查看"));
                }
            }
        ];
        return (React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 4}, React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch})), React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement("h1", {className: 'title-header'}, "过往业务学习查询")), React.createElement(antd_1.Row, {type: 'flex', justify: 'center', className: 'table'}, React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Table, {dataSource: this.props.accident.items_learned, columns: colunms, rowKey: (record) => record.id, pagination: true}))))));
    }
}
exports.ViewLearnedAccident = ViewLearnedAccident;
const mapStateToProps = (state) => ({
    menu: state.menu,
    accident: state.accident,
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(ViewLearnedAccident);
//# sourceMappingURL=ViewLearnedAccident.js.map