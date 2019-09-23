import React from 'react';
import BaseComp from './BaseComp';
import { Button } from 'antd';
import _ from 'lodash';

export default class HYButton extends BaseComp {
  render() {
    let compProps = _.cloneDeep(this.props);
    delete compProps.designer;
    delete compProps.dispatch;
    if (compProps.onClick && typeof compProps.onClick === 'string') {
      compProps.onClick = this.onClickHandle;
    }
    return <Button {...compProps} />;
  }
}
