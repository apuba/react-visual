/* 页面属性面板
 * @Author: houxingzhang
 * @Date: 2019-09-02 17:57:29
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-03 15:48:33
 */
import React, { Component } from 'react'
import { Icon, Tooltip } from 'antd'
import * as tips from '../../config/tipTypes'
import { connect } from 'react-redux'
import { updateBaseState, updateToggle } from '../../redux/reducers/designer/action'

class PagePanel extends Component {
  render () {
    const { dataSource, toggle } = this.props
    return (
      <div>
        <section className='page_designer_prop_section'>
          <header>
            <a className='fr' ><Icon type='plus' /></a>
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
              return <li key={name}><span> {name}</span> </li>
            })}
          </ul>
        </section>
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
  { updateBaseState, updateToggle })(PagePanel)
