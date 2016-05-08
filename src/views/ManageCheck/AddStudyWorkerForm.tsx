import * as React from 'react'
import {Row, Col, Form, Radio, Button} from 'antd'
import {actions as worker_actions, worker_store} from '../../redux/modules/worker'
import {actions as position_actions, position_store} from '../../redux/modules/position';
import {actions, manage_check_store} from '../../redux/modules/manage-check'
class addStudyWorkerForm extends React.Component<any, any>{
    getPositionSelect(): any {
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
            return (
                <Radio key={value.id} style={radioStyle} value={value.id}>{value.name}</Radio>
            )
        }
        if (this.props.worker.person.length > 0) {
        } else {
            this.props.dispatch(worker_actions.GetData())
        }
        const worker = this.props.manage_check.replace
        if (worker.length > 0) {
            return (
                worker.map(callbackfn)
            )
        }
    }
    onSubmit(evnet) {
        const form = this.props.form.getFieldsValue()
        const worker_id = form.worker
        const position_id = form.position
        this.props.dispatch(actions.AddData(this.props.manage_check.items.id,position_id,worker_id))
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form onSubmit={this.onSubmit.bind(this) }>
                <Row>选择职工</Row>
                <Radio.Group defaultValue={''} {...getFieldProps('worker')}>
                    {this.getAddRadioSelect() }
                </Radio.Group>
                <Row>选择岗位</Row>
                <Radio.Group defaultValue={''} {...getFieldProps('position')}>
                    {this.getPositionSelect() }
                    <Button onClick={this.onSubmit.bind(this) }>添加</Button></Radio.Group>
            </Form>
        )
    }
}
const AddStudyWorkerForm = Form.create({})(addStudyWorkerForm)
export default AddStudyWorkerForm
