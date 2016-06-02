/**
 *
 * Created by Administrator on 2016/5/18.
 */
///<reference path="../../../typings/browser.d.ts"/>
"use strict";
const React = require('react');
const react_redux_1 = require('react-redux');
const antd_1 = require('antd');
const Menu_1 = require('../../components/Menu');
const class_plan_1 = require('../../redux/modules/class_plan');
const ClassPlanTable_1 = require('./ClassPlanTable');
// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
class ClassPlanView extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const columns = [{
                title: '序号',
                render: (text, record, index) => index + 1,
                key: 'index'
            },
            {
                title: ''
            }
        ];
        return (React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 4}, React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch})), React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement("h1", {className: 'title-header'}, "班计划查询")), React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Col, null, React.createElement(antd_1.DatePicker, {onChange: (value) => {
            this.props.dispatch(class_plan_1.actions.SelectDateChange(value));
            this.props.dispatch(class_plan_1.actions.query_class_plan());
        }}))), !this.props.class_plan.items ?
            React.createElement(antd_1.Row, {justify: 'center', type: 'flex', className: 'block'}, React.createElement(antd_1.Col, null, "没有发现当日的班计划，你可以尝试", React.createElement(antd_1.Upload, {action: '/api/upload/class-plan/' + this.props.class_plan.select_date, onChange: (info) => {
                let file = info.file;
                if (file.status === 'done') {
                    antd_1.message.success("上传成功，即将刷新页面");
                    setTimeout(() => {
                        this.props.dispatch(class_plan_1.actions.query_class_plan());
                    }, 1000);
                }
                else if (file.status === 'error') {
                    antd_1.message.error(file.response['error']);
                }
            }, showUploadList: false}, React.createElement(antd_1.Button, {type: 'ghost'}, "上传", this.props.class_plan.select_date, "日班计划")))) :
            React.createElement(ClassPlanTable_1.default, {class_plan: this.props.class_plan, dispatch: this.props.dispatch}))));
    }
}
exports.ClassPlanView = ClassPlanView;
const mapStateToProps = (state) => ({
    menu: state.menu,
    class_plan: state.class_plan
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(ClassPlanView);
//# sourceMappingURL=ClassPlanView.js.map