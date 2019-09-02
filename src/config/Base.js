/* 基础配置
 * @Author: houxingzhang
 * @Date: 2019-08-29 17:14:31
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-02 17:23:45
 */

 import * as tips from './tipTypes'

export const gridValue = { // 栅格系统 组件初始设置的值
  col: 'ant-col-xs-24 ant-col-sm-12 ant-col-md-6', // 24等分, 占6份,平均分成4份
  gutter: '10px' // 栅格系统两者之间的间隔
}

export const grid = { // 栅格系统配置
  label: '栅格设置',
  props: {
    col: {
      label: '栅格参数',
      value: 'ant-col-xs-24 ant-col-sm-12 ant-col-md-6',
      tip: tips.GRID_COL_TIP
    },
    gutter: {
      label: '栅格间隙',
      value: '10px',
      tip: tips.GRID_GUTTER_TIP
    },
    label: {
      label: '显示标签',
      value: ''
    }
  }
}
