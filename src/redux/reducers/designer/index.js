import * as types from './actionType'
import _ from 'lodash'

const initialState = {
  menus: [], // 组件菜单
  dataSource: {
    static: {
      testList: [
        {
          key: '1',
          value: '普通用户'
        },
        {
          key: '2',
          value: '青铜会员'
        },
        {
          key: '3',
          value: '白银会员'
        },
        {
          key: '4',
          value: '黄金会员'
        }
      ],
      test2: [
        { 
          key: 'a',
          value: '写入'
        },
        { 
          key: 'b',
          value: '读出'
        }
      ]
    },
    dynamic: {}
  }, // 当前设计器里的组件用到的静态数据源, 挂载在此对象上

  dynamicComponentList: [], // 当前设计器里所有的动态组件集合
  componentIndex: 0, // 创建dom时给累加为id标识,不重复
  isDesign: false, // 当前处理开始设计模式
  editComponentId: 0, // 当前要编辑的对象，弹出配置窗的那个组件对象Id
  openKeys: ['from'],
  toggle: [], // 显示隐藏开关列表
  activeId: '', // 当前激活的元素,鼠标点击的元素
  timespan: '', // 更新标识
  draggable: { // 拖拽对象
    move: null, // 移动的组件对象
    current: {}, // 当前拖拽的对象
    hover: false // 拖拽移动到上面的对象
  }
}

/**
 * 更新状态
 * @param {*} state 当前状态
 * @param {*} key 属性名
 * @param {*} value 值
 */
const updateBaseStore = (state, key, value) => {
  return {
    ...state,
    [key]: value
  }
}

/* const setStore = (state, obj) => {
  obj = obj || {
    dataSource: {
      static: [],
      dyniamic:[]
    }
  }
}

const attrArray = [] // 属性名
const TraversalObject = (obj) => {
  obj.forEach(name => {
    const item = obj[name]
    if (typeof (item) === 'object') {
      TraversalObject(item)// 递归遍历
    } else {
      // 值
    }
  })
} */

export default (state = initialState, action) => {
  const { dataSource } = state

  switch (action.type) {
    case types.UPDATE_DYNAMICCOMPONENT_LIST:
      const { component } = action.payload
      return {
        ...state,
        dynamicComponentList: [...state.dynamicComponentList, component]
      }
    case types.UPDATE_TOGGLE:
      const { domId } = action.payload
      const toggle = _.clone(state.toggle)
      const index = toggle.indexOf(domId)
      if (index === -1) {
        toggle.push(domId)
      } else {
        toggle.splice(index, 1)
      }
      return {
        ...state,
        toggle
      }
    case types.UPDATE_EDITCOMPONENTID:
      const { id } = action.payload
      return {
        ...state,
        editComponentId: id
      }
    case types.UPDATE_GRAGGABLE:
      const { key, value } = action.payload
      const { draggable } = state
      draggable[key] = value
      return {
        ...state,
        draggable
      }
    case types.UPDATE_BASE_STATE:
      const newState = updateBaseStore(state, action.payload.key, action.payload.value)
      return newState
    case types.UPDATE_DATASOURCE_STATIC:
      debugger
      if (action.payload.action === 'remove') {
        delete dataSource.static[action.payload.key]
      } else {
        dataSource.static[action.payload.key] = action.payload.value
      }
      return {
        ...state,
        dataSource: _.cloneDeep(dataSource)
      }
    default:
      return state
  }
}
