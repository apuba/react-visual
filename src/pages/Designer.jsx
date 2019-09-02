/* 页面设计器
 * @Author: houxingzhang
 * @Date: 2019-08-28 20:00:24
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-02 21:30:21
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
import PagePanel from './snippet/PagePanel'
import EditorPanel from './snippet/EditorPanel'

import { connect } from "react-redux";
import { updateDynamicComponent, updateEditComponentId, updateDraggable, updateBaseState } from "../redux/reducers/designer/action"
 

const allComponents = require('../components/index').default

const {Content, Sider} = Layout
const {SubMenu} = Menu
const {TabPane} = Tabs
const {Option} = Select

class Designer extends Component {

  constructor() {
    super()
    this.state = {
      menus, // 组件菜单
      dataSource: {
        static: {
          userType:[
            {
              key: '1',
              value: '普通用户'
            },
            {
              key: '2',
              value: '青铜会员'
            },
            {
              key: '3',
              value: '白银会员'
            },
            {
              key: '4',
              value: '黄金会员'
            }
          ]
        },
        dynamic: {}
      }, // 当前设计器里的组件用到的静态数据源, 挂载在此对象上

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
    /* // 组件变量, 不影响UI
    this.data = {
      draggable: { // 拖拽
        move: null, // 移动的组件对象
        current: {}, // 当前拖拽的对象
        hover: false // 拖拽移动到上面的对象
      }
    } */
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
    // this.props.draggable.current = data // 当前拖拽的对象
    this.props.updateDraggable('current', data)  // 当前拖拽的对象
  }
  // 拖拽到上面
  dragOverHandle(e, dom) {
    e.preventDefault();
    if (!this.props.draggable.hover) {
      // this.props.draggable.hover = true // 拖拽到上面标识
      this.props.updateDraggable('hover', true)  // 当前拖拽的对象

      this.setState({activeId: dom})
    }
    console.log('拖拽到上面', this.props.draggable.hover)
  }

  // 拖拽移除目录对象
  dragLeaveHandle(e, dom) {
    this.props.updateDraggable('hover', false)  // 当前拖拽的对象
    this.setState({activeId: null})
    console.log('移出去了')
  }

  // 拖拽释放结束
  dropHandle(e, dom) {
    this.props.updateDraggable('hover', false)  // 当前拖拽的对象    
    this.setState({isDesign: true, activeId: null})
    const component = this.getComponent(this.props.draggable.current) // 获取对应类型的组件
    if (!component) return
    this.props.updateDynamicComponent(component) // 添加动态组件
    this.currentComponentEditHandle(e, component)
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
      console.error(`缺少'${name}组件'的相关配置`)
      return
    }
    const id = this.state.componentIndex + 1
    this.setState({componentIndex: id})
    return {config, id, name, type: component}
  }

  // 当前组件进入编辑模式
  currentComponentEditHandle(e, component) {
    e.stopPropagation() // 阻止事件冒泡
    // e.nativeEvent.stopImmediatePropagation()
    const domId = `dom_${component.name}_${component.id}`
    this.activeHandle(domId)
    const currentComponentId = this.props.editComponentId
    if (currentComponentId && component.id === currentComponentId) return    

    // this.setState({editComponentId: component.id}) //   存储当前要编辑的组件
    this.props.updateEditComponentId(component.id)
    console.log('记录当前要编辑的组件对象:' + domId)
  }

  // 获取当前要编辑的组件,显示到编辑面板上的那个组件
  getEditComponentById(id) {
    return _.find(this.props.dynamicComponentList, {id})
  }
  // 显示页面属性
  showPageAttribute(e) {
    debugger
    this.setState({
      editComponentId: null
    })   
    this.activeHandle('dom_0')
  }
  // 删除当前编辑的组件
  deleteCurrentComponent(e) {
    e && e.stopPropagation()
    this.props.editComponentId && _.remove(this.props.dynamicComponentList, {id: this.props.editComponentId})
    this.setState({
      editComponentId:null,
      activeId: 'dom_0'
    })
    console.log('删除当前组件')
  }
  // 动态渲染拖拽生成的组件
  renderComponent(component, index) {
    if (!component) return false
    // if (!component || this.props.draggable.hover) return false
 
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
          onClick={(e) => this.currentComponentEditHandle(e, component)}>
             <Tooltip title='删除此组件'>
             <Button type='danger' size='small' icon='close' shape='circle' className='actionBtn' onClick={ this.deleteCurrentComponent.bind(this) }  />
             </Tooltip>
          <label>{config.grid.label}</label>
          <span>{React.createElement(type, props, config.slot)}</span>
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

  render() {
    return (
      <Layout className='page_designer'>
        <Sider className='page_designer_sider page_designer_compent' width='240'>
          <h4 className='page_designer_title'>组件区</h4>
          <Menu
            mode='inline'
            openKeys={this.state.openKeys}
            onOpenChange={this.onOpenChange}
            className='page_designer_menu'>
            {this.menuList(this.state.menus)}
          </Menu>
        </Sider>
        <Layout className='page_designer_panel'>
          <Content>
            <div className='drag-container'>
              <div className='page_designer_toolbar'>
                <Tooltip title='数据源管理' >
                  <Button type='primary' shape='circle' icon='codepen' />
                </Tooltip>
                <Tooltip title='弹窗管理' >
                  <Button type='primary' shape='circle' icon='block' />
                </Tooltip>
                <Tooltip title='自定义CSS样式' >
                  <Button type='primary' shape='circle' icon='container' />
                </Tooltip>                 
              </div>
              <Tabs onChange={this.tabCallback} type='card'>
                <TabPane tab='设计器' key='1'>
                  <div
                    id='dom_0'
                    className={'draggable ant-row ' + (this.state.activeId === 'dom_0'
                    ? 'isdroping'
                    : '')}
                    onClick={ this.showPageAttribute.bind(this)}
                    onDragOver={e => this.dragOverHandle(e, 'dom_0')}
                    onDragLeave={e => this.dragLeaveHandle(e, 'dom_0')}
                    onDrop={e => this.dropHandle(e, 'dom_0')}>
                    {!this.state.isDesign && <div className='page_designer_tip'>
                      <span>请拖组件到这里进行设计</span>
                    </div>}
                    {this
                      .props
                      .dynamicComponentList
                      .map((component, index) => this.renderComponent(component, index))}
                   </div>
                </TabPane>
                <TabPane tab='代码' key='2'>
                  源代码预览
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
        <Sider className='page_designer_sider page_designer_props' width='315'>
          {this.props.editComponentId
            ? <section>
              <h4
                className='page_designer_title'> 
                <Tooltip title='删除当前组件' placement='bottomRight'>
                  <Button type='danger' size='small' icon='close' shape='circle' className='fr' onClick={ this.deleteCurrentComponent.bind(this) }  /> 
                </Tooltip>                 
                {this.props.editComponentId && this.getEditComponentById(this.props.editComponentId).config.title}组件属性
              </h4>
              <div data-desc='属性配置区'>              
                <EditorPanel showToggleHandel={ this.showToggleHandel} />
              </div>
              </section>
            : <section>
                <h4 className='page_designer_title'><span>页面属性</span></h4>  
                <PagePanel showToggleHandel={ this.showToggleHandel} />
              </section>
          }
        </Sider>
      </Layout>
    )
  }
}

const mapStateToProps = store => {
  const { designer } = store
  const { editComponentId, dynamicComponentList, draggable } = designer
  return { editComponentId, dynamicComponentList, draggable }
}


export default connect(
  mapStateToProps,
  { updateDynamicComponent, updateEditComponentId, updateDraggable, updateBaseState }
)(Designer);