///<reference path="../../../typings/browser.d.ts"/>

import * as React from 'react'
import {connect} from 'react-redux'
import {Row, Col} from 'antd'
import CustomMenu from '../../components/Menu'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
interface Props extends React.Props<any> {
  counter:number,
  doubleAsync:any,
  increment:any,
  menu:any,
  dispatch:Redux.Dispatch
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class HomeView extends React.Component<Props, void> {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Row>
        <Col span="4">
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
