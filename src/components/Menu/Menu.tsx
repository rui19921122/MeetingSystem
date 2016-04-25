/**
 * Created by Administrator on 4/20/2016.
 */
///<reference path="../../../typings/browser.d.ts"/>

import {Menu, Icon} from 'antd'
import * as React from 'react'
import {Link} from 'react-router'
import {getMenu} from '../../redux/modules/menu'

interface props extends React.Props<any> {
  menu:any,
  dispatch:Redux.Dispatch,
}
export default class CustomMenu extends React.Component<props, void> {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  };

  componentDidMount() {
    if(this.props.menu.get){}
    else{
    this.props.dispatch(getMenu())}
  }

  static processSingle(single, index) {
    return <Menu.Item key={single.key}><Link to={single.href}>{single.name}</Link></Menu.Item>
  };

  static processMultiChildren(single, index) {
    return <Menu.Item key={single.key}>
      <Link to={single.href}>{single.name}</Link>
    </Menu.Item>
  };

  static processMulti(multi, index) {
    return (<Menu.SubMenu title={multi.name} key={index+1}>
      {multi.children.map(CustomMenu.processMultiChildren)}
    </Menu.SubMenu>);
  };

  static process(inner, index) {
    if (inner.type === 'single') {
      return CustomMenu.processSingle(inner, index)
    } else {
      return CustomMenu.processMulti(inner, index)
    }
  }


  render() {
    return (
      <Menu
        mode="inline"
      >
        {this.props.menu.items.map(CustomMenu.process)}
      </Menu>
    )
  }
}
