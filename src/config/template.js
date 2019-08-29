/* 基础组件配置 供应参考
 * @Author: houxingzhang
 * @Date: 2019-08-28 20:00:43
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-08-29 17:11:47
 */
export default {
  type: 'Input', // 组件的类型
  title: '组件名',
  grid: { // 栅格系统
    col: 'ant-col-6', // 24等分, 占6份,平均分成4份
    gutter: 10 // 栅格系统两者之间的间隔
  },
  props: { // 拖动出组件时渲染的默认属性
    placeholder: '请输入文本',
    type: 'text'
  },
  config: { // 组件可配置选项, 出现在编辑属性页面上的参数
    style: { // 固定值
      label: '样式配置',
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
        disabled: {
          label: '是否禁用',
          value: false
        }
      }
    },
    validate: { // 固定值
      label: '校验规则'
    },
    events: { // 固定值
      label: '事件方法'
    },
    dataBind: { // 固定值
      label: '数据绑定',
      props: {
        databind: {
          label: '数据双向绑定',
          value: ''
        }
      }
    }
  }
}
