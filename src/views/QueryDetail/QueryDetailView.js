"use strict";
const antd_1 = require('antd');
const React = require('react');
const Menu_1 = require('./../../components/Menu/Menu');
const react_redux_1 = require("react-redux");
const query_detail_1 = require('./../../redux/modules/query_detail');
class QueryDetailView extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.dispatch(query_detail_1.actions.GetInitialData(this.props.params.id));
    }
    render() {
        window.document.title = '点名详情模块';
        const attend_table_headers = [
            { key: 'index', title: '序号', dataIndex: 'id', render: (text, record, index) => index + 1 },
            { key: 'name', title: '姓名', dataIndex: 'worker' },
            { key: 'position', title: '工种', dataIndex: 'position' },
            { key: 'study', title: '学员', dataIndex: 'study', render: (text) => text ? '是' : '否' },
            { key: 'checked', title: '签到时间', dataIndex: 'checked', render: (text) => text ? text.split('.')[0] : '未签到' },
        ];
        const scrapy_headers = [
            { key: 'index', title: '序号', dataIndex: 'id', render: (text, record, index) => index + 1, width: '10%' },
            { key: 'title', title: '标题', dataIndex: 'title', width: '20%' },
            { key: 'content', title: '内容', dataIndex: 'content', width: '70%' },
        ];
        return (React.createElement(antd_1.Row, null, React.createElement(antd_1.Col, {span: 4}, React.createElement(Menu_1.default, {menu: this.props.menu, dispatch: this.props.dispatch})), React.createElement(antd_1.Col, {span: 20}, React.createElement(antd_1.Row, {align: 'middle', justify: 'center', type: 'flex'}, React.createElement("h1", {className: "title-header"}, "点名详情模块", React.createElement("span", null, React.createElement(antd_1.Slider, {defaultValue: 2, min: 1, max: 5, step: 0.2, onChange: (value) => { this.props.dispatch(query_detail_1.actions.ChangeFontSize(value)); }})))), this.props.query_detail.fetching ?
            React.createElement(antd_1.Row, {align: 'middle', justify: 'center', type: 'flex'}, React.createElement("h2", null, "载入中，请稍后")) :
            React.createElement(antd_1.Row, {align: 'middle', justify: 'center', type: 'flex', style: { fontSize: this.props.query_detail.font_size + 'em' }}, React.createElement(antd_1.Col, {span: 15}, React.createElement("table", {width: '100%', style: { textAlign: 'center', border: '1px solid #000' }}, React.createElement("tr", {style: { fontWeight: 'normal' }}, React.createElement("th", null, "部门"), React.createElement("th", null, "日期"), React.createElement("th", null, "点名人"), React.createElement("th", null, "开始时间"), React.createElement("th", null, "结束时间"), React.createElement("th", null, "班次"), React.createElement("th", null, "属性")), React.createElement("tr", null, React.createElement("td", null, this.props.query_detail.detail.department), React.createElement("td", null, this.props.query_detail.detail.date), React.createElement("td", null, this.props.query_detail.detail.host_person), React.createElement("td", null, this.props.query_detail.detail.begin_time.split('.')[0]), React.createElement("td", null, this.props.query_detail.detail.end_time.split('.')[0]), React.createElement("td", null, this.props.query_detail.detail.class_number, "班"), React.createElement("td", null, this.props.query_detail.detail.day_number == 1 ? '白班' : '夜班'))), React.createElement("p", {style: { margin: '30px' }}, "点名备注:", this.props.query_detail.detail.note ?
                React.createElement("audio", {src: this.props.query_detail.detail.note}) : '本次点名无备注'), React.createElement("h4", {style: { marginTop: '30px', textAlign: 'center' }}, "点名情况"), React.createElement(antd_1.Table, {style: { marginTop: '30px', textAlign: 'center' }, dataSource: this.props.query_detail.detail.attend_table.person, columns: attend_table_headers}), React.createElement("h4", {style: { marginTop: '30px', textAlign: 'center' }}, "学习内容"), this.props.query_detail.detail.attend_table.scrapy ?
                React.createElement("div", {style: { fontSize: this.props.query_detail.font_size - 1 + 'em' }}, React.createElement("p", null, "路局班前预想内容"), React.createElement(antd_1.Table, {dataSource: this.props.query_detail.detail.attend_table.scrapy, columns: scrapy_headers}))
                : '', React.createElement("p", null, "录音文件:", this.props.query_detail.audios ?
                React.createElement("audio", {src: this.props.query_detail.audios.audio}) : '本次点名无录音文件'), React.createElement("p", null, "照片:", this.props.query_detail.photos ?
                this.props.query_detail.photos.map((value) => React.createElement("div", null, React.createElement("img", {src: value.image, alt: ""})))
                : '本次点名无照片'))))));
    }
}
exports.QueryDetailView = QueryDetailView;
const mapStateToProps = (state) => ({
    menu: state.menu,
    query_detail: state.query_detail,
    query_list: state.query_list,
});
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = react_redux_1.connect(mapStateToProps)(QueryDetailView);
//# sourceMappingURL=QueryDetailView.js.map