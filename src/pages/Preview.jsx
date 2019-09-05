import React, { Component } from 'react';
  /*
  * 这里声明要引入的组件
  */
  import 'antd/dist/antd.css'
  import '../assets/scss/preview.scss'
  import allComponents from '../components'
  const { Input, Button } = allComponents
     

  /**
  * Preivew 一般是当前页面名称 Preivew.html 
  */
  class Preivew extends Component {
    constructor (props) {
      super(props)
      this.state= {
        dataSource: {
           static: {"testList":[{"key":"1","value":"普通用户"},{"key":"2","value":"青铜会员"},{"key":"3","value":"白银会员"},{"key":"4","value":"黄金会员"}],"test2":[{"key":"a","value":"写入"},{"key":"b","value":"读出"}]}, 
         dynamic: {}, 
        
        }
      }
    }
    render(){
      return(<div class='ant-row design_preview'>
            
      <span key='Input_1' id='Input_1' className={'ant-col-xs-24 ant-col-sm-12 ant-col-md-6'} style={{"padding":"10px"}}>
        <Input  placeholder="请输入文本" type="text" style={{"width":"","color":""}}>
        
        </Input>
      </span>
          
      <span key='Input_2' id='Input_2' className={'ant-col-xs-24 ant-col-sm-12 ant-col-md-6'} style={{"padding":"10px"}}>
        <Input  placeholder="请输入文本" type="text" style={{"width":"","color":""}}>
        
        </Input>
      </span>
          
      <span key='Button_3' id='Button_3' className={'ant-col-xs-24 ant-col-sm-12 ant-col-md-6'} style={{"padding":"10px"}}>
        <Button  type="primary" style={{"width":"","color":""}}>
        提交
        </Button>
      </span>
      </div>)
    }
  }
  export default Preivew;

  