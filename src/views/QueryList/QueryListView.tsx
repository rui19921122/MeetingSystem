///<reference path="../../../typings/browser.d.ts"/>

import * as React from 'react'
import {connect} from 'react-redux'
import {actions, QueryInterface} from '../../redux/modules/query'
import CustomMenu from '../../components/Menu/Menu';
import {Col, Row, DatePicker, Select, Button, Table, Columns} from 'antd';
import {push} from 'react-router-redux';
import Dispatch = Redux.Dispatch;

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
interface Props {
  menu: any,
  dispatch: Dispatch,
  worker: any,
  position: any,
  manage_check: any,
  query_list: QueryInterface
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class QueryListView extends React.Component<Props, void> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(actions.GetQueryData())
  }


  render() {
    window.document.title = '查询模块';
    const props = this.props;
    const Option = Select.Option;
    const tableHeaders: Columns = [
        {key: 'index', title: '序号', dataIndex: 'id', render: (text, record, index)=>index + 1, width: '5%'},
        {
          key: 'date', title: '日期', dataIndex: 'date',
          width: '10%'
        },
        {
          key: 'department', title: '部门', dataIndex: 'department',
          filters: this.props.query_list.department_can_select.map((value)=> {
            return {value: value.name, text: value.name}
          }),
          onFilter: (value, record)=> record.department == value,
          width: '10%'
        },
        {
          key: 'start', title: '开始时间', dataIndex: 'begin_time',
          render: (text: string, record, index)=> {
            return text.split('.')[0]
          },
          width: '15%'
        },
        {
          key: 'end', title: '结束时间', dataIndex: 'end_time',
          render: (text: string, record, index)=> {
            return text.split('.')[0]
          },
          width: '15%'
        },
        {
          key: 'person', title: '点名人', dataIndex: 'host_person',
          width: '10%'
        },
        {
          key: 'class_number', title: '班次', dataIndex: 'class_number', render: (value)=>value + '班',
          width: '10%'
        },
        {
          key: 'day_number',
          title: '属性', dataIndex: 'day_number', render: (value)=>value === 1 ? '白班' : '夜班',
          width: '10%'
        },
      ]
      ;
    return (
      <Row>
        <Col span={4}>
          <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/>
        </Col>
        <Col span={20}>
          <Row align={'middle'} justify={'center'} type={'flex'}>
            <h1 className="title-header">查询模块</h1>
          </Row>
          <Row align={'middle'} justify={'center'} type={'flex'}>
            <Col style={{margin:'0 10px'}}>
              <span>开始日期</span><DatePicker
              defaultValue={this.props.query_list.start|| new Date()}
              onChange={(value)=>this.props.dispatch(actions.UpdateDatePicker({type:'start',value:value}))}
            />
            </Col>
            <Col style={{margin:'0 10px'}}>
              <span>结束日期</span><DatePicker
              defaultValue={this.props.query_list.end|| new Date()}
              onChange={(value)=>this.props.dispatch(actions.UpdateDatePicker({type:'end',value:value}))}
            />
            </Col>
            <Col style={{margin:'0 10px'}}>
              <span>部门</span>
              {this.generateOption()}
            </Col>
            <Col style={{margin:'0 10px'}}>
              <Button
                onClick={()=>this.props.dispatch(actions.GetQueryData())}
              >查询</Button>
            </Col>
          </Row>
          <Row align={'middle'} justify={'center'} type={'flex'} style={{marginTop:'20px'}}>
            <Col span={17}>
              <Table columns={tableHeaders}
                     className='justify_table table'
                     onRowClick={(value)=>!!value.id?this.props.dispatch(push(`/query-detail/${value.id}/`)):''}
                     dataSource={this.props.query_list.data}
                     pagination={15}
              /></Col>
          </Row>
        </Col>
      </Row>
    )
  }

  private generateOption() {
    const Option = Select.Option;
    const data = this.props.query_list;
    if (data.department_can_select.length == 0) {
      return <Select >
      </Select>
    } else {
      return <Select key="select" defaultValue={data.current_department.toString()}
                     style={{width:'70px'}}
                     onChange={(value)=>this.props.dispatch(actions.ChangeCurrentDepartment(value))}
      >
        {data.department_can_select.map(
          (value, index, array)=><Option value={value.id.toString()} key={`select-{value.id}`}
          >{value.name}</Option>
        )}
      </Select>
    }
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu,
  manage_check: state.manage_check,
  worker: state.worker,
  position: state.position,
  query_list: state.query_list
});
export default connect(mapStateToProps)(QueryListView)
