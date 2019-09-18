/*
 * @Description: 基础配置
 * @Author: 侯兴章
 * @Date: 2019-09-17 17:21:24
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-18 17:30:17
 */

 import * as tips from './tipTypes'

export const gridValue = { // 栅格系统 组件初始设置的值
  col: 'ant-col-xs-24 ant-col-sm-12 ant-col-md-6', // 24等分, 占6份,平均分成4份
  gutter: '10px' // 栅格系统两者之间的间隔
}

export const grid = { // 栅格系统配置
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

export const style = { // 固定值
  width: {
    label: '宽度',
    value: ''
  },
  color: {
    component: 'ColorInputComp', // 使用自定义的组件显示，
    label: '文本颜色',
    value: ''
  },
  className: {
    component:'ClassNameComp', // 使用自定义的组件显示，， 默认为input控件席爾瓦人
    label: 'CSS样式名',
    value: [],
    tip: tips.CSS_CLASS_TIP
  }
}
