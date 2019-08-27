export default {
  type: 'Input',
  title: '输入框',
  grid: { // 栅格系统
    col: 'ant-col-6', // 24等分, 占6份,平均分成4份
    gutter: 10 // 栅格系统两者之间的间隔
  },
  props: {
    placeholder: '请输入文本',
    type: 'text',
    style: {
      // width:200
    }
  },
  config: {
    style: { // 样式
      width: {
        label: '宽度',
        value: ''
      },
      color: {
        label: '文本颜色',
        value: ''
      }
    },
    base: {
      placeholder: {
        label: '替换文本',
        value: '请输入文本'
      },
      maxLength: {
        label: '字符长度',
        value: ''
      },
      value: {
        label: '默认值',
        value: ''
      },
      show: {
        label: '是否显示',
        value: true
      },
      readonly: {
        label: '是否只读',
        value: false
      },
      disabled: {
        label: '是否禁用',
        value: false
      },
      type: {
        label: '是否多行文本',
        value: 'text',
        enum: [
          'textarea',
          'text'
        ]
      }
    },
    validate: { // 校验规则

    }

  }
}