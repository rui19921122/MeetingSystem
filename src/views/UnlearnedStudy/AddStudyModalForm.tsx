///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react'
import {Row, Col, Form, Radio, Button, FormComponent} from 'antd'
import {actions as study_actions} from '../../redux/modules/study';
interface addStudyFormInterface extends FormComponent {
  dispatch:Redux.Dispatch,
}
class addStudyForm extends React.Component<any, any> {
  handleSubmit() {
  }

  render() {
    //noinspection TypeScriptUnresolvedVariable
    const {getFieldProps} = this.props.form;
    //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
    return (
      <Form onSubmit={this.handleSubmit.bind(this) }
      >
        <Row type='flex' justify='center'>
          <Col>
            <h2>添加学习内容</h2>
          </Col>
        </Row>
        <Row><Col>标题/问题</Col></Row>
        <textarea {...getFieldProps('question') } className="text-area"/>
        <Row>
          <Col>
            答案
          </Col>
        </Row>
        <textarea {...getFieldProps('answer') } className="text-area"/>
        <Row type='flex' justify='center'>
          <Col>
            <Button onClick={() =>this.props.dispatch(study_actions.add_study(
                      this.props.form.getFieldProps('question').value,
                      this.props.form.getFieldProps('answer').value
                    ))  }>添加</Button>
            <Button onClick={()=>{
                      alert('自己删！别懒')
                    }}>重置</Button>
          </Col>
        </Row>
      </Form>
    )
  }
}
const AddStudyModalForm = Form.create()(addStudyForm);
export default AddStudyModalForm
