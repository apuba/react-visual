/*
 * @Description: 
 * @Author: 侯兴章
 * @Date: 2019-09-17 17:21:24
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-18 17:20:19
 */
/* 按钮组件配置
 * @Author: houxingzhang
 * @Date: 2019-08-28 20:01:17
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-05 13:48:29
 */
import { gridValue, grid, style } from './Base'
export default {
  grid: gridValue,
  type: 'Button',
  title: '按钮',
  props: { // 拖动出组件时渲染的默认属性
    type: 'primary'
  },
  slot: '提交', // 组件填充的内容
  config: { // 组件可配置选项, 出现在编辑属性页面上的参数
    grid: {
      label: '栅格设置',
      props: {
       ...grid
      }
    },
    style: { // 固定值
      label: '样式配置',
      props: {
        ...style
      }
    },
    base: { // 固定值
      label: '通用属性',
      props: {
        slot: {
          label: '按钮文本',
          value: '提交'
        },
        type: {
          label: '主题',
          value: 'primary',
          enum: ['primary', 'default', 'dashed', 'danger'] // 当配置属性包括 options的参数时,配置控件会转为select,并且使用当前参数做为下拉列表的选项
        },
        icon: {
          label: '图标',
          value: ''
        },
        shape: {
          label: '按钮形状',
          enum: ['circle', 'round', '-'],
          value: '-' // 此符号将会删除掉这属性
        },
        block: {
          label: '块级按钮',
          value: false
        },
        disabled: {
          label: '是否禁用',
          value: false
        }
      }
    },
    events: { // 固定值
      label: '事件方法',
      props: {
        onClick: {
          label: '点击按钮',
          value: ''
        }
      }
    }
  }
}
