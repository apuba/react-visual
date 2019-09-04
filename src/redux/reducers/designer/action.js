import * as types from './actionType'

// 简单更一个状态
export const updateBaseState = (key, value) => ({
  type: types.UPDATE_BASE_STATE,
  payload: {
    key,
    value
  }
})

// 更新当前动态拖拽的组件
export const updateDynamicComponent = component => (
  {
    type: types.UPDATE_DYNAMICCOMPONENT_LIST, // 这里的 UPDATE_DYNAMICCOMPONENT_LIST 的type是与reducer里的验证有关
    payload: {
      component
    }
  }
)

// 显示与隐藏的开关列表
export const updateToggle = domId => ({
  type: types.UPDATE_TOGGLE,
  payload: {
    domId
  }
})

// 更新当前编辑的组件id
export const updateEditComponentId = id => ({
  type: types.UPDATE_EDITCOMPONENTID,
  payload: {
    id
  }
})
// 更新拖拽对象
export const updateDraggable = (key, value) => ({
  type: types.UPDATE_GRAGGABLE,
  payload: {
    key,
    value
  }
})

// 更新静态数据源
export const updateDataSourceStatic = (action, key, value) => ({
  type: types.UPDATE_DATASOURCE_STATIC,
  payload: {
    key,
    value,
    action
  }
})
