/*
 * @Description: 颜色选择器
 * @Author: 侯兴章
 * @Date: 2019-09-18 17:28:13
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-19 11:03:52
 */
import React from 'react';
import { Input } from 'antd';

const ColorInputComp = ({ handleChange, attrs, value, id }) => {
  return (
    <Input
      {...attrs}
      size="small"
      className="input"
      defaultValue={value}
      key={id}
      id={id}
      type="color"
      onChange={handleChange}
    />
  );
};

export default ColorInputComp;
