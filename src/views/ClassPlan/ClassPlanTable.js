"use strict";
/**
 * Created by Administrator on 2016/5/19.
 */
/**
 *
 *
 * Created by Administrator on 2016/3/2.
 */
const React = require('react');
const antd_1 = require('antd');
const class_plan_1 = require('../../redux/modules/class_plan');
class ClassPlanTable extends React.Component {
    constructor(props) {
        super(props);
    }
    get_ordered_data() {
        let all_collection = [];
        let father_collection = [];
        let key = 0;
        let index = 1;
        this.props.class_plan.items.day_detail.forEach((each) => {
            let _child = [];
            if (each['publish_detail']) {
                each['publish_detail'].forEach((inner_each) => {
                    all_collection.push({
                        'key': key,
                        'content': inner_each.detail
                    });
                    _child.push(key);
                    key += 1;
                });
            }
            father_collection.push([each.department, each.style, _child, index]);
        });
        return { 'father_collection': father_collection, 'all_collection': all_collection };
    }
    render() {
        let get_parent = (origin, child) => {
            let parent = [];
            let first = false;
            let each;
            for (each of origin) {
                if (each[2].find((n) => n == child.key) != undefined) {
                    parent = each;
                    each[2][0] == child.key ? first = true : first = false;
                    break;
                }
            }
            return {
                parent: parent,
                first: first
            };
        };
        let _ = this.get_ordered_data();
        let father_collection = _.father_collection;
        let all_collection = _.all_collection;
        const header = [
            {
                title: '名称',
                dataIndex: 'style',
                key: 'name',
                width: '20%',
                render(text, record, index) {
                    let data = get_parent(father_collection, record);
                    if (data.parent && data.first) {
                        return {
                            children: data.parent[1],
                            props: { rowSpan: data.parent[2].length }
                        };
                    }
                    else {
                        return {
                            children: data.parent[1],
                            props: { rowSpan: 0 }
                        };
                    }
                }
            },
            {
                title: '内容',
                dataIndex: 'content',
                key: 'content',
                width: '70%',
                props: {
                    style: { 'text-align': 'left' }
                }
            },
            {
                title: '涉及部门',
                dataIndex: 'department',
                key: 'department',
                width: '10%',
                render(text, record, index) {
                    let data = get_parent(father_collection, record);
                    if (data.parent && data.first) {
                        return {
                            children: data.parent[0],
                            props: { rowSpan: data.parent[2].length }
                        };
                    }
                    else {
                        return {
                            children: data.parent[0],
                            props: { rowSpan: 0 }
                        };
                    }
                }
            }
        ];
        return (React.createElement(antd_1.Row, {type: "flex", justify: "center"}, React.createElement(antd_1.Col, {span: 18}, React.createElement(antd_1.Table, {columns: header, className: 'justify_table', dataSource: all_collection, pagination: false, bordered: true}), this.props.class_plan.items.lock ?
            React.createElement(antd_1.Row, {type: 'flex', justify: 'center'}, React.createElement(antd_1.Col, null, "当前计划表已锁定，无法更改计划 ")) :
            React.createElement(antd_1.Row, {type: 'flex', justify: 'center', className: 'center'}, React.createElement(antd_1.Col, {span: 20}, "当前考勤表未锁定，您可以", React.createElement(antd_1.Upload, {action: '/api/upload/class-plan/' + this.props.class_plan.select_date, onChange: (info) => {
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
            }, showUploadList: false}, React.createElement(antd_1.Button, {type: 'ghost'}, "上传", this.props.class_plan.select_date, "日班计划")), "以覆盖")))));
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ClassPlanTable;
//# sourceMappingURL=ClassPlanTable.js.map