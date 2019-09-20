/* eslint-disable no-new-func */
/*
 * @Description: 输入框组件
 * @Author: 侯兴章
 * @Date: 2019-09-19 14:10:30
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-20 11:48:07
 */
import React from 'react';
import { Input } from 'antd';
import { connect } from 'react-redux';
import _ from 'lodash';
import * as reduxAction from '../redux/reducers/designer/action';

import BaseComp from './BaseComp';

 class HYInput extends BaseComp {
   constructor(props) {
     super(props)
     this.inputHandle = this.inputHandle.bind(this)
   }

  inputHandle(params) {
    console.log('测试js代码编辑器执行了input内置函数:传来的参数是'+ params)
    // 在js代码编辑里 e.inputHandle('')
  }

  // 对应 HYInput.js 配置文件里对应的事件
  render() {
    let compProps = _.cloneDeep(this.props);
    //  debugger
    delete compProps.designer
    delete compProps.dispatch

    console.log(compProps)
    
    if (compProps.onClick && typeof compProps.onClick === 'string') {
      compProps.onClick = this.onClickHandle;
    }
    if (compProps.onChange && typeof compProps.onChange === 'string') {
      compProps.onChange = this.onChangeHandle;
    }

    return <Input {...compProps} />;
  }
}


const mapStateToProps = store => {
  //   return store.designer;
  const {designer} = store
  const { css, showCodeEditor, codeEditorLanguage, js} = designer;
  return {css, showCodeEditor, codeEditorLanguage, js}
  };

  export default HYInput

// export default connect(mapStateToProps)(HYInput)