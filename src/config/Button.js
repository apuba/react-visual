/* 按钮组件配置
 * @Author: houxingzhang
 * @Date: 2019-08-28 20:01:17
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-08-28 21:06:15
 */
export default {
  type: 'Button',
  title: '按钮',
  grid: { // 栅格系统
    col: 'ant-col-6', // 24等分, 占6份,平均分成4份
    gutter: 10 // 栅格系统两者之间的间隔
  },
  props: { // 拖动出组件时渲染的默认属性
    type: 'primary'
  },
  slot: '提交', // 组件填充的内容
  config: { // 组件可配置选项, 出现在编辑属性页面上的参数
    style: { // 固定值
      label: '样式配置v',
      props: {
        col: {
          label: '栅格参数',
          value: 'ant-col-6'
        }
      }
    },
    base: { // 固定值
      label: '通用属性',
      props: {
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
          enum: ['circle', 'round', 'none'],
          value: 'none'
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
