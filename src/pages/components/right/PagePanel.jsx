/* 页面属性面板
 * @Author: houxingzhang
 * @Date: 2019-09-02 17:57:29
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-07 17:27:25
 */
import React, { Component } from 'react'
import { Icon, Tooltip, Button, Modal, Input, message } from 'antd'
import * as tips from '@config/tipTypes'
import { connect } from 'react-redux'
import { updateBaseState, updateToggle, updateDataSourceStatic } from '@redux/reducers/designer/action'
import useForm from 'react-hook-form' // 引入hookForm 表单校验
import * as validate from '@commons/validate'
import _ from 'lodash'

const { confirm } = Modal

// 创建表单
function NewDataSourceFrom (props) {
  const { register, handleSubmit, errors } = useForm() // 引入 hookform 表单校验
  return (
    <form style={{ margin: '0 auto' }} className='formvalidate'>
      <span className='ant-input-group-wrapper' style={{ width: '70%', marginRight: '15px' }} >
        <span className='ant-input-wrapper ant-input-group'>
          <span className='ant-input-group-addon'>数据源名称</span>
          <input name='name' className={'ant-input ' + (errors.name ? 'error' : '')}
            ref={register({ required: true })}
            onChange={e => props.changeInputHandle({}, e, props.me)} />
        </span>
      </span>
      <Button type='primary' onClick={handleSubmit(props.submit.bind(this, props.me))} >下步</Button>
    </form>
  )
}

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
    this.confirm = confirm
  }
  // 模态窗口取消
  modalCancelHandle (e) {
    this.setState({
      modalShow: false
    })
  }
  // 模态窗口确定保存按钮
  btnSaveDataSource (e) {
    const dataSourceList = []
    this.state.dataSourceList.forEach(item => {
      item.key && item.value && dataSourceList.push(item)
    })
    this.setState({
      dataSourceList,
      modalShow: false
    })
    this.props.updateDataSourceStatic('update', this.state.dataSourceType, dataSourceList)
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
  // 新增数据源
  addDataSourceHandle (name) {
    this.setState({
      modalAction: 'add', // 进入编辑模式
      dataSourceType: '',
      modalShow: true,
      dataSourceList: [],
      modalTitle: '新增数据源'
    })
  }
  // 新增数据源下一步
  addDataSourceNextHandle (e, data) {
    const { name } = data
    if (!validate.variableName.pattern.test(name)) { // 校验格式
      message.error(validate.variableName.tip)
      return
    }
    if (e.props.dataSource.static[name]) {
      message.error('当前静态数据源已存在!')
      return
    }
    e.setState({
      modalAction: 'edit', // 进入编辑模式
      dataSourceType: name,
      modalShow: true,
      dataSourceList: [{
        key: '0',
        value: ''
      }],
      modalTitle: `新增数据源( ${name} )`
    })
  }
  // 添加一个条记录
  modalAddHandle () {
    const { dataSourceList } = this.state
    const lastItem = dataSourceList[dataSourceList.length - 1]
    const isNumber = /^\d+$/.test(lastItem.key)
    const isEn = /^[a-zA-Z]$/.test(lastItem.key) // 是否为单个字母
    // const key = !lastItem ? '0' : (isNumber ? lastItem.key * 1 + 1 : '') // 如果是数字则给key递增
    let key = ''
    if (isNumber) {
      key = lastItem.key * 1 + 1 // 如果是数字则给key递增
    } else {
      const en = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
      if (isEn) {
        const isLowerCase = en.indexOf(lastItem.key) > -1 // 是否为小写
        const index = en.indexOf(lastItem.key.toLowerCase()) // 获取当前字母对应的位置
        key = en[index + 1] // 下一个字母
        key = !isLowerCase ? key.toUpperCase() : key
      }
    }

    dataSourceList.push({
      key,
      value: ''
    })
    this.setState({
      dataSourceList
    })
    const target = isNumber || isEn ? 'value' : 'key'
    setTimeout(() => {
      const input = this.refs[target + (dataSourceList.length - 1)].input
      input.focus()
    }, 200)
  }
  // 删除一条数据源条目
  btnRemoveDataSourceItem (item, index) {
    const { dataSourceList } = this.state
    dataSourceList.splice(index, 1)
    this.setState({
      dataSourceList
    })
  }
  // 删除一条数据源
  removeDataSourceHandle (name, e) {
    const { props } = this
    this.confirm({
      okText: '确认',
      cancelText: '取消',
      title: '您确认要删除此静态数据源?',
      content: `请确保当前设计没使用此数据源：${name}`,
      onOk () {
        props.updateDataSourceStatic('remove', name)
      },
      onCancel () {}
    })
  }

  // 输入框值变化
  changeInputHandle (item, e, _this = this) {
    const { dataSourceList } = _this.state
    item[e.target.name] = e.target.value
    const newState = {
      dataSourceList
    }
    if (_this.state.modalAction === 'add') newState.dataSourceType = e.target.value
    _this.setState(newState)
    console.log(_this.state.dataSourceList, _this.state.dataSourceType)
  }

  // 焦点事件
  focusHandle (target, index, e) {
    const len = this.state.dataSourceList.length
    if (index < len) {
      const input = this.refs[target + index].input
      input.focus()
    } else {
      // alert('新增')
      this.modalAddHandle()
    }
    // input.setSelectionRange(0, input.value.length) //是否全选当前文本
  }
  render () {
    const { dataSource, toggle } = this.props
    return (
      <div>
        <section className='page_designer_prop_section'>
          <header>
            <a className='fr' >
              <Tooltip title='增加数据源'>
                <Icon type='plus' onClick={this.addDataSourceHandle.bind(this)} />
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
            { dataSource.static && Object.keys(dataSource.static).map(name => {
              const list = dataSource.static[name]
              return <li key={name}><span className='fr'>
                <Tooltip title='查看与编辑'>
                  <Icon type='eye' theme='filled' className='page_designer_datasource_tool' onClick={(e) => this.editDataSourceHandle(name, list)} />
                </Tooltip>
                <Tooltip title='删除'>
                  <Icon type='rest' theme='filled' className='page_designer_datasource_tool' onClick={this.removeDataSourceHandle.bind(this, name)} />
                </Tooltip>
              </span><span> {name}</span> </li>
            })}
          </ul>
        </section>

        {<Modal
          title={this.state.modalTitle}
          visible={this.state.modalShow}
          onOk={this.btnSaveDataSource.bind(this)}
          onCancel={this.modalCancelHandle.bind(this)}
          maskClosable={false}
          footer={this.state.modalAction ==='add' ? null: [
            <Button key='add' onClick={this.modalAddHandle.bind(this)} icon='plus'>
              增加
            </Button>,
            <Button key='submit' type='primary' onClick={this.btnSaveDataSource.bind(this)}>
              确定
            </Button>
          ]}
        >
          <div className='page_designer_datasource_list'>
            {
              this.state.modalAction === 'add' &&
              <NewDataSourceFrom submit={this.addDataSourceNextHandle} changeInputHandle={this.changeInputHandle} state={this.state} me={this} />
            }
            {
              this.state.modalAction === 'edit' && this.state.dataSourceList.map((item, index) => {
                return (
                  <div className='page_designer_datasource_item' key={index}>
                    <Input addonBefore='值' name='key' className='page_designer_datasource_input' ref={'key'+ index}
                     onPressEnter={this.focusHandle.bind(this, 'value', index)} onChange={this.changeInputHandle.bind(this, item)} value={item.key} key={this.state.dataSourceType + 'key' + index} />
                    <span className='page_designer_datasource_symbol'> = </span>
                    <Input addonBefore='名称' name='value' ref={'value'+ index} className='page_designer_datasource_input' 
                    onPressEnter={this.focusHandle.bind(this, 'key', index +1)} onChange={this.changeInputHandle.bind(this, item)} value={item.value} key={this.state.dataSourceType + 'value' + index} />
                    {index > 0 &&
                      <Tooltip title='删除当前条目'>
                        <Button type='primary' shape='circle' size='small' icon='minus' className='page_designer_datasource_del' onClick={(e) => this.btnRemoveDataSourceItem(item, index)} />
                      </Tooltip>
                    }
                  </div>
                )
              })
            }
          </div>
        </Modal>}
      </div>
    )
  }
}

const mapStateToProps = store => {
  const { designer } = store
  const { toggle, dataSource } = designer
  return { toggle, dataSource }
}
export default connect(mapStateToProps,
  { updateBaseState, updateToggle, updateDataSourceStatic })(PagePanel)
