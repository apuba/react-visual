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
    placeholder: {
      text: '默认提醒'
    },
    type: {
      text: '是否多行文本',
      enum: [
        'textarea',
        'text'
      ]
    },
    style: {
      width: {
        text: '宽度'
      }
    }
  }
}