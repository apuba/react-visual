/* 页面设计器
 * @Author: houxingzhang
 * @Date: 2019-08-28 20:00:24
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-03 16:59:18
 */
import React, { Component } from 'react'
import {
  Layout,
  Tabs,
  Button,
  Tooltip
} from 'antd'
import '../assets/scss/page_designer.scss'

import RightSider from './components/right/RightSider'
import LeftSider from './components/left/LeftSider'
import DesignArea from './components/DesignArea'
import Code from './components/Code'
import { connect } from 'react-redux'

const { Content } = Layout
const { TabPane } = Tabs
class Designer extends Component {
  // 设计器与源码预览切换
  tabCallback (key) {
    // TODO: 源码预览切换,请进行编辑逻辑
  }

  render () {
    return (
      <Layout className='page_designer'>
        <LeftSider />
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
                  <DesignArea />
                </TabPane>
                <TabPane tab='代码' key='2'>
                  <Code />
                </TabPane>
              </Tabs>
            </div>
          </Content>
        </Layout>
        <RightSider />
      </Layout>
    )
  }
}

const mapStateToProps = store => {
  const { designer } = store
  const { editComponentId, dynamicComponentList, draggable, timespan, isDesign, activeId } = designer
  return { editComponentId, dynamicComponentList, draggable,timespan, isDesign, activeId }
}

export default connect(mapStateToProps)(Designer)
