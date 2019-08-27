import React, {Component} from 'react'
import {Layout, Menu, Icon, Tabs,Col} from 'antd'
import './page_designer.scss'
import menus from './compontMenu'
import componentConfig from '../config/index'

const allComponents = require('../components/index').default

const {Content, Sider} = Layout
const {SubMenu} = Menu
const {TabPane} = Tabs

export default class Designer extends Component {

  constructor() {
    super()
    this.state = {
      menus, // 组件菜单
      componentIndex: 0, // 创建dom时给累加为id标识,不重复
      dynamicComp: [], // 当前动态组件
      isDesign: false, // 当前处理开始设计模式
      editComponent: null , // 当前要编辑的对象，弹出配置窗的那个组件对象 ----------------------
      draggable: { // 拖拽
        move:null, // 移动的组件对象
        current: {}, // 当前拖拽的对象
        hover: null // 拖拽移动到上面的对象
      },
      openKeys: ['from']
    }

    this.rootSubmenuKeys = []
  }

  menuList = (list) => {
    return list.map(item => {
      if (!item.subMenus || item.subMenus.length === 0) {
        return <Menu.Item key={item.key}>
          <div
            draggable='true'           
            id={'comp_' +item.key}
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
  tabCallback = key => {}

  // 拖拽开始
  dragStartHandle(e, data) {
    let draggable = this.state.draggable
    draggable.current = data // 当前拖拽的对象
  /*   e.target.setAttribute('class', 'dropMove')  // 拖动的样式, 当前无效
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
    const component = this.getComponent(this.state.draggable.current)  // 获取对应类型的组件

    if (!component) return
    let dynamicComp = this.state.dynamicComp
    dynamicComp.push(component)
    this.setState({dynamicComp})
    this.currentComponentEditHandle(component) // 
    console.log('拖拽释放,并获取组件:', component)
  }

  // 获取对应组件类型及相关配置
  getComponent(type) {
    if (!type || !type.key) return
    const name = type.key.substring(0, 1).toUpperCase() + type.key.substring(1) // 保障首字大写
    const component = allComponents[name] // 组件类型
    const config = componentConfig[name] // 组件配置
    if (!component || !config) {
      console.error(`缺少"${name}组件"的相关配置`)      
      return  
    }
    const id = this.state.componentIndex +1
    this.setState({
      componentIndex: id
    })
    return { config, id, name, type:component }
  }

 
 
  // 当前组件进入编辑模式
  currentComponentEditHandle (component) {
    const currentComponent = this.state.editComponent
    if (currentComponent && component.id === currentComponent.id) return

    this.setState({
      editComponent: component
    })
    console.log('记录当前要编辑的组件对象')
  }
  // 动态渲染组件
  renderComponent(component, index) {
    if (!component) return 
    const {config, id, name, type} = component // 组件类型
    if (config.grid) { // 带有栅格属性
      const {col, gutter}  = config.grid
      const style = {
        padding: gutter
      
      }
      return (
        <span className={col} key={index} id={'dom_' + id } style={style} onClick={ () => this.currentComponentEditHandle(component) }>
          {React.createElement(type, config.props, config.slot)}
        </span>
      )
    } else  {
      config.props.key = index
      config.props.id = 'dom_' + id
      return React.createElement(type, config.props, config.slot)
    }  
  }

  // 渲染当前组件编辑面板
  renderEditorPanel(name, index, obj) {
    debugger
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
        <Sider className='page_designer_sider page_designer_props' width='260'>
          <h4 className='page_designer_title'>
            组件属性</h4>

            <div data-desc='属性配置区'>
                {
                  // this.state.editComponent && Object.keys(this.state.editComponent).map((name, index, obj) => this.renderEditorPanel(name, index, obj))
                  this.renderEditorPanel(this.state.editComponent)
                }
            </div>
        </Sider>
      </Layout>
    )
  }
}
