/* 文本框组件配置
 * @Author: houxingzhang 
 * @Date: 2019-08-28 20:00:43 
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-08-28 20:11:13
 */
export default {
  type: 'Input', // 组件的类型
  title: '文本框',
  grid: { // 栅格系统
    col: 'ant-col-6', // 24等分, 占6份,平均分成4份
    gutter: 10 // 栅格系统两者之间的间隔
  },
  props: { // 拖动出组件时渲染的默认属性
    placeholder: '请输入文本',
    type: 'text'
  },
  config: [ // 组件可配置选项, 出现在编辑属性页面上的参数
    {
      type: 'style',
      label: '样式配置',
      props: [
        {
          type: 'col',
          label: '栅格参数',
          value: 'ant-col-6'
        },
        {
          type: 'width',
          label: '宽度',
          value: ''
        },
        {
          type: 'color',
          label: '文本颜色',
          value: ''
        }
      ]
    },
    {
      type: 'base',
      label: '通用属性',
      props: [
        {
          type: 'placeholder',
          label: '替换文本',
          value: '请输入文本'
        },
        {
          type: 'maxLength',
          label: '字符长度',
          value: ''
        },
        {
          type: 'defaultValue',
          label: '默认值',
          value: ''
        },
        {
          type: 'prefix',
          label: '前缀图标',
          value: ''
        },
        {
          type: 'value',
          label: '输入框内容',
          value: ''
        },
        {
          type: 'show',
          label: '是否显示',
          value: true // 当值为boolean 类型时,配置控件会转为select
        },
        {
          type: 'readonly',
          label: '是否只读',
          value: false
        },
        {
          type: 'disabled',
          label: '是否禁用',
          value: false
        },
        {
          type: 'type',
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
        }
      ]
    },
    {
      type: 'validate',
      label: '校验规则'
    },
    {
      type: 'events',
      label: '事件方法'
    },
    {
      type: 'dataBind',
      label: '数据绑定',
      props: [
        {
          type: 'databind',
          label: '数据双向绑定',
          value: ''
        }
      ]
    }
  ]
}
