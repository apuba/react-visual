import React from 'react';
import BaseComp from './BaseComp';
import { Select } from 'antd';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
const Option = Select.Option;

const propTypes = {
  list: PropTypes.array,
  dataSource: PropTypes.object
};

const defaultProps = {};

class HYSelect extends BaseComp {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    let compProps = _.cloneDeep(this.props);
/*     delete compProps.designer;
    delete compProps.dispatch; */
    console.log(compProps);
    const { staticDataSource, dataSource } = compProps;
    let children = '';
    if (staticDataSource) {
      // 有静态数据
      const list = dataSource.static[staticDataSource]; // 筛选出当前所属的静态数据源
      children = list.map(item => {
        return (
          <Option key={item.key} value={item.key}>
            {item.value}
          </Option>
        );
      });
    }
    if (compProps.onClick && typeof compProps.onClick === 'string') {
      compProps.onClick = this.onClickHandle;
    }
    return <Select {...compProps}>{children}</Select>;
  }
}

HYSelect.propTypes = propTypes;
HYSelect.defaultProps = defaultProps;

const mapStateToProps = store => {
  const { designer } = store;
  const { dataSource } = designer;
  return { dataSource };
};
export default connect(mapStateToProps)(HYSelect);
