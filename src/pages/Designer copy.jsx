/* 页面设计器
 * @Author: houxingzhang 
 * @Date: 2019-08-28 20:00:24 
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-08-28 20:54:30
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
  Button
} from 'antd'
import './page_designer.scss'
import menus from './compontMenu'
import componentConfig from '../config/index'
import * as _ from 'lodash'

const allComponents = require('../components/index').default

const {Content, Sider} = Layout
const {SubMenu} = Menu
const {TabPane} = Tabs
const { Option } = Select

export default class Designer extends Component {

  constructor() {
    super()
    this.state = {
      menus, // 组件菜单
      componentIndex: 0, // 创建dom时给累加为id标识,不重复
      dynamicComp: [], // 当前动态组件
      isDesign: false, // 当前处理开始设计模式
      editComponent: null, // 当前要编辑的对象，弹出配置窗的那个组件对象 ----------------------
      draggable: { // 拖拽
        move: null, // 移动的组件对象
        current: {}, // 当前拖拽的对象
        hover: null // 拖拽移动到上面的对象
      },
      openKeys: ['from'],
      toggle: [] ,// 显示隐藏开关列表
      activeId: '', //当前激活的元素,鼠标点击的元素
    }

    this.rootSubmenuKeys = []
  }

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
    alert(`您当前要切换到${key}`)
  }

  // 拖拽开始
  dragStartHandle(e, data) {
    let draggable = this.state.draggable
    draggable.current = data // 当前拖拽的对象
    /*   e.target.setAttribute('class', 'drop-move')  // 拖动的样式, 当前无效
    draggable.move = e.target */
    this.setState({draggable})
  }
  // 拖拽到上面
  dragOverHandle(e, dom) {
    let draggable = this.state.draggable
    draggable.hover = dom // 当前拖拽的对象
    this.setState({draggable})
    e.preventDefault();
  }

  // 拖拽移除目录对象
  dragLeaveHandle(e, dom) {
    let draggable = this.state.draggable
    draggable.hover = null // 当前拖拽的对象
    this.setState({draggable})
    console.log('移出去了')
  }

  // 拖拽释放结束
  dropHandle(e, dom) {
    let draggable = this.state.draggable
    draggable.hover = null // 当前拖拽的对象
    this.setState({draggable, isDesign: true})
    const component = this.getComponent(this.state.draggable.current) // 获取对应类型的组件

    if (!component) 
      return
    let {dynamicComp} = this.state
    dynamicComp.push(component)
    this.setState({dynamicComp})
    this.currentComponentEditHandle(component) //
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
    const config = componentConfig[name] // 组件配置
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
    const currentComponent = this.state.editComponent
    if (currentComponent && component.id === currentComponent.id) return
    this.setState({editComponent: component})

    const domId = `dom_${component.name}_${component.id}`
    this.activeHandle( domId )
    console.log('记录当前要编辑的组件对象')
  }
  // 动态渲染组件
  renderComponent(component, index) {
    if (!component) return
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
          className={col + (this.state.activeId === domId ? ' isactive':'')}
          key={index}
          id={domId}
          style={style}
          onClick={() => this.currentComponentEditHandle(component)}>
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
  showToggleHandel (val) {
    const { toggle } = this.state
    const index = toggle.indexOf(val)
    if (index === -1) {
      toggle.push(val)
    } else {
      toggle.splice(index, 1)
    }
    console.log('开关列表' + toggle)
    this.setState({
      toggle
    })
  }
  // 当前激活的元素
  activeHandle (id) {
    this.setState({
      activeId: id
    })
    console.log('当前激活的元素id：' + id)
  }

 
    /** 
   *  更新当前编辑的组件属性，使用函数节流处理
   *
   * @param {*} category 属性大类
   * @param {*} type 属性的类型
   * @param {*} val 属性值
   * @param {*} obj 当前组件对象
   * @memberof Designer
   */
  updateEditComponent =_.debounce((category, type, val, obj) => {
      console.log(category, type, val, obj)
      const { config } = obj

      debugger

    }, 500)
  
  /* updateEditComponent(e) {
    console.log(e.target.value)
  } */

  // 渲染当前组件编辑面板
  renderEditorPanel(obj) {
    if (!obj) return
    const config = obj.config.config //获取配置项
    return (config.map(item => {
      
      const id = `panel_${item.type}_${item.id}` // 编辑页面的id
      return ( item.props &&
        <section className='page_designer_prop_section' key={item.type}>
          <header>
            <a onClick={ () => this.showToggleHandel(id)} ><Icon type={ this.state.toggle.indexOf(id) > -1 ? 'caret-up': 'caret-down' } style={{
                fontSize: '4px',
                color: '#999'
              }}/> {item.label}
              </a>
          </header>
          <ul className={ this.state.toggle.indexOf(id) > -1 ? 'none': '' }>
            {  item.props.map(prop => {
                return (
                  <li key={prop.type}>
                    <label>
                      <span className='label'>{prop.label}</span>
                      { 
                        prop.options || prop.enum || typeof prop.value === 'boolean' 
                        ? <Select defaultValue={prop.value.toString()} className='input'  size='small' onChange={ val => this.updateEditComponent(item.type, prop.type, val, obj)} >
                            { this.createEditorPanelOption(prop) }
                          </Select>
                        : <Input size='small' className='input'   defaultValue={prop.value} id={prop.type} onChange={ e=>{
                          e.persist()
                          this.updateEditComponent(item.type, prop.type, e.target.value, obj)
                        }} />
                      }
                      </label>
                  </li>
                )
              })}
          </ul>
        </section>
      )
    }))
  }

  // 创建编辑页面的下拉选项
  createEditorPanelOption (prop) {
    let options = []
    if (prop.options) {
      options = prop.options
    } else if(typeof prop.value === 'boolean' ) { // 布尔值
      options.push({
        key: 'true',
        value: '是'
      },
      {
        key: 'false',
        value: '否'
      })
    } else if (prop.enum) {
      prop.enum.map(item => {
        options.push(
          {
            key: item,
            value: item
          }
        )
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
                    className={'draggable ant-row ' + (this.state.draggable.hover === 'dom_0'
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
                      .dynamicComp
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
          { this.state.editComponent 
            ? <h4 className='page_designer_title' style={{ paddingRight:'15px'}}>
          <Button type="primary" shape="circle" icon="close" className='fr' size='small' />{this.state.editComponent.config.title }组件属性</h4>
          : <div className='page_designer_tip'>请选择组件</div>
        }
          <div data-desc='属性配置区'>
            { this.renderEditorPanel(this.state.editComponent)}
          </div>
        </Sider>
      </Layout>
    )
  }
}
