///<reference path="../../../typings/browser.d.ts"/>
///<reference path="../../../typings/browser/ambient/react/index.d.ts"/>

import * as React from 'react'
import {connect} from 'react-redux'
import {Row, Col} from 'antd'
import CustomMenu from '../../components/Menu'

interface Props extends React.ReactPropTypes {
  counter:number,
  doubleAsync:any,
  increment:any,
  menu:any,
  dispatch:Redux.Dispatch
}

export class HomeView extends React.Component<Props, void> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row >
        <Col span={4} >
          <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/>
        </Col></Row>
    )
  }
}

const mapStateToProps = (state) => ({
  counter: state.counter,
  menu: state.menu
})
export default connect(mapStateToProps)(HomeView)
