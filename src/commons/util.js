/*
 * @Description: 
 * @Author: 侯兴章
 * @Date: 2019-07-03 17:42:40
 * @LastEditors: 侯兴章
 * @LastEditTime: 2019-09-17 20:06:14
 */

/**
 * 时间戳
 * @param {*} timestamp  时间戳
 */
const timestampToTime = timestamp => {
  const date = new Date(timestamp) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M =
    (date.getMonth() + 1 < 10
      ? '0' + (date.getMonth() + 1)
      : date.getMonth() + 1) + '-'
  const D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
  const h =
    (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  const m =
    (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
  return Y + M + D + h + m + s
}

/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(name, content)
}

/**
 * 获取localStorage
 */
const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(name)
}

/**
 * 删除localStorage
 */
const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(name)
}

/**
 * 设置cookie
 **/
function setCookie (name, value, day) {
  const date = new Date()
  date.setDate(date.getDate() + day)
  document.cookie = name + '=' + value + ';expires=' + date
}

/**
 * 获取cookie
 **/
function getCookie (name) {
  const reg = RegExp(name + '=([^;]+)')
  const arr = document.cookie.match(reg)
  if (arr) {
    return arr[1]
  } else {
    return ''
  }
}

/**
 * 删除cookie
 **/
function delCookie (name) {
  setCookie(name, null, -1)
}

/**
 * 嵌套页面URL地址
 * @param {*} url
 */
const getIFramePath = url => {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    iframeUrl = url.replace('iframe:', '')
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url.replace('http://', '')
    if (iframeUrl.indexOf(':') !== -1) {
      iframeUrl = iframeUrl.substring(iframeUrl.lastIndexOf(':') + 1)
    }
  }
  return iframeUrl
}

/**
 * 嵌套页面路由路径
 * @param {*} url
 */
const getIFrameUrl = url => {
  let iframeUrl = ''
  if (/^iframe:.*/.test(url)) {
    // iframeUrl = baseUrl + url.replace('iframe:', '')
    iframeUrl = url.replace('iframe:', '')
  } else if (/^http[s]?:\/\/.*/.test(url)) {
    iframeUrl = url
  }
  return iframeUrl
}

/** 获取URL的查询参数
 *
 *
 */
const getUrlQuery = (name, query = 'hash') => {
  const reg = new RegExp('(^|&|\\?)' + name + '=([^&]*)')
  const r = window.location[query].match(reg)
  if (r != null) return decodeURI(r[2])
  return null
}

/*  数组集合排序方法
 * prop 排序的属性
 * sort 排序方法 ，默认顺序，0.由低到高, 1.由高到低
 * 示例：array.sort(arrayCompare('id', 0))
 * */
const arrayCompare = (prop, sort = 0) => { 
  return (a, b) => {
    const [t1, t2] = [a[prop], b[prop]]
    return sort === 0 ? t1 - t2 : t2 - t1
  }
}

const loadScript = (url, callback, params) => {
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.async = 'async'
  script.src = url
  document.head.appendChild(script)
  // 判断js是否已经加载成功
  if (script.readyState) {
    // IE
    script.onreadystatechange = function () {
      if (script.readyState === 'complete' || script.readyState === 'loaded') {
        script.onreadystatechange = null
        callback && callback(params)
      }
    }
  } else {
    // 非IE
    script.onload = function () {
      callback && callback(params)
    }
  }
}

const loadCss = url => {
  var head = document.getElementsByTagName('head')[0]
  var link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  head.appendChild(link)
}

export {
  timestampToTime,
  setStore,
  getStore,
  removeStore,
  setCookie,
  getCookie,
  delCookie,
  getUrlQuery,
  getIFrameUrl,
  getIFramePath,
  loadCss,
  loadScript,
  arrayCompare
}
