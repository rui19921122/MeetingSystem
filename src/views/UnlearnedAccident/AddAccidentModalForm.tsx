///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react'
import {Row, Col, Form, Radio, Button, Upload} from 'antd'
import {actions as accident_actions} from '../../redux/modules/accident';
interface addStudyFormInterface {
  dispatch:Redux.Dispatch,
}
class addStudyForm extends React.Component<any, any> {
  handleSubmit() {
  }

  render() {
    const {getFieldProps} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this) }
      >
        <Row type='flex' justify='center'>
          <Col>
            <h2>添加事故案例</h2>
          </Col>
        </Row>
        <Row><Col>内容</Col></Row>
        <textarea {...getFieldProps('content') } className="text-area"/>
        <Row type='flex' justify='center'>
          <Col>
          <Button onClick={() => this.props.dispatch(accident_actions.add_accident(
                        this.props.form.getFieldProps('content').value
                    )) }>添加</Button>
          <Button onClick={() => {
                        alert('自己删！别懒')
                    } }>重置</Button>
            </Col>
        </Row>
      </Form>
    )
  }
}
const AddStudyModalForm = Form.create({})(addStudyForm);
export default AddStudyModalForm
