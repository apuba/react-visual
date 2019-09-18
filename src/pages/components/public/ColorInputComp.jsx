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
