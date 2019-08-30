import React, { Component } from 'react'
import { Icon, Select, Input, Tooltip } from 'antd'

export default class EditorPanel extends Component {
  render () {
    const { id, draggableHover, toggle } = this.props
    if (!id || draggableHover) { //  this.data.draggable.hover 拖拽对象释放
      return
    }
    const obj = this.getEditComponentById(id)
    console.log(obj)
    if (!obj) return
    const config = obj.config.config // 获取配置项
    return (Object.keys(config).map(category => {
      const item = config[category]
      const id = `panel_${category}_${obj.id}` // 编辑页面的id
      return (item.props && <section className='page_designer_prop_section' key={category}>
        <header>
          <a onClick={() => this.showToggleHandel(id)}>
            <Icon type='caret-down' /> {item.label}
          </a>
        </header>
        <ul
          className={toggle.indexOf(id) > -1 ? 'none' : ''}>
          {Object
            .keys(item.props)
            .map(type => {
              const prop = item.props[type]
              const [inputId,
                selectId] = [`input_${type}_${obj.id}`, `select_${type}_${obj.id}`]
              return (
                <li key={type}>
                  <label>
                    <span className='label'>{prop.label}</span>
                    {prop.options || prop.enum || typeof prop.value === 'boolean' ? 
                      <Select
                        defaultValue={prop
                          .value
                          .toString()}
                        className='input'
                        size='small'
                        key={selectId}
                        id={selectId}
                        ref={selectId}
                        onChange={val => this.updateEditComponent(category, type, prop.label, val, obj)}>
                        {this.createEditorPanelOption(prop)}
                      </Select>: 
                      <Input
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
