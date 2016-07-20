///<reference path="../../../typings/browser.d.ts"/>

import AddAccidentModalForm from './AddAccidentModalForm'
import * as React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Table, Button, Modal, Upload, message, Columns} from 'antd'
import CustomMenu from '../../components/Menu'
import {actions, AccidentInterface} from '../../redux/modules/accident'


// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
interface Props extends React.Props<any> {
  accident:AccidentInterface,
  menu:any,
  dispatch:Redux.Dispatch
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class ViewUnlearnedAccident extends React.Component<Props, void> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(actions.get_unlearn_department_accident())
  }

  render() {
    const title_length = 10;
    const file_table = [
      {
        title: '文件名',
        dataIndex: 'filename',
        key:'filename',
        width: '80%',
        render: (text, record, index)=> {
          return <a href={record.file} target="_blank">{record.filename}</a>
        }
      },
      {
        title: '操作',
        width: '20%',
        key:'control',
        render: (text:string, record:any, index:number)=> {
          return <Button onClick={()=>{
            this.props.dispatch(actions.delete_files(record.id))
          }
          }>删除</Button>
        }
      },
    ];
    const columns = [
      {
        title: '序号',
        render: (text, record, index) => {
          return index + 1
        },
        key: 'index',
        width: '5%'
      },
      {
        title: '内容',
        dataIndex: 'content',
        render: (text:string, record, index) => {
          if (text.length > 20) {
            return text.slice(0, 19) + '...'
          } else {
            return text
          }
        },
        key: 'title',
        width: '25%'
      },
      {
        title: '上传人',
        dataIndex: 'publish_person',
        key: 'publish_person',
        width: '5%'
      },
      {
        title: '一班学习',
        dataIndex: 'checked_by_first',
        key: 'checked_by_first',
        width: '10%',
        render: (text, record, index) => {
          if (text) {
            return '已学习'
          } else {
            return '未学习'
          }
        }
      },
      {
        title: '二班学习',
        dataIndex: 'checked_by_second',
        key: 'accident_by_second',
        width: '10%',
        render: (text, record, index) => {
          if (text) {
            return '已学习'
          } else {
            return '未学习'
          }
        }
      },
      {
        title: '三班学习',
        dataIndex: 'checked_by_third',
        key: 'checked_by_third',
        width: '10%',
        render: (text, record, index) => {
          if (text) {
            return '已学习'
          } else {
            return '未学习'
          }
        }
      },
      {
        title: '四班学习',
        dataIndex: 'checked_by_forth',
        key: 'checked_by_forth',
        width: '10%',
        render: (text, record, index) => {
          if (text) {
            return '已学习'
          } else {
            return '未学习'
          }
        }
      }, {
        title: '操作',
        key: 'control',
        width: '20%',
        render: (text, record, index) => {
          let disabled;
          disabled = !!(record.checked_by_first || record.checked_by_second || record.checked_by_third || record.checked_by_forth);
          return (
            <Button.Group>
              <Button disabled={disabled} data-id={record.id} onClick={
                                (event) => {
                                    let id = event.target['data-id'];
                                    this.props.dispatch(actions.delete_accident(record.id))
                                }
                            }>删除</Button>
              <Button disabled={disabled}>
                <Upload action={'/api/upload/accident-file/' + record.id + '/'}
                        showUploadList={false}
                        onChange={(info:any)=>{
                      if (info.file.status !== 'uploading') {
                          message.info(`${info.file.name} 正在上传....`);
                        }
                        if (info.file.status === 'done') {
                          message.success(`${info.file.name} 上传成功。`);
                        this.props.dispatch(actions.get_unlearn_department_accident())
                        } else if (info.file.status === 'error') {
                          message.error(`${info.file.name} 上传失败。`);
                        this.props.dispatch(actions.get_unlearn_department_accident())
                        }
                                    }}
                >上传附件</Upload>
              </Button>
              <Button disabled={record.files.length == 0?true:false}
                      onClick={(event)=>{
                      let id = record.id;
                      Modal.info({
                        title:'附件列表',
                        //todo 解决点击删除后不刷新的问题
                        width: '70%',
                        content: <Table columns={file_table}
                                dataSource={record.files}
                                rowKey={(record)=>record.id}/>
                        })
                      }}>
                附件({record.files.length})
              </Button>
            </Button.Group>
          )
        }
      }
    ];
    return (
      <Row>
        <Col span={4}>
          <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/>
        </Col>
        <Col span={20}>
          <Row type='flex' justify='center'>
            <h1 className='title-header'>未全部完成的事故案例</h1></Row>
          <Row type='flex' justify='center'>
            <Button onClick={() => { this.props.dispatch(actions.SHOW_ADD_ACCIDENT_MODAL(true)) } }>
              增加事故案例
            </Button>
          </Row>
          <Row type='flex' justify='center' className='table'>
            <Col span={20}>
              <Table dataSource={this.props.accident.items}
                     columns={columns}
                     rowKey={(record) => record.id}
                     pagination={false}
              />
            </Col>
          </Row>
        </Col>
        <Modal visible={this.props.accident.show_accident}
               onCancel={() => this.props.dispatch(actions.SHOW_ADD_ACCIDENT_MODAL(false)) }
               width='80%'
               footer=''>
          <Row>
            <AddAccidentModalForm dispatch={this.props.dispatch}/>
          </Row>
        </Modal>
      </Row >
    )
  }
}

const mapStateToProps = (state) => ({
  menu: state.menu,
  accident: state.accident,
});
export default connect(mapStateToProps)(ViewUnlearnedAccident)
