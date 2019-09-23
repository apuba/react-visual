/*
 * @Description: 代码编辑器
 * @Author: 侯兴章
 * @Date: 2019-09-17 19:23:35
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-23 14:29:50
 */
import React, { Component } from 'react';
import { EditorContainer } from '@utils/iframe';
import { connect } from 'react-redux';
import { updateBaseState } from '../../../redux/reducers/designer/action';

class CodeEditorComp extends Component {
  // 初始化组件
  initComponent() {
    const {
      updateBaseState,
      showCodeEditor,
      codeEditorLanguage,
      js,
      css
    } = this.props;
    const language = codeEditorLanguage;
    const defaultValue = language === 'css' ? css : js;
    if (!defaultValue || !language || !showCodeEditor) return;
    const editorContainer = new EditorContainer({
      url: './plugin/editor/index.html',
      width: '60%',
      height: '60%',
      container: '#vseditor_box_container',
      listen(data) {
        const { type, value } = data;
        if (type === 'CLOSE_CODE_EDITOR') {
          updateBaseState('showCodeEditor', false); // 隐藏编辑窗
        }
        if (language === 'css') {
          updateBaseState('css', value);
        } else if (language === 'javascript') {
          updateBaseState('js', value);
        }
      }
    });

    editorContainer.sendMessageToChild({
      type: 'SET_VALUE',
      value: defaultValue,
      language
    });
  }

  render() {
    const { css, showCodeEditor, language } = this.props;
    this.initComponent(css, language);
    return (
      <div
        data-state={showCodeEditor}
        id="vseditor_box"
        style={{ display: showCodeEditor ? 'block' : 'none' }}
      >
        <div id="vseditor_box_container"></div>
      </div>
    )
  }
}
const mapStateToProps = store => {
  const { designer } = store;
  const { css, showCodeEditor, codeEditorLanguage, js } = designer;
  return { css, showCodeEditor, codeEditorLanguage, js };
};
export default connect(
  mapStateToProps,
  { updateBaseState }
)(CodeEditorComp);
