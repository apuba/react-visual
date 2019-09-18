/* 
 * @Description:  文本框组件配置
 * @Author: 侯兴章
 * @Date:  2019-08-28  17:21:24
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-18 17:21:40
 */
import { gridValue, grid, style } from './Base'
import { DATABIND_MODEL_TIP, CSS_CLASS_TIP } from './tipTypes'

export default {
  grid: gridValue,
  type: 'Input', // 组件的类型
  title: '文本框',
  props: { // 拖动出组件时渲染的默认属性
    placeholder: '请输入文本',
    type: 'text'
  },
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
        placeholder: {
          label: '替换文本',
          value: '请输入文本'
        },
        maxLength: {
          label: '字符长度',
          value: ''
        },
        prefix: {
          label: '前缀图标',
          value: ''
        },
        value: {
          label: '输入框内容',
          value: ''
        },
        readOnly: {
          label: '是否只读',
          value: false // 当值为boolean 类型时,配置控件会转为select
        },
        disabled: {
          label: '是否禁用',
          value: false
        }
        /* type: {
          label: '是否多行文本',
          value: 'text',
          options: [ // 当配置属性包括 options的参数时,配置控件会转为select,并且使用当前参数做为下拉列表的选项
            {
              key: 'textarea',
              value: '多行文本'
            },
            {
              key: 'text',
              value: '单行文本'
            }
          ]
        } */
      }
    },
    validate: { // 固定值
      label: '校验规则'
    },
    events: { // 固定值
      label: '事件方法'
    },
    dataBind: { // 固定值
      label: '数据绑定配置',
      props: {
        model: {
          label: '数据绑定',
          value: '',
          tip: DATABIND_MODEL_TIP
        }
      }
    }
  }
}
