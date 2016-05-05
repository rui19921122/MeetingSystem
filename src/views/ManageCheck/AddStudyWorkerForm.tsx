import * as React from 'react'
import {Row, Col, Form, Radio, Button} from 'antd'
import {actions as worker_actions, worker_store} from '../../redux/modules/worker'
import {actions as position_actions, position_store} from '../../redux/modules/position';
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
            let disabled: boolean;
            const list = this.props.manage_check.person_list
            for (let i of this.props.worker.person) {
                if (list.indexOf(i.id) >= 0) {
                    disabled = true
                } else {
                    disabled = false
                }
            }
            return (
                <Radio key={value.id} style={radioStyle} value={value.id} disabled={disabled}>{value.name}</Radio>
            )
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
    onSubmit(evnet) {
        const form = this.props.form.getFieldsValue()
        console.log(form)
    }
    render() {
        const { getFieldProps } = this.props.form;
        return (
            <Form onSubmit={this.onSubmit.bind(this) }>
                <Row>选择职工</Row>
                <Radio.Group defaultValue={''} {...getFieldProps('radio')}>
                    {this.getAddRadioSelect() }
                </Radio.Group>
                <Row>选择岗位</Row>
                <Radio.Group defaultValue={''}>
                    {this.getPositionSelect() }
                    <Button onClick={this.onSubmit.bind(this) }>添加</Button></Radio.Group>
            </Form>
        )
    }
}
const AddStudyWorkerForm = Form.create({})(addStudyWorkerForm)
export default AddStudyWorkerForm
