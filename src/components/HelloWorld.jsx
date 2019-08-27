import React, { Component } from 'react'

class HelloWorld extends Component {

  constructor() {
    super();
    this.state = {
      switch: 0,
      arg: this.props.name
    }
  }

  clickHander = () => {
    const { name, num } = this.props    
    if (this.state.switch === 0) {
      this.setState({
        switch: 1,
        arg:num
      })
    } else {
      this.setState({
        switch: 0,
        arg:name
      })
    }
  }

  refCallback = (elem) => {
      console.log(elem);
  }

  render () {
    // return <div onClick={this.clickHander}>{this.props.name} say:<strong> Hello World! - {this.props.num}</strong></div>
    return (<div className="container" onClick={this.clickHander}>
    <div ref="hello" className="hello">Hello</div>
    <div ref={this.refCallback} className="world">World</div>
    <div>arg {this.state.arg}</div>
    </div>)
  }
}

export default HelloWorld
