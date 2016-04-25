/**
 *
 *
 * Created by Administrator on 2016/1/26.
 */
import * as React from 'react'
import { connect } from 'react-redux'
import {Col,Row,Form,Input,Button} from 'antd'
import './style.scss'
import LoginForm from './LoginForm'
const mapStateToProps = (state) => ({
	login: state.login
});
export class Login extends React.Component<any,any> {

	render() {
		return (
			<div>
				<Row className='form' type="flex" justify="center"><Col span="10">
					<LoginForm  {...this.props}/></Col></Row></div>
		)
	}
}

export default connect(mapStateToProps)(Login)
