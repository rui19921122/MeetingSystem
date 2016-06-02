///<reference path="../../../typings/browser.d.ts"/>
"use strict";
const AddStudyModalForm_1 = require('./AddStudyModalForm');
const React = require('react');
const react_redux_1 = require('react-redux');
const antd_1 = require('antd');
const Menu_1 = require('../../components/Menu');
const study_1 = require('../../redux/modules/study');
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
class ViewUnlearnedStudy extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(study_1.actions.get_unlearn_department_study());
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
                key: 'study_by_second',
                width: '10%',
                render: (text, reocrd, index) => {
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
                render: (text, reocrd, index) => {
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
                render: (text, reocrd, index) => {
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
                width: '10%',
                render: (text, record, index) => {
                    let disabled;
                    disabled = !!(record.checked_by_first || record.checked_by_second || record.checked_by_third || record.checked_by_forth);
                    return React.createElement(antd_1.Button, {disabled: disabled, "data-id": record.id, onClick: (event) => {
                        const id = record.id;
                        this.props.dispatch(study_1.actions.delete_study(id));
                    }}, "删除");
                }
            }
        ];
        return (React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 4}, React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch})), React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement("h1", {className: 'title-header'}, "未全部完成的业务学习管理")), React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Button, {onClick: () => { this.props.dispatch(study_1.actions.SHOW_ADD_STUDY_MODAL(true)); }}, "增加业务学习")), React.createElement(antd_1.Row, {type: 'flex', justify: 'center', className: 'table'}, React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Table, {dataSource: this.props.study.items, columns: colunms, pagination: false, rowKey: (value) => value.id})))), React.createElement(antd_1.Modal, {visible: this.props.study.show_study, onCancel: () => this.props.dispatch(study_1.actions.SHOW_ADD_STUDY_MODAL(false)), width: '80%', footer: ''}, React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, null, React.createElement(AddStudyModalForm_1.default, {dispatch: this.props.dispatch}))))));
    }
}
exports.ViewUnlearnedStudy = ViewUnlearnedStudy;
const mapStateToProps = (state) => ({
    menu: state.menu,
    study: state.study,
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(ViewUnlearnedStudy);
//# sourceMappingURL=ViewUnlearnedStudy.js.map