import * as React from 'react'
import { Provider } from 'react-redux'
import { Router } from 'react-router'
import Store = Redux.Store;
interface Props{
  history:any,
  routes:JSX.Element,
  store:Store
}

export default class Root extends React.Component<Props,any> {

  get content () {
    return (
      <Router history={this.props.history}>
        {this.props.routes}
      </Router>
    )
  }

  get devTools () {
    let __DEBUG__ = true;
    let __DEBUG_NEW_WINDOW__ = true;
    //删除上述两个语句，在生产环境中
    if (__DEBUG__) {
      if (__DEBUG_NEW_WINDOW__) {
        if (!(window as any).devToolsExtension) {
          require('../redux/utils/createDevToolsWindow').default(this.props.store)
        } else {
          (window as any).devToolsExtension.open()
        }
      } else if (!(window as any).devToolsExtension) {
        const DevTools = require('containers/DevTools').default;
        return <DevTools />
      }
    }
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <div style={{ height: '100%' }}>
          {this.content}
          {this.devTools}
        </div>
      </Provider>
    )
  }
}
