/* 编辑页面
 * @Author: houxingzhang
 * @Date: 2019-09-02 17:56:44
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-02 21:43:36
 */
import React, { Component } from 'react'
import { Icon, Select, Input, Tooltip } from 'antd'
import { connect } from 'react-redux'
import { updateBaseState } from '../../redux/reducers/designer/action'
import _ from 'lodash'

const { Option } = Select

class EditorPanel extends Component {

  /**
   *  更新当前编辑的组件属性，使用函数节流处理
   *
   * @param {*} category 属性大类
   * @param {*} type 属性的类型
   * @param {*} label 当前属性的标签名
   * @param {*} val 属性值
   * @param {*} obj 当前组件对象
   * @memberof Designer
   */
   updateEditComponent = _.debounce((category, type, label, val, obj) => {
     // FIXME: 当前组件更新了,但父组件没更新UI
    if (!category && !type) {
      console.error('参数配置错误: 缺少category 或 type 参数')
      return
    }
    const {config} = obj
    if (val === 'true') { // 对字符串的 'true' 'false'进行转换
      val = true
    } else if (val === 'false') {
      val = false
    }

    config.config[category].props[type].value = val // 更新配置的值 gutter
    if (category === 'grid') {   // 栅格配置
      config.grid[type] = val
    } else if (type === 'slot') {
      config.slot = val // 当前渲染的内容
    } else if (val === '-' && config.props[type]) { // 如果值为 '-',则删除掉这属性
      delete config.props[type]
    } else {
      config.props[type] = val // 当前渲染的属性
    }
    this.props.updateBaseState('timespan', 'ver:' + new Date().getTime()) // 更新视图与状态
    this.setState({})
    console.log('编辑属性完成',obj)
  }, 500)

  // 获取当前要编辑的组件,显示到编辑面板上的那个组件
  getEditComponentById (id) {
    return _.find(this.props.dynamicComponentList, { id })
  }

  // 创建编辑页面的下拉选项
  createEditorPanelOption (prop) {
    let options = []
    if (prop.options) {
      options = prop.options
    } else if (typeof prop.value === 'boolean') { // 布尔值
      options.push({
        key: 'true',
        value: '是'
      }, {
        key: 'false',
        value: '否'
      })
    } else if (prop.enum) {
      prop
        .enum
        .forEach(item => {
          options.push({ key: item, value: item })
        })
    }
    return options.map(option => <Option key={option.key} value={option.key}>{option.value}</Option>)
  }

  render () {
    const { editComponentId, draggable, toggle } = this.props
    if (!editComponentId || draggable.hover) { //  this.data.draggable.hover 拖拽对象释放
      return false
    }
    const obj = this.getEditComponentById(editComponentId)
    console.log(obj)
    if (!obj) return
    const config = obj.config.config // 获取配置项
    return (Object.keys(config).map(category => {
      const item = config[category]
      const id = `panel_${category}_${obj.id}` // 编辑页面的id
      return (item.props && <section className='page_designer_prop_section' key={category}>
        <header>
          <a onClick={() => this.showToggleHandel(id)}>
            <Icon type='caret-down' /> {item.label}
          </a>
        </header>
        <ul
          className={toggle.indexOf(id) > -1 ? 'none' : ''}>
          {Object
            .keys(item.props)
            .map(type => {
              const prop = item.props[type]
              const [inputId,
                selectId] = [`input_${type}_${obj.id}`, `select_${type}_${obj.id}`]
              return (
                <li key={type}>
                  <label>
                    <span className='label'>{prop.label}</span>
                    {prop.options || prop.enum || typeof prop.value === 'boolean' ? 
                      <Select
                        defaultValue={prop
                          .value
                          .toString()}
                        className='input'
                        size='small'
                        key={selectId}
                        id={selectId}
                        ref={selectId}
                        onChange={val => this.updateEditComponent(category, type, prop.label, val, obj)}>
                        {this.createEditorPanelOption(prop)}
                      </Select>: 
                      <Input
                        size='small'
                        className='input'
                        defaultValue={prop.value}
                        key={inputId}
                        id={inputId}
                        ref={inputId}
                        onChange={e => {
                          e.persist()
                          this.updateEditComponent(category, type, prop.label, e.target.value, obj)
                        }}
                      />
                    }
                    {prop.tip && <Tooltip title={prop.tip}>
                      <Icon type='question-circle' theme='twoTone' twoToneColor='#1890ff'/>
                    </Tooltip>
                    }
                  </label>
                </li>
              )
            })}
        </ul>
      </section>)
    }))
  }
}

const mapStateToProps = store => {
  const { designer } = store
  const { editComponentId, draggable, toggle, dynamicComponentList } = designer
  return { editComponentId, draggable, toggle, dynamicComponentList }
}

export default connect(mapStateToProps,
  { updateBaseState })
  (EditorPanel)