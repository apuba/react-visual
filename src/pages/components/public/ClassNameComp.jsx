import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

const ClassNameComp = ({ handleChange, attrs, value, id, css }) => {
  let children = [];
  if (css && css.length > 0) {
    children = css.map((option, index) => <Option key={option + index} value={option.replace('.','')}>{option}</Option>)
  }
  return (
    <Select
      {...attrs}
      defaultValue={value}      
      className="input"
      mode="multiple"
      size="small"
      key={id}
      id={id}      
      onChange={handleChange}
    >
      {children}
    </Select>
  );
};

export default ClassNameComp;
