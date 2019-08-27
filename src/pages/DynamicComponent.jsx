import React, { Component } from 'react'

export default class DynamicComponent extends Component {
  render () {
    return (
      <div>
        动态组件内容
        {JSON.stringify(this.props.config)}
      </div>
    )
  }
}

