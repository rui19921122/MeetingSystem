/**
 *
 * Created by Administrator on 2016/5/18.
 */
///<reference path="../../../typings/browser.d.ts"/>

import * as React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Table, Button, Modal, Columns, DatePicker, Upload, message} from 'antd'
import CustomMenu from '../../components/Menu'
import {actions, ClassPlanInterface} from '../../redux/modules/class_plan'
import ClassPlanTable from './ClassPlanTable'
interface Props extends React.Props<any> {
  menu:any,
  dispatch:Redux.Dispatch,
  class_plan:ClassPlanInterface
}
interface UploadFileProps {
  uid:string,
  name:string,
  status:'done'|'uploading'|'error'|'removed',
  response:Object
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class ClassPlanView extends React.Component<Props, any> {
  constructor(props) {
    super(props)
  }

  render() {
    const columns = [{
      title: '序号',
      render: (text, record, index)=>index + 1,
      key: 'index'
    },
      {
        title: ''
      }
    ];
    return (
      <Row>
        <Col span={4}>
          <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/>
        </Col>
        <Col span={20}>
          <Row type='flex' justify='center'>
            <h1 className='title-header'>班计划查询</h1>
          </Row>
          <Row type='flex' justify='center' style={{ marginBottom: '10px' }}>
            <Col>
              <DatePicker onChange={(value)=>{
              this.props.dispatch(actions.SelectDateChange(value));
              this.props.dispatch(actions.query_class_plan())
              }}/>
            </Col>
          </Row>
          {!this.props.class_plan.items ?
            <Row justify='center' type='flex' className='block'>
              <Col>没有发现当日的班计划，你可以尝试
                            <Upload action={'/api/upload/class-plan/' + this.props.class_plan.select_date}
                                onChange={(info) => {
                  let file:UploadFileProps = (info as any).file;
                  if(file.status==='done'){
                    message.success("上传成功，即将刷新页面");
                    setTimeout(
                      ()=>{
                        this.props.dispatch(actions.query_class_plan())
                      },1000
                    )
                  }else if(file.status==='error'){
                    message.error(file.response['error'])
                  }
                  }
                } showUploadList={false}><Button
                  type='ghost'>上传{this.props.class_plan.select_date}日班计划</Button></Upload>
              </Col></Row> :
            <ClassPlanTable class_plan={this.props.class_plan} dispatch={this.props.dispatch}/>}
        </Col>
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu,
  class_plan: state.class_plan
});
export default connect(mapStateToProps)(ClassPlanView)
