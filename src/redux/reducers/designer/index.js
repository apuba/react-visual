import * as types from './actionType'

const initialState = {
  menus: [], // 组件菜单
  dataSource: {
    static: {
      userType: [
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

export default (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_DYNAMICCOMPONENT_LIST:
      const { component } = action.payload
      return {
        ...state,
        dynamicComponentList: [...state.dynamicComponentList, component]
      }
    case types.UPDATE_TOGGLE:
      const { domId } = action.payload
      return {
        ...state,
        toggle: [...state.toggle, domId]
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
    default:
      return state
  }
}
