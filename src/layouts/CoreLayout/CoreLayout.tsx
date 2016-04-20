import * as React from 'react'
import {Row, Col} from 'antd'
import '../../styles/core.scss'
import CustomMenu from '../../components/Menu'

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
function CoreLayout({children}) {
  return (
    <Row>
      <Col className="header">
        欢迎使用上海铁路局芜湖东站点名会系统网页模块
      </Col>
      <div className='page-container'>
        <div className='view-container'>
          {children}
        </div>
      </div>
    </Row>
  )
}


export default CoreLayout
