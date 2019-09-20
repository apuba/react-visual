/* eslint-disable no-new-func */
import { Component } from 'react';
import { connect } from 'react-redux';
import * as reduxAction from '../redux/reducers/designer/action';

class BaseComp extends Component {
  constructor(props) {
    super(props);
    this.onClickHandle = this.onClickHandle.bind(this);
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.onPressEnterHandle = this.onPressEnterHandle.bind(this);
    this.onfocusHandle = this.onfocusHandle.bind(this);
    this.onBlurHandle = this.onBlurHandle.bind(this);
    this.runJSHandle = this.runJSHandle.bind(this);
  }
  // 点击事件
  onClickHandle() {
    return new Function('e', this.props.onClick)(this);
  }

  // 值修改事件
  onChangeHandle() {
    return new Function('e', this.props.onChange)(this);
  }

  // 回车事件
  onPressEnterHandle() {
    return new Function('e', this.props.onPressEnter)(this);
  }
  //获取焦点
  onfocusHandle() {
    return new Function('e', this.props.onfocus)(this);
  }
  //失去焦点
  onBlurHandle() {
    return new Function('e', this.props.onBlur)(this);
  }

  // 测试js代码调用的函数
  runJSHandle(params) {
    console.log('已经执行到BaseComp：' + params);
  }
}

const mapStateToProps = store => {
  //   return store.designer;
  const { designer } = store;
  const { css, showCodeEditor, codeEditorLanguage, js } = designer;
  return {designer}
};

export default BaseComp;

/* export default connect(
  mapStateToProps
)(BaseComp); */
