/*
 * @Description: js代码组件
 * @Author: 侯兴章
 * @Date: 2019-09-18 12:06:12
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-19 20:02:09
 */
import React from 'react';
import { Select, Divider, Icon } from 'antd';
const { Option } = Select;
const JavascriptCodeComp = ({
  handleChange,
  attrs,
  value,
  id,
  js,
  addDataHandle
}) => {
  let children = [];

  // 清理字符串，把对应的function提出来
  let codeSnippet = [];
  let jsString = js.replace(/\/\*.*\*\//, ''); // 清掉头部的注释代码
  let index = jsString.lastIndexOf('function');
  let jsCode = ''; // 函数方法体内容
  const jsreg = /{([\s\S]+)}/;
 
  while (index > 0) {
    jsCode = jsString.substr(index).match(jsreg);
    codeSnippet.push({
      name: '',
      code: jsString.substr(index), // 拿到函数体完整代码
      js: jsCode[1] || jsCode[0] || '' // 函数运行内容
    }); 

    jsString = jsString.substr(0, index);
    index = jsString.lastIndexOf('function');
  }
  const reg = /function\s+[a-zA-Z0-9_-]+/gm;
  codeSnippet.map(data => {
    let funName = data.code.match(reg);
    return (data.name =
      funName && funName.length && funName[0].replace(/function\s+/, ''));
  });

  codeSnippet.unshift({
    name: '无',
    js:'',
    code: '-' // 当没有值的时候，删除这属性
  });

  if (codeSnippet && codeSnippet.length) {
    children = codeSnippet.map((option, index) => (
      <Option key={option.name + '_' + index} data-key={option.name + '_' + index} value={option.js}>
        {option.name}
      </Option>
    ));
  }

  return (
    <span
      onMouseDown={e => {
        e.preventDefault();
        return false;
      }}
    >
      {/* TODO: 这里添加 onMouseDown 是为了阻止Select默认行为导致 dropdownRender 无法生效  */}
      <Select
        {...attrs}
        defaultValue={value}
        className="input"
        size="small"
        key={id}
        id={id}
        onChange={handleChange}
        dropdownRender={(menu, props) => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div
              data-desc="自定义条目"
              onClick={addDataHandle}
              className="dropdownRender"
            >
              <Icon type="plus" /> 添加JS函数
            </div>
          </div>
        )}
      >
        {children}
      </Select>
    </span>
  );
};

export default JavascriptCodeComp;
