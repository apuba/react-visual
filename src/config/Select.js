/* 下拉选择器组件配置
 * @Author: houxingzhang
 * @Date: 2019-08-28 20:00:43
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-09-05 00:38:15
 */
import { gridValue, grid } from './Base'
import * as tips from './tipTypes'

export default {
  grid: gridValue,
  type: 'Select', // 组件的类型
  title: '下拉选择器',
  props: { // 拖动出组件时渲染的默认属性
    placeholder: '请输入文本',
    type: 'text'
  },
  config: { // 组件可配置选项, 出现在编辑属性页面上的参数
    grid,
    style: { // 固定属性
      label: '样式配置'
    },
    base: { // 固定属性
      label: '通用属性',
      props: {
        disabled: {
          label: '是否禁用',
          value: false
        }
      }
    },
    validate: { // 固定属性
      label: '校验规则'
    },
    events: { // 固定属性
      label: '事件方法'
    },
    dataBind: { // 固定属性
      label: '数据绑定配置',
      props: {
        model: {
          label: '数据绑定',
          value: '',
          tip: tips.DATABIND_MODEL_TIP
        },
        staticDataSource: { // 固定属性 会读取当前设计器的state的DataSource.static数据
          label: '静态数据源',
          value: '-',
          options: [],
          tip: tips.STATIC_DATABIND_SOURCE_TIP
        },
        dynamicDataSource: { // 固定属性
          label: '动态数据源',
          value: '',
          options: [],
          tip: tips.DYMAIC_DATABIND_SOURCE_TIP
        }
      }
    }
  }
}
