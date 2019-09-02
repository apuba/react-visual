import { UPDATE_DYNAMICCOMPONENT_LIST } from './actionTypes'

export const updateDynamicComponent = component => (
  {
    type: UPDATE_DYNAMICCOMPONENT_LIST, // 这里的 UPDATE_DYNAMICCOMPONENT_LIST 的type是与reducer里的验证有关
    payload: {
      component
    }
  }
)
