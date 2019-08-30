import React, { Component } from 'react'
import { Icon, Tooltip } from 'antd'
import * as tips from '../config/tipTypes'

export class PagePanel extends Component {
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

export default PagePanel
