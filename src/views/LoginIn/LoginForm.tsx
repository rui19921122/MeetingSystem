import * as React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import {Col, Row, Form, Input, Button} from 'antd'
import {login} from '../../redux/modules/login'
export default class Login extends React.Component<any, any> {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        const { dispatch } = this.props
        // TODO: 解决这里无法引用this的错误
        let username = e.target.username.value
        let password = e.target.password.value
        dispatch(login(username, password))
    }

    render() {
        return (
            <Form horizontal={true} onSubmit={this.handleSubmit}>
                <Form.Item label="用户名" labelCol={{ span: 6,offset:0 }} wrapperCol={{ span: 14,offset:0 }}>
                    <Input id="username"
                      placeholder="请输入您的用户名" />
                </Form.Item>
                <Form.Item label="密码" labelCol={{ span: 6,offset:0 }} wrapperCol={{ span: 14,offset:0 }}>
                    <Input id="password" type="password" placeholder="请输入您的密码"/>
                </Form.Item>
                <Row>
                    <Col span={16} offset="6">
                        <Button type="primary" htmlType="submit">登陆</Button>
                    </Col>
                </Row></Form>)
    }
}
