/* 页面设计器
 * @Author: houxingzhang
 * @Date: 2019-08-28 20:00:24
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-08-29 21:24:01
 */
import React, {Component} from 'react'
import {
  Layout,
  Menu,
  Icon,
  Tabs,
  Col,
  Input,
  Select,
  Button,
  Tooltip,
  Form
} from 'antd'
import './page_designer.scss'
import menus from './compontMenu'
import componentConfig from '../config/index'
import _ from 'lodash';

const allComponents = require('../components/index').default

const {Content, Sider} = Layout
const {SubMenu} = Menu
const {TabPane} = Tabs
const {Option} = Select

export default class Designer extends Component {

  constructor() {
    super()
    this.state = {
      menus, // 组件菜单
      staticDataSource: {}, // 当前设计器里的组件用到的静态数据源, 挂载在此对象上
      dynamicComponentList: [], // 当前设计器里所有的动态组件集合

      componentIndex: 0, // 创建dom时给累加为id标识,不重复
      isDesign: false, // 当前处理开始设计模式
      editComponentId: 0, // 当前要编辑的对象，弹出配置窗的那个组件对象Id
      
      openKeys: ['from'],
      toggle: [], // 显示隐藏开关列表
      activeId: '', //当前激活的元素,鼠标点击的元素
      timespan: '' //更新标识
    }

    this.rootSubmenuKeys = []
    // 组件变量, 不影响UI
    this.data = {
      draggable: { // 拖拽
        move: null, // 移动的组件对象
        current: {}, // 当前拖拽的对象
        hover: false // 拖拽移动到上面的对象
      }
    }
  }

  // 组件菜单列表
  menuList = (list) => {
    return list.map(item => {
      if (!item.subMenus || item.subMenus.length === 0) {
        return <Menu.Item key={item.key}>
          <div
            draggable='true'
            id={'comp_' + item.key}
            onDragStart={e => this.dragStartHandle(e, item)}
            key={item.key}>{item.name}</div>
        </Menu.Item>
      } else {
        return (
          <SubMenu
            key={item.key}
            title={item.icon
            ? <span>
                <Icon type={item.icon}/>
                <strong>{item.name}
                </strong>
              </span>
            : <strong>{item.name}
            </strong>}>
            {this.menuList(item.subMenus)}
          </SubMenu>
        )
      }
    })
  }

