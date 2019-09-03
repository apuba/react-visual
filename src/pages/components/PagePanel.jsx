/* 页面属性面板
 * @Author: houxingzhang
 * @Date: 2019-09-02 17:57:29
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-03 21:03:00
 */
import React, { Component } from 'react'
import { Icon, Tooltip, Button, Modal, Form, Input } from 'antd'
import * as tips from '../../config/tipTypes'
import { connect } from 'react-redux'
import { updateBaseState, updateToggle } from '../../redux/reducers/designer/action'
import _ from 'lodash'

class PagePanel extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalAction: null, // 模态窗打开时的处理动作
      modalShow: false,
      modalTitle: '新增数据源',
      dataSourceType: '', // 数据源类型
      dataSourceList: []
    }
  }

  // 模态窗口取消
  modalCancelHandle (e) {
    this.setState({
      modalShow: false
    })
  }

  // 模态窗口确定
  modalOkHandle (e) {
    this.setState({
      modalShow: false
    })
  }

  // 编辑数据源
  editDataSourceHandle (name, list) {
    this.setState({
      modalAction: 'edit', // 进入编辑模式
      dataSourceType: name,
      modalShow: true,
      dataSourceList: _.cloneDeep(list),
      modalTitle: `编辑数据源( ${name} )`
    })
  }
  // 添加一个条记录
  modalAddHandle () {
    const { dataSourceList } = this.state
    dataSourceList.push({
      key: '',
      value: ''
    })
    this.setState({
      dataSourceList
    })
  }

  render () {
    const { dataSource, toggle } = this.props
    // const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form
    return (
      <div>
        <section className='page_designer_prop_section'>
          <header>
            <a className='fr' >
              <Tooltip title='增加数据源'>
                <Icon type='plus' />
              </Tooltip>
            </a>
            <a onClick={e => this.props.updateToggle('datasource_static')}>
              <Icon type='caret-down' />
              <span style={{ paddingRight: '10px' }}>静态数据源</span>
              <Tooltip title={tips.STATIC_SOURCE_TIP} >
                <Icon type='question-circle' theme='twoTone' twoToneColor='#1890ff' />
              </Tooltip>
            </a>
          </header>
          <ul className={toggle.indexOf('datasource_static') > -1 ? 'none' : ''}>
            { dataSource.static && Object.keys(dataSource.static).map( name => {
              const list = dataSource.static[name]
              return <li key={name}><span className='fr'>
                <Tooltip title='编辑'>
                  <Icon type='edit' theme='filled' className='page_designer_datasource_tool' onClick={(e) => this.editDataSourceHandle(name, list)} />
                </Tooltip>
                <Tooltip title='删除'>
                  <Icon type='rest' theme='filled' className='page_designer_datasource_tool' />
                </Tooltip>
              </span><span> {name}</span> </li>
            })}
          </ul>
        </section>

        <Modal
          title={this.state.modalTitle}
          visible={this.state.modalShow}
          onOk={this.modalOkHandle.bind(this)}
          onCancel={this.modalCancelHandle.bind(this)}
          maskClosable={false}
          footer={[
            <Button key='add' onClick={this.modalAddHandle.bind(this)} icon='plus'>
              增加
            </Button>,
            <Button key='submit' type='primary' onClick={this.modalOkHandle.bind(this)}>
              确定
            </Button>
          ]}
        >
          <div >
            {
              this.state.dataSourceList.map((item, index) => {
                return (
                  <div className='page_designer_datasource_item' key={index}>
                    <Input addonBefore='key' className='page_designer_datasource_input' defaultValue={item.key} key={this.state.dataSourceType + 'key' + (new Date().getTime())} />
                    <span className='page_designer_datasource_symbol'> = </span>
                    <Input addonBefore='value' className='page_designer_datasource_input' defaultValue={item.value} key={this.state.dataSourceType + 'value' + (new Date().getTime())}/>
                    <Button type='primary' shape='circle' size='small' icon='minus' className='page_designer_datasource_del' />
                  </div>
                )
              })
            }
          </div>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = store => {
  const { designer } = store
  const { toggle, dataSource } = designer
  return { toggle, dataSource }
}

// Form.create({ name: 'horizontal_login' })(PagePanel)

export default connect(mapStateToProps,
  { updateBaseState, updateToggle })(PagePanel)
