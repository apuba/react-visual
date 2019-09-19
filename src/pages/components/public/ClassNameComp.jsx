/*
 * @Description: css样式组件
 * @Author: 侯兴章
 * @Date: 2019-09-18 12:06:12
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-19 15:15:34
 */
import React from 'react';
import { Select, Divider, Icon } from 'antd';
const { Option } = Select;
const ClassNameComp = ({
  handleChange,
  attrs,
  value,
  id,
  css,
  addDataHandle
}) => {
  let children = [];
  const reg = /[\.]?[a-zA-z0-9_-]+\s*{/gm;
    let cssArray = css.match(reg); // 匹配出所有样式
    let cssList = [];
    if (cssArray && cssArray.length > 0) {
      cssList = cssArray.map(item => item.replace(/\s*{/, ''));
    }

  if (cssList && cssList.length > 0) {
    children = cssList.map((option, index) => (
      <Option key={option + index} value={option.replace('.', '')}>
        {option}
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
        mode="multiple"
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
              <Icon type="plus" /> 添加样式
            </div>
          </div>
        )}
      >
        {children}
      </Select>
    </span>
  );
};

export default ClassNameComp;
