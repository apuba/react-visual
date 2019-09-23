/*
 * @Description: 颜色选择器
 * @Author: 侯兴章
 * @Date: 2019-09-18 17:28:13
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-23 12:15:28
 */
import React from 'react';
import { Input } from 'antd';

const ColorInputComp = ({ handleChange, attrs, value, id }) => {
  return (
    <Input
      {...attrs}
      className="input"
      defaultValue={value}
      id={id}
      key={id}
      onChange={handleChange}
      size="small"
      type="color"
    />
  );
};

export default ColorInputComp;
