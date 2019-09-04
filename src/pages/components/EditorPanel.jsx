/* 编辑属性面板
 * @Author: houxingzhang
 * @Date: 2019-09-02 17:56:44
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-04 21:09:57
 */
import React, { Component } from 'react'
import { Icon, Select, Input, Tooltip, Divider } from 'antd'
import { connect } from 'react-redux'
import { updateBaseState, updateToggle } from '../../redux/reducers/designer/action'
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
     debugger
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
     debugger
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
  createEditorPanelOption (prop, type) {
    let options = []
    if (type ==='staticDataSource') { // 当前为静态数据源
      const list = this.props.dataSource.static // 静态数据源
      let newOpt = Object.keys(list).map( name => {
        return {
          key: name,
          value: name
        }
      })
      options = [
        {
          key: '-',
          value: '无'
        },
        ...newOpt
      ]

    } else if (prop.options) {
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

  // 下拉菜单添加数据源的事件
  selectAddDataSourceHandle (type, e) {
    // TODO: 此处还可以根据 type 属性类型进行不同逻辑处理,目前默认为静态数据源
    this.props.updateBaseState('editComponentId', null)
    this.props.updateBaseState('activeId', 'dom_0')
  }
  // 创建组件的属性
  renderProps (config, type) {
    switch (type) {
      case 'staticDataSource':
      case 'dynamicDataSource':
          return {
            dropdownRender: (menu, props) => (
              <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                <div data-desc='自定义条目' style={{ padding: '0 0 10px 10px', cursor: 'pointer' }} onClick={ this.selectAddDataSourceHandle.bind(this, type)}>
                  <Icon type='plus' /> 添加数据源
                </div>
              </div>
            )
          }
      default:
        return {}
    }
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
          <a onClick={() => this.props.updateToggle(id)}>
            <Icon type='caret-down' /> {item.label}
          </a>
        </header>
        <ul
          className={toggle.indexOf(id) > -1 ? 'none' : ''}>
          {Object
            .keys(item.props)
            .map(type => {
              const prop = item.props[type]
              const [inputId, selectId] = [`input_${type}_${obj.id}`, `select_${type}_${obj.id}`]
              // 定义组件的属性
              const attrs =  this.renderProps(config, type)
              return (
                <li key={type}>
                  {/* TODO: 这里添加 onMouseDown 是为了阻止Select默认行为导致 dropdownRender 无法生效  */}
                  <label  onMouseDown={(e) => { e.preventDefault(); return false; }} > 
                    <span className='label'>{prop.label}</span>
                    {prop.options || prop.enum || typeof prop.value === 'boolean' ? 
                      <Select { ...attrs }
                        defaultValue={prop
                          .value
                          .toString()}
                        className='input'
                        size='small'
                        key={selectId}
                        id={selectId}
                        ref={selectId}
                        onChange={val => this.updateEditComponent(category, type, prop.label, val, obj)}>
                        {this.createEditorPanelOption(prop, type)}
                      </Select>: 
                      <Input { ...attrs }
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
  const { editComponentId, draggable, toggle, dynamicComponentList, dataSource } = designer
  return { editComponentId, draggable, toggle, dynamicComponentList, dataSource }
}

export default connect(mapStateToProps,
  { updateBaseState, updateToggle })
  (EditorPanel)