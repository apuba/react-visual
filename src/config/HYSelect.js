/*
 * @Description: 下拉选择器组件配置
 * @Author: 侯兴章
 * @Date: 2019-09-17 17:21:24
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-23 14:33:35
 */

import { gridValue, grid, style } from './Base';
import * as tips from './tipTypes';

export default {
  grid: gridValue,
  type: 'Select', // 组件的类型
  title: '下拉框',
  props: {
    // 拖动出组件时渲染的默认属性
    placeholder: '请选择',
    type: 'text'
  },
  config: {
    // 组件可配置选项, 出现在编辑属性页面上的参数
    grid: {
      label: '栅格设置',
      props: {
        ...grid
      }
    },
    style: {
      // 固定值
      label: '样式配置',
      props: {
        ...style
      }
    },
    base: {
      // 固定属性
      label: '通用属性',
      props: {
        disabled: {
          label: '是否禁用',
          value: false
        },
        mode: {
          label: '是否多选',
          value: '-',
          options: [
            {
              key: '-',
              value: '单选'
            },
            {
              value: '多选',
              key: 'multiple'
            },
            {
              value: '标签',
              key: 'tags'
            }
          ]
        }
      }
    },
    validate: {
      // 固定属性
      label: '校验规则'
    },
    events: {
      // 固定属性
      label: '事件方法',
      props: {
        onChange: {
          label: '值改变事件',
          value: '',
          component: 'JavascriptCodeComp' // 显示使js选择组件
        }
      }
    },
    dataBind: {
      // 固定属性
      label: '数据绑定配置',
      props: {
        model: {
          label: '数据绑定',
          value: '',
          tip: tips.DATABIND_MODEL_TIP
        },
        staticDataSource: {
          // 固定属性 会读取当前设计器的state的DataSource.static数据
          component: 'StaticDataSourceComp', // 显示使用静态数据源组件
          label: '静态数据源',
          value: '无',
          options: [],
          tip: tips.STATIC_DATABIND_SOURCE_TIP
        },
        dynamicDataSource: {
          // 固定属性 会读取当前设计器的state的DataSource.dynamic数据
          component: 'DynamicDataSourceComp',
          label: '动态数据源',
          value: '无',
          options: [],
          tip: tips.DYMAIC_DATABIND_SOURCE_TIP
        }
      }
    }
  }
};
