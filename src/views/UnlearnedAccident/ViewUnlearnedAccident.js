///<reference path="../../../typings/browser.d.ts"/>
"use strict";
const AddAccidentModalForm_1 = require('./AddAccidentModalForm');
const React = require('react');
const react_redux_1 = require('react-redux');
const antd_1 = require('antd');
const Menu_1 = require('../../components/Menu');
const accident_1 = require('../../redux/modules/accident');
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
class ViewUnlearnedAccident extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(accident_1.actions.get_unlearn_department_accident());
    }
    render() {
        const title_length = 10;
        const file_table = [
            {
                title: '文件名',
                dataIndex: 'filename',
                key: 'filename',
                width: '80%',
                render: (text, record, index) => {
                    return React.createElement("a", {href: record.file, target: "_blank"}, record.filename);
                }
            },
            {
                title: '操作',
                width: '20%',
                key: 'control',
                render: (text, record, index) => {
                    return React.createElement(antd_1.Button, {onClick: () => {
                        this.props.dispatch(accident_1.actions.delete_files(record.id));
                    }}, "删除");
                }
            },
        ];
        const columns = [
            {
                title: '序号',
                render: (text, record, index) => {
                    return index + 1;
                },
                key: 'index',
                width: '5%'
            },
            {
                title: '内容',
                dataIndex: 'content',
                render: (text, record, index) => {
                    if (text.length > 20) {
                        return text.slice(0, 19) + '...';
                    }
                    else {
                        return text;
                    }
                },
                key: 'title',
                width: '25%'
            },
            {
                title: '上传人',
                dataIndex: 'publish_person',
                key: 'publish_person',
                width: '5%'
            },
            {
                title: '一班学习',
                dataIndex: 'checked_by_first',
                key: 'checked_by_first',
                width: '10%',
                render: (text, record, index) => {
                    if (text) {
                        return '已学习';
                    }
                    else {
                        return '未学习';
                    }
                }
            },
            {
                title: '二班学习',
                dataIndex: 'checked_by_second',
                key: 'accident_by_second',
                width: '10%',
                render: (text, record, index) => {
                    if (text) {
                        return '已学习';
                    }
                    else {
                        return '未学习';
                    }
                }
            },
            {
                title: '三班学习',
                dataIndex: 'checked_by_third',
                key: 'checked_by_third',
                width: '10%',
                render: (text, record, index) => {
                    if (text) {
                        return '已学习';
                    }
                    else {
                        return '未学习';
                    }
                }
            },
            {
                title: '四班学习',
                dataIndex: 'checked_by_forth',
                key: 'checked_by_forth',
                width: '10%',
                render: (text, record, index) => {
                    if (text) {
                        return '已学习';
                    }
                    else {
                        return '未学习';
                    }
                }
            }, {
                title: '操作',
                key: 'control',
                width: '20%',
                render: (text, record, index) => {
                    let disabled;
                    disabled = !!(record.checked_by_first || record.checked_by_second || record.checked_by_third || record.checked_by_forth);
                    return (React.createElement(antd_1.Button.Group, null, React.createElement(antd_1.Button, {disabled: disabled, "data-id": record.id, onClick: (event) => {
                        let id = event.target['data-id'];
                        this.props.dispatch(accident_1.actions.delete_accident(record.id));
                    }}, "删除"), React.createElement(antd_1.Button, {disabled: disabled}, React.createElement(antd_1.Upload, {action: '/api/upload/accident-file/' + record.id + '/', showUploadList: false, onChange: (info) => {
                        if (info.file.status !== 'uploading') {
                            antd_1.message.info(`${info.file.name} 正在上传....`);
                        }
                        if (info.file.status === 'done') {
                            antd_1.message.success(`${info.file.name} 上传成功。`);
                            this.props.dispatch(accident_1.actions.get_unlearn_department_accident());
                        }
                        else if (info.file.status === 'error') {
                            antd_1.message.error(`${info.file.name} 上传失败。`);
                            this.props.dispatch(accident_1.actions.get_unlearn_department_accident());
                        }
                    }}, "上传附件")), React.createElement(antd_1.Button, {disabled: record.files.length == 0 ? true : false, onClick: (event) => {
                        let id = record.id;
                        antd_1.Modal.info({
                            title: '附件列表',
                            //todo 解决点击删除后不刷新的问题
                            width: '70%',
                            content: React.createElement(antd_1.Table, {columns: file_table, dataSource: record.files, rowKey: (record) => record.id})
                        });
                    }}, "附件(", record.files.length, ")")));
                }
            }
        ];
        return (React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 4}, React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch})), React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement("h1", {className: 'title-header'}, "未全部完成的事故案例")), React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Button, {onClick: () => { this.props.dispatch(accident_1.actions.SHOW_ADD_ACCIDENT_MODAL(true)); }}, "增加事故案例")), React.createElement(antd_1.Row, {type: 'flex', justify: 'center', className: 'table'}, React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Table, {dataSource: this.props.accident.items, columns: columns, rowKey: (record) => record.id, pagination: false})))), React.createElement(antd_1.Modal, {visible: this.props.accident.show_accident, onCancel: () => this.props.dispatch(accident_1.actions.SHOW_ADD_ACCIDENT_MODAL(false)), width: '80%', footer: ''}, React.createElement(antd_1.Row, null, React.createElement(AddAccidentModalForm_1.default, {dispatch: this.props.dispatch})))));
    }
}
exports.ViewUnlearnedAccident = ViewUnlearnedAccident;
const mapStateToProps = (state) => ({
    menu: state.menu,
    accident: state.accident,
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(ViewUnlearnedAccident);
//# sourceMappingURL=ViewUnlearnedAccident.js.map