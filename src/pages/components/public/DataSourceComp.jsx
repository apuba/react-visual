/*
 * @Description: 静、动态数据源组件的公共组件
 * @Author: 侯兴章
 * @Date: 2019-09-19 10:53:30
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-19 18:01:29
 */
import React from 'react';
import { Select, Divider, Icon } from 'antd';
const { Option } = Select;

const DataSourceComp = ({
  handleChange,
  attrs,
  value,
  id,
  type,
  data,
  addDataHandle
}) => {
  let children = [];
  let options = [];
  if (data) {
    let newOpt = Object.keys(data).map(name => {
      return {
        key: name,
        value: name
      };
    });
    options = [
      {
        key: '-',
        value: '无'
      },
      ...newOpt
    ];

    children = options.map(option => (
      <Option key={option.key} value={option.key}>
        {option.value}
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
        data-ref={id}
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
              <Icon type="plus" /> 添加数据源
            </div>
          </div>
        )}
      >
        {children}
      </Select>
    </span>
  );
};

export default DataSourceComp;
