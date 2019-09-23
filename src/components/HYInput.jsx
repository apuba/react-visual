/*
 * @Description: 输入框组件
 * @Author: 侯兴章
 * @Date: 2019-09-19 14:10:30
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-23 17:29:13
 */
import React from 'react';
import { Input } from 'antd';
import _ from 'lodash';
import BaseComp from './BaseComp';

class HYInput extends BaseComp {
  constructor(props) {
    super(props);
    this.inputHandle = this.inputHandle.bind(this);
  }

  inputHandle(params) {
    console.log('测试js代码编辑器执行了input内置函数:传来的参数是' + params);
    // 在js代码编辑里 e.inputHandle('')
  }

  // 对应 HYInput.js 配置文件里对应的事件
  render() {
    let compProps = _.cloneDeep(this.props);
    console.log(compProps);
    if (compProps.onClick && typeof compProps.onClick === 'string') {
      compProps.onClick = this.onClickHandle;
    }
    if (compProps.onChange && typeof compProps.onChange === 'string') {
      compProps.onChange = this.onChangeHandle;
    }
    return <Input {...compProps} />;
  }
}
export default HYInput;
// export default connect(mapStateToProps)(HYInput)
