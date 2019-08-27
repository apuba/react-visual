export default {
  type: 'Button',
  title: '按钮',
  grid: { // 栅格系统
    col: 'ant-col-6', // 24等分, 占6份,平均分成4份
    gutter: 10 // 栅格系统两者之间的间隔
  },
  props: { // 组件默认属性
    type: 'primary',
    content: '按钮',
    className: '',
    style: {
      margin: '0px 10px 0px 0px'
    }
  },
  slot: '我是按钮',
  config: { // 组件可配置选项
    type: {
      text: '主题',
      enum: ['primary', 'default', 'dashed', 'danger']
    },
    icon: {
      text: '图标'
    },
    content: {
      text: '文案'
    },
    style: {
      width: {
        text: '宽度'
      },
      margin: {
        text: '外边距',
        type: '4-value'
      }
    }
  }
}