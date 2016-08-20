///<reference path="../../../typings/browser.d.ts"/>
import * as React from 'react'
import {Row, Col, Form, Radio, Button, FormComponent, Input} from 'antd'
import {actions} from '../../redux/modules/manage-check';

interface props {
  dispatch:Redux.Dispatch,
  form?:any,
}
class ChangePasswordModal extends React.Component<props, any> {
  handleSubmit() {
  }

  render() {
    //noinspection TypeScriptUnresolvedVariable
    const {getFieldProps} = (this.props.form as any);
    //noinspection TypeScriptUnresolvedVariable,TypeScriptUnresolvedFunction
    const formItemLayout = {
      labelCol: {span: 5, offset: 0},
      wrapperCol: {span: 19, offset: 0},
    };
    return (
      <Form onSubmit={v=>{
        v.preventDefault();
        console.log(actions.ChangePassword)
        this.props.dispatch(actions.ChangePassword(getFieldProps('username').value,
                            getFieldProps('password').value))
      }}
            horizontal={true}>
        <Row type={'flex'} align={'middle'} justify={'center'}>
          <Form.Item label="用户名"
                     style={{width:'70%'}}
            {...formItemLayout}
          >
            <Input {...getFieldProps('username')}/>
          </Form.Item>
          <Form.Item label="密码"
                     style={{width:'70%'}}
            {...formItemLayout}
          >
            <Input
              type={'password'}
              {...getFieldProps('password')}/>
          </Form.Item>
        </Row>
         <Form.Item wrapperCol={{ span: 24, offset: 12 }} style={{ marginTop: 24 }}>
          <Button type="primary" htmlType="submit">确定</Button>
        </Form.Item>
      </Form>

    )
  }
}
const ChangePasswordModalForm = Form.create()((ChangePasswordModal as any));
export default ChangePasswordModalForm