  // 菜单点击展开
  onOpenChange = openKeys => {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({openKeys});
    } else {
      this.setState({
        openKeys: latestOpenKey
          ? [latestOpenKey]
          : []
      });
    }
  }

  // 查询拖拽对象
  findCanDropTarget(target) {
    if (target.className.indexOf('draggable') !== -1) {
      return target
    } else {
      return this.findCanDropTarget(target.parentNode)
    }
  }

  // 设计器与源码预览切换
  tabCallback = key => {
    //TODO:  源码预览切换,请进行编辑逻辑
  }

  // 拖拽开始
  dragStartHandle(e, data) {
    this.data.draggable.current = data // 当前拖拽的对象
    /*   e.target.setAttribute('class', 'drop-move')  //FIXME:  拖动的样式, 当前无效 记得要修复
    draggable.move = e.target */
    // this.setState({draggable})
  }
  // 拖拽到上面
  dragOverHandle(e, dom) {
    e.preventDefault();
    if (!this.data.draggable.hover) {
      this.data.draggable.hover = true // 拖拽到上面标识
      this.setState({activeId: dom})
    }
    console.log('拖拽到上面', dom)
  }

  // 拖拽移除目录对象
  dragLeaveHandle(e, dom) {
    this.data.draggable.hover = false // 拖拽到上面标识
    this.setState({activeId: null})
    console.log('移出去了')
  }

  // 拖拽释放结束
  dropHandle(e, dom) {
    this.data.draggable.hover = false // 当前拖拽的对象
    this.setState({isDesign: true, activeId: null})
    const component = this.getComponent(this.data.draggable.current) // 获取对应类型的组件
    if (!component) 
      return
    let {dynamicComponentList} = this.state
    dynamicComponentList.push(component)
    this.setState({dynamicComponentList})
    this.currentComponentEditHandle(component)
    console.log('拖拽释放,并获取组件:', component)
  }

  // 获取对应组件类型及相关配置
  getComponent(type) {
    if (!type || !type.key) 
      return
    const name = type
      .key
      .substring(0, 1)
      .toUpperCase() + type
      .key
      .substring(1) // 保障首字大写

    const component = allComponents[name] // 组件类型
    const config = _.cloneDeep(componentConfig[name]) // 组件配置
    if (!component || !config) {
      console.error(`缺少"${name}组件"的相关配置`)
      return
    }
    const id = this.state.componentIndex + 1
    this.setState({componentIndex: id})
    return {config, id, name, type: component}
  }

  // 当前组件进入编辑模式
  currentComponentEditHandle(component) {
    const currentComponentId = this.state.editComponentId
    if (currentComponentId && component.id === currentComponentId) return    
    this.setState({editComponentId: component.id}) //   _.cloneDeep(component) 深拷贝存储当前要编辑的组件
    const domId = `dom_${component.name}_${component.id}`
    this.activeHandle(domId)
    console.log('记录当前要编辑的组件对象:' + domId)
  }

  // 获取当前要编辑的组件,显示到编辑面板上的那个组件
  getEditComponentById(id) {
    return _.find(this.state.dynamicComponentList, {id})
  }

  // 删除当前编辑的组件
  deleteCurrentComponent(e) {
    e.preventDefault()
    console.log('删除当前组件')
    _.remove(this.state.dynamicComponentList, {id: this.state.editComponentId})
    this.setState({
      editComponentId:null,
      activeId: null
    })
  }
  // 动态渲染拖拽生成的组件
  renderComponent(component, index) {
    if (!component) 
      return
    const {config, id, name, type} = component // 组件类型
    const domId = `dom_${name}_${id}`
    const props = config.props // 组件的属性
    if (config.grid) { // 带有栅格属性
      const {col, gutter} = config.grid
      const style = {
        padding: gutter
      }
      return (
        <span
          className={'page_designer_item ' + col + (this.state.activeId === domId
          ? ' isactive'
          : '')}
          key={index}
          id={domId}
          style={style}
          onClick={() => this.currentComponentEditHandle(component)}>
             <Button type="danger" size="small" icon="close" shape="circle" className='actionBtn' onClick={ this.deleteCurrentComponent.bind(this) } />
          {React.createElement(type, props, config.slot)}
        </span>
      )
    } else {
      props.key = index
      props.id = domId
      return React.createElement(type, props, config.slot)
    }
  }

  // 显示的切换开关
  showToggleHandel(val) {
    const {toggle} = this.state
    const index = toggle.indexOf(val)
    if (index === -1) {
      toggle.push(val)
    } else {
      toggle.splice(index, 1)
    }
    console.log('开关列表' + toggle)
    this.setState({toggle})
  }
  // 当前激活的元素
  activeHandle(id) {
    this.setState({activeId: id})
    console.log('当前激活的元素id：' + id)
  }

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

    //TODO: 还需要添加修改
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
    this.setState({
      timespan: new Date().getTime() // 更新视图与状态
    })
    console.log(obj)
  }, 500)

  // 渲染当前组件编辑面板
  renderEditorPanel(id = this.state.editComponentId) {
    if (!id || this.data.draggable.hover) 
      return //  this.data.draggable.hover 拖拽对象释放
    const obj = this.getEditComponentById(id)
    console.log(obj)
    if (!obj) 
      return
    const config = obj.config.config //获取配置项
    return (Object.keys(config).map(category => {
      const item = config[category]
      const id = `panel_${category}_${obj.id}` // 编辑页面的id
      return (item.props && <section className='page_designer_prop_section' key={category}>
        <header onClick={() => this.showToggleHandel(id)}>
          <Icon
            type={this
            .state
            .toggle
            .indexOf(id) > -1
            ? 'caret-up'
            : 'caret-down'}/> {item.label}
        </header>
        <ul
          className={this
          .state
          .toggle
          .indexOf(id) > -1
          ? 'none'
          : ''}>
          {Object
            .keys(item.props)
            .map(type => {
              const prop = item.props[type]
              const [inputId, selectId ] = [`input_${type}_${obj.id}` , `select_${type}_${obj.id}`]
              return (
                <li key={type}>                                  
                  <label>                    
                    <span className='label'>{prop.label}</span>
                    {prop.options || prop.enum || typeof prop.value === 'boolean'
                      ? <Select
                          defaultValue={prop
                          .value
                          .toString()}
                          className='input'
                          size='small'
                          key={selectId }
                          id={selectId}
                          ref={selectId}
                          onChange={val => this.updateEditComponent(category, type, prop.label, val, obj)}>
                          {this.createEditorPanelOption(prop)}
                        </Select>
                      : <Input
                        size='small'
                        className='input'
                        defaultValue={prop.value}
                        key={inputId }
                        id={inputId }
                        ref={inputId}
                        onChange={e => {
                        e.persist();
                        this.updateEditComponent(category, type, prop.label, e.target.value, obj)
                      }}/>
                    }
                    {prop.tip && 
                      <Tooltip title={prop.tip} >
                        <Icon type="question-circle"    theme="twoTone" twoToneColor="#1890ff"/>
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

  // 创建编辑页面的下拉选项
  createEditorPanelOption(prop) {
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
        .map(item => {
          options.push({key: item, value: item})
        })
    }
    return options.map(option => <Option key={option.key} value={option.key}>{option.value}</Option>)
  }

  render() {
    return (
      <Layout className='page_designer'>
        <Sider className='page_designer_sider page_designer_compent' width='230'>
          <h4 className='page_designer_title'>组件区</h4>
          <Menu
            mode="inline"
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            className='page_designer_menu'>
            {this.menuList(this.state.menus)}
          </Menu>
        </Sider>
        <Layout className='page_designer_panel'>
          <Content>
            <div className='drag-container'>
              <Tabs onChange={this.tabCallback} type="card">
                <TabPane tab="设计器" key="1">
                  <div
                    id='dom_0'
                    className={'draggable ant-row ' + (this.state.activeId === 'dom_0'
                    ? 'isdroping'
                    : '')}
                    onDragOver={e => this.dragOverHandle(e, 'dom_0')}
                    onDragLeave={e => this.dragLeaveHandle(e, 'dom_0')}
                    onDrop={e => this.dropHandle(e, 'dom_0')}>
                    {!this.state.isDesign && <div className='page_designer_tip'>
                      请拖组件到这里进行设计
                    </div>}
                    {this
                      .state
                      .dynamicComponentList
                      .map((component, index) => this.renderComponent(component, index))}
                   </div>
                </TabPane>
                <TabPane tab="代码" key="2">
                  源代码预览
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
        <Sider className='page_designer_sider page_designer_props' width='315'>
          {this.state.editComponentId
            ? <h4
                className='page_designer_title'
                style={{ paddingRight: '15px'}}>
                <Button type="primary" shape="circle" icon="close" className='fr' size='small'/> 
                {this.state.editComponentId && this.getEditComponentById(this.state.editComponentId).config.title}组件属性
              </h4>
            : <div className='page_designer_tip'>请选择组件</div>
          }
          <div data-desc='属性配置区'>
            {this.renderEditorPanel()}
          </div>
        </Sider>
      </Layout>
    )
  }
}
