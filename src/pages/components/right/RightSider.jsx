/* 右侧属性编辑栏
 * @Author: houxingzhang
 * @Date: 2019-09-03 16:31:18
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-03 16:31:41
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Layout, Tooltip, Button } from 'antd'
import PagePanel from './PagePanel'
import EditorPanel from './EditorPanel'
import { updateBaseState, updateToggle } from '@redux/reducers/designer/action'
import _ from 'lodash'

const { Sider } = Layout
class RightSider extends Component {
  // 获取当前要编辑的组件,显示到编辑面板上的那个组件
  getEditComponentById (id) {
    return _.find(this.props.dynamicComponentList, { id })
  }

  // 删除当前编辑的组件
  deleteCurrentComponent (e) {
    e && e.stopPropagation()
    this.props.editComponentId && _.remove(this.props.dynamicComponentList, { id: this.props.editComponentId })
    this.props.updateBaseState('editComponentId', null) // 更新视图与状态
    this.props.updateBaseState('activeId', 'dom_0') // 更新视图与状态
    console.log('删除当前组件')
  }

  render () {
    return (
      <Sider className='page_designer_sider page_designer_props' width='315'>
        {this.props.editComponentId
          ? <section>
            <h4
              className='page_designer_title'>
              <Tooltip title='删除当前组件' placement='bottomRight'>
                <Button type='danger' size='small' icon='close' shape='circle' className='fr' onClick={this.deleteCurrentComponent.bind(this)} />
              </Tooltip>
              {this.props.editComponentId && this.getEditComponentById(this.props.editComponentId).config.title}控件属性
            </h4>
            <div data-desc='属性配置区'>
              <EditorPanel />
            </div>
          </section>
          : <section>
            <h4 className='page_designer_title'><span>页面属性</span></h4>
            <PagePanel />
          </section>
        }
      </Sider>
    )
  }
}

const mapStateToProps = store => {
  const { designer } = store
  const { editComponentId, toggle, dynamicComponentList } = designer
  return { editComponentId, toggle, dynamicComponentList }
}

export default connect(mapStateToProps,
  { updateBaseState, updateToggle })(RightSider)
