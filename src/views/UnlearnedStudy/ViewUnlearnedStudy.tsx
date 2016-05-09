///<reference path="../../../typings/browser.d.ts"/>

import * as React from 'react'
import {connect} from 'react-redux'
import {Row, Col, Table, Button} from 'antd'
import CustomMenu from '../../components/Menu'
import {actions, StudyInterface} from '../../redux/modules/study'

// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.
interface Props extends React.Props<any> {
    study: StudyInterface,
    menu: any,
    dispatch: Redux.Dispatch
}

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class ViewUnlearnedStudy extends React.Component<Props, void> {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.props.dispatch(actions.get_unlearn_department_study())
    }
    render() {
        const title_length = 10
        const colunms: Antd.Columns = [
            {
                title: '序号',
                render: (text, record, index) => {
                    return index + 1
                },
                key: 'index',
                width: '5%'
            },
            {
                title: '问题',
                dataIndex: 'title',
                render: (text: string, record, index) => {
                    if (text.length > 20) {
                        return text.slice(0, 19) + '...'
                    } else {
                        return text
                    }
                },
                key: 'title',
                width: '15%'
            },
            {
                title: '回答',
                dataIndex: 'answer',
                render: (text: string, record, index) => {
                    if (text.length > 20) {
                        return text.slice(0, 19) + '...'
                    } else {
                        return text
                    }
                },
                key: 'answer',
                width: '15%'
            },
            {
                title: '上传人',
                dataIndex: 'publish_person',
                key: 'publish_person',
                width: '15%'
            },
            {
                title: '一班学习',
                dataIndex: 'checked_by_first',
                key: 'checked_by_first',
                width: '10%',
                render: (text, reocrd, index) => {
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
                key: 'study_by_second',
                width: '10%',
                render: (text, reocrd, index) => {
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
                render: (text, reocrd, index) => {
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
                render: (text, reocrd, index) => {
                    if (text) {
                        return '已学习'
                    } else {
                        return '未学习'
                    }
                }
            }, {
                title: '操作',
                key: 'control',
                width: '10%',
                render: (text, record, index) => {
                    let disabled
                    if (record.checked_by_first || record.checked_by_second || record.checked_by_third || record.checked_by_forth) {
                        disabled = true
                    } else {
                        disabled = false
                    }
                    return <Button disabled={disabled}>删除</Button>
                }
            }
        ]
        return (
            <Row>
                <Col span="4">
                    <CustomMenu menu={this.props.menu} dispatch={this.props.dispatch}/>
                </Col>
                <Col span="20">
                    <Row type='flex' align='center'>
                        <h1 className='title-header'>未全部完成的业务学习管理</h1></Row>
                    <Row type='flex' align='center'>
                        <Button onClick={()=>{console.log()}}>
                          增加业务学习
                        </Button>
                    </Row>
                    <Row type='flex' align='center' className='table'>
                        <Col span='20'>
                            <Table dataSource={this.props.study.items}
                                columns={colunms}
                                pagination={false}
                                />
                        </Col>
                    </Row>
                </Col>
            </Row >
        )
    }
}

const mapStateToProps = (state) => ({
    menu: state.menu,
    study: state.study,
})
export default connect(mapStateToProps)(ViewUnlearnedStudy)
