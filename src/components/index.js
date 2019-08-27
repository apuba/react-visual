/* 所有可用组件集合
 * @Author: houxingzhang 
 * @Date: 2019-08-27 14:10:41 
 * @Last Modified by: houxingzhang
 * @Last Modified time: 2019-08-27 15:00:11
 */

import HelloWorld from './HelloWorld'
var allComponents = require('antd')

Object.assign(allComponents, {
  HelloWorld
})

export default allComponents
// module.exports = antd
