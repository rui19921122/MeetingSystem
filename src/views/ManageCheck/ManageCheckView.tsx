///<reference path="../../../typings/browser.d.ts"/>

import * as React from 'react'
import {connect} from 'react-redux'
import {Row, Col, DatePicker, Select, Button, Table, Modal, Radio, Form} from 'antd'
import CustomMenu from '../../components/Menu'
import {actions, manage_check_store} from '../../redux/modules/manage-check'
import {actions as worker_actions, worker_store} from '../../redux/modules/worker'
import {actions as position_actions, position_store} from '../../redux/modules/position';
import AddStudyWorkerForm from "./AddStudyWorkerForm";

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
interface Props extends React.Props<any> {
    menu: any,
    manage_check: manage_check_store,
    dispatch: Redux.Dispatch,
    worker: worker_store,
    position: position_store
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class ManageCheckView extends React.Component<Props, void> {
    constructor(props) {
        super(props)
    }
    getPositionSelect(): any {
        //todo ahh
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let callbackfn = (value, index: number, array: any[]) => {
            return (
                <Radio key={value.id} style={radioStyle} value={value.id}>  {value.name}</Radio>
            )
        }
        if (this.props.position.position.length > 0) {
        } else {
            this.props.dispatch(position_actions.GetPositionData())
        }
        const position = this.props.position.position
        if (position.length > 0) {
            return (
                position.map(callbackfn)
            )
        }
    }
    getAddRadioSelect(): any {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let callbackfn = (value, index: number, array: any[]) => {
            const list = this.props.manage_check.person_list
            for (let i of this.props.worker.person) {
                if (list.indexOf(i.id) >= 0) {
                     return <Radio key={value.id} style={radioStyle} value={value.id}>{value.name}</Radio>
                } else {
                }
            }
        }
        if (this.props.worker.person.length > 0) {
        } else {
            this.props.dispatch(worker_actions.GetData())
        }
        const worker = this.props.worker.person
        if (worker.length > 0) {
            return (
                worker.map(callbackfn)
            )
        }
    }
    getRadioSelect(): any {
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        let callbackfn = (value, index: number, array: any[]) => {
          return <Radio key={value.id} style={radioStyle} value={value.id}>{value.name}</Radio>
        }
        if (this.props.worker.person.length > 0) {
        } else {
            this.props.dispatch(worker_actions.GetData())
        }
        const worker = this.props.manage_check.replace
        console.log(worker)
        if (worker.length > 0) {
            return (
                worker.map(callbackfn)
            )
        }
    }

    QueryButtonClick() {
        this.props.dispatch(actions.BeginGetData())
        this.props.dispatch(actions.GetData(this.props.manage_check.selectDate, this.props.manage_check.selectClassName))
    }

    DatePickerChange(value) {
        this.props.dispatch(actions.ChangeDatePicker(value))
    }

    SelectChange(value) {
        this.props.dispatch(actions.ChangeSelect(value))
    }

    alterButtonClicked(e) {
        let id = e.target.attributes['data-id'].value
        this.props.dispatch(actions.ChangeReplaceId(id))
        this.props.dispatch(actions.showModal({ id: id, visiable: true }))
    }

    deleteButtonClicked(e) {
        let id = e.target.attributes['data-id'].value
        this.props.dispatch(actions.DeleteData(id))
    }
    addStudyWorker(e) {
    }

    render() {
        window.document.title = '预考勤模块';
        const Option = Select.Option
        const lock = this.props.manage_check.items.lock;
        let renderIndexTitle = (text, record, index) => {
            return index + 1
        }
        let renderOperate = (text, record, index) => {
            if (record.study) {
                return <Button data-id={record.id} onClick={this.deleteButtonClicked.bind(this)} disabled={lock}>删除</Button>
            } else {
                return <Button data-id={record.id} onClick={this.alterButtonClicked.bind(this) } disabled={lock}>替换</Button>
            }
        }
        let renderAlter = (text, record, index) => {
            if (record.study) {
                return '是'
            } else {
                return '否'
            }
        }
        const Columns: Antd.Columns[] = [
            { title: "序号", render: renderIndexTitle, key: "index", width: "10%" },
            { title: "姓名", dataIndex: 'worker', key: "name", width: "20%" },
            { title: "职位", dataIndex: 'position', key: "position", width: "20%" },
            { title: "学员", dataIndex: 'study', key: "study", width: "20%", render: renderAlter },
            { title: "操作", key: "operate", render: renderOperate, width: "20%" },
        ]

        return (
            <Row>
                <Col span="4">
                    <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/>
                </Col>
                <Col span="20">
                    <Row>
                        <h1 className="title-header">预考勤模块</h1>
                    </Row>
                    <Row type="flex" justify="center">
                        <Col>
                            <span>日期: </span><DatePicker defaultValue={new Date() } ref='date-picker'
                                onChange={this.DatePickerChange.bind(this) }/>
                            <span> 班次: </span>
                            <Select defaultValue="1" ref='selection' onChange={this.SelectChange.bind(this) }>
                                <Option value="1">白班</Option>
                                <Option value="2">夜班</Option>
                            </Select>
                            <Button onClick={this.QueryButtonClick.bind(this) }>查询</Button></Col>
                    </Row>
                    {lock?<Row type="flex" align='center'><h2>考勤表已锁定，无法修改</h2></Row>:''}
                    <Row type="flex" align='center' className="table">
                        <Col span='20'>
                            <Table dataSource={this.props.manage_check.items.person} columns={Columns}
                                rowKey={record=>record.id}
                                    pagination={false}/>
                            {this.props.manage_check.items.id && !lock ?
                                <Row type='flex' align='center'>
                                    <Button onClick={event => this.props.dispatch(actions.AddModalShow(true)) }>添加新学员</Button>
                                </Row>
                                : ''}
                            <Modal title="请选择代替的职工" footer={''}
                                visible={this.props.manage_check.showModal}
                                onCancel={this.props.dispatch(v => () => this.props.dispatch(actions.showModal(false))) }>
                                <Radio.Group defaultValue={''}
                                    onChange={event => this.props.dispatch(actions.ReplaceData(this.props.manage_check.replaceId, (event.target as any).value)) }>
                                    {this.getRadioSelect() }
                                </Radio.Group>
                            </Modal>
                            <Modal title="请选择增加的职工" footer={''}
                                visible={this.props.manage_check.addModalShow}
                                onCancel={this.props.dispatch(v => () => this.props.dispatch(actions.AddModalShow(false))) }>
                                <AddStudyWorkerForm position={this.props.position}
                                                    worker={this.props.worker}
                                                    dispatch={this.props.dispatch}
                                                    manage_check={this.props.manage_check}/>
                            </Modal>
                        </Col>
                    </Row>
                </Col>
            </Row>
        )
    }
}

const mapStateToProps = (state) => ({
    menu: state.menu,
    manage_check: state.manage_check,
    worker: state.worker,
    position: state.position
})
export default connect(mapStateToProps)(ManageCheckView)
