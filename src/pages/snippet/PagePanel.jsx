/* 页面属性面板
 * @Author: houxingzhang
 * @Date: 2019-09-02 17:57:29
 * @Last Modified by:   houxingzhang
 * @Last Modified time: 2019-09-02 17:57:29
 */
import React, { Component } from 'react'
import { Icon, Tooltip } from 'antd'
import * as tips from '../../config/tipTypes'
import { connect } from 'react-redux'

class PagePanel extends Component {
  render () {
    const { showToggleHandel, dataSource } = this.props
    return (
      <div>
        <section className='page_designer_prop_section'>
          <header onClick={(e) => showToggleHandel(e)}>
            <a className='fr'><Icon type='plus' /></a>
            <a>
              <Icon type='caret-down' />
              <span style={{ paddingRight: '10px' }}>静态数据源</span>
              <Tooltip title={tips.STATIC_SOURCE_TIP} >
                <Icon type='question-circle' theme='twoTone' twoToneColor='#1890ff' />
              </Tooltip>
            </a>
          </header>
          <ul>
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
  return { dataSource: designer.dataSource }
}

export default connect(mapStateToProps)(PagePanel)
