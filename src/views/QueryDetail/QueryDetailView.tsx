import {Row, Col, Table, Columns, Slider} from 'antd';
import * as React from 'react';
import CustomMenu from './../../components/Menu/Menu';
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {QueryDetailInterface, actions} from './../../redux/modules/query_detail';
import Route = ReactRouter.Route;
interface Props {
  dispatch: Dispatch,
  query_detail: QueryDetailInterface,
  route: Route,
  query_list: any,
  menu: any,
  params: any
}

export class QueryDetailView extends React.Component<Props,any> {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.dispatch(actions.GetInitialData(this.props.params.id));
  }

  render() {
    window.document.title = '点名详情模块';
    const attend_table_headers: Columns = [
      {key: 'index', title: '序号', dataIndex: 'id', render: (text, record, index)=>index + 1},
      {key: 'name', title: '姓名', dataIndex: 'worker'},
      {key: 'position', title: '工种', dataIndex: 'position'},
      {key: 'study', title: '学员', dataIndex: 'study', render: (text)=>text ? '是' : '否'},
      {key: 'checked', title: '签到时间', dataIndex: 'checked', render: (text)=>text ? text.split('.')[0] : '未签到'},
    ];
    const scrapy_headers: Columns = [
      {key: 'index', title: '序号', dataIndex: 'id', render: (text, record, index)=>index + 1, width: '10%'},
      {key: 'title', title: '标题', dataIndex: 'title', width: '20%'},
      {key: 'content', title: '内容', dataIndex: 'content', width: '70%'},
    ];
    return (
      <Row>
        <Col span={4}>
          <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/>
        </Col>
        <Col span={20}>
          <Row align={'middle'} justify={'center'} type={'flex'}>
            <h1 className="title-header">点名详情模块
              <span><Slider
                defaultValue={2}
                min={1}
                max={5}
                step={0.2}
                onChange={(value)=>{this.props.dispatch(actions.ChangeFontSize(value))}}/></span>
            </h1>
          </Row>
          {this.props.query_detail.fetching ?
            <Row align={'middle'} justify={'center'} type={'flex'}>
              <h2>载入中，请稍后</h2>
            </Row>:
            <Row align={'middle'} justify={'center'} type={'flex'}
                 style={{fontSize:this.props.query_detail.font_size+'em'}}>
              <Col span={15}>
                <table width={'100%'} style={{textAlign:'center',border:'1px solid #000'}}>
                  <tr style={{fontWeight:'normal'}}>
                    <th>部门</th>
                    <th>日期</th>
                    <th>点名人</th>
                    <th>开始时间</th>
                    <th>结束时间</th>
                    <th>班次</th>
                    <th>属性</th>
                  </tr>
                  <tr>
                    <td>{this.props.query_detail.detail.department}</td>
                    <td>{this.props.query_detail.detail.date}</td>
                    <td>{this.props.query_detail.detail.host_person}</td>
                    <td>{this.props.query_detail.detail.begin_time.split('.')[0]}</td>
                    <td>{this.props.query_detail.detail.end_time.split('.')[0]}</td>
                    <td>{this.props.query_detail.detail.class_number}班</td>
                    <td>{this.props.query_detail.detail.day_number == 1 ? '白班' : '夜班'}</td>
                  </tr>
                </table>
                <p style={{margin: '30px'}}>点名备注:{this.props.query_detail.detail.note ?
                  <audio src={this.props.query_detail.detail.note}/>: '本次点名无备注'}</p>
                <h4 style={{marginTop:'30px', textAlign:'center'}}>点名情况</h4>
                <Table
                  style={{marginTop:'30px',textAlign:'center'}}
                  dataSource={this.props.query_detail.detail.attend_table.person} columns={attend_table_headers}/>
                <h4 style={{marginTop:'30px', textAlign:'center'}}>学习内容</h4>
                {this.props.query_detail.detail.attend_table.scrapy ?
                  <div style={{fontSize:this.props.query_detail.font_size-1+'em' }}>
                    <p>路局班前预想内容</p>
                    <Table dataSource={this.props.query_detail.detail.attend_table.scrapy}
                           columns={scrapy_headers}
                    />
                  </div>
                  : ''}
                <p>录音文件:{this.props.query_detail.audios ?
                  <audio src={this.props.query_detail.audios.audio}/>: '本次点名无录音文件'}</p>
                <p>照片:{this.props.query_detail.photos ?
                  this.props.query_detail.photos.map((value)=>
                  <div>
                    <img src={value.image} alt="" />
                  </div>
                  )
                  : '本次点名无照片'}</p>
              </Col>
            </Row>
          }
        </Col>
      </Row>
    )

  }

}

const mapStateToProps = (state) => ({
  menu: state.menu,
  query_detail: state.query_detail,
  query_list: state.query_list,
});
export default connect(mapStateToProps)(QueryDetailView)
