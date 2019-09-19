/* eslint-disable no-new-func */
/*
 * @Description: 输入框组件
 * @Author: 侯兴章
 * @Date: 2019-09-19 14:10:30
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-19 20:16:06
 */
import React, { Component } from 'react';
import { Input } from 'antd';
import _ from 'lodash';

// 如果需要调用设计this对象请把当前组件修改为有状态组件

/* const HYInput = props => {
  let compProps = _.cloneDeep(props);

  if (compProps.onClick && typeof compProps.onClick === 'string') {
    // 自定义的function
    const jsString = compProps.onClick;
    const reg = /{([\s\S]+)}/;
    const jsCode = jsString.match(reg);
    if (!jsCode) return;
    const runFunc = new Function('e', jsCode[0]);
    compProps.onClick = function(event) {
      return runFunc(event);
    };
  }

  return <Input {...compProps} />;
};

export default HYInput;
 */

export default class HYInput extends Component {
  constructor(props) {
    super(props);
    this.onClickHandle = this.onClickHandle.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
  }
  // 对应 HYInput.js 配置文件里对应的事件
  onClickHandle() {
    return new Function('e', this.props.onClick)(this);
  }

  // 对应 HYInput.js 配置文件里对应的事件
  onChangeHandle() {
    return new Function('e', this.props.onChange)(this);
  }

  // 对应 HYInput.js 配置文件里对应的事件
  render() {
    let compProps = _.cloneDeep(this.props);
    if (compProps.onClick && typeof compProps.onClick === 'string') {
      compProps.onClick = this.onClickHandle;
    }
    if (compProps.onChange && typeof compProps.onChange === 'string') {
      compProps.onChange = this.onChangeHandle;
    }
 
    return <Input {...compProps} />;
  }
}
