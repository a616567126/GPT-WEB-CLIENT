import axios from 'axios'
import { Notification, Message, Loading } from 'element-ui'
import cache from './cache'
import { HTTP_URI } from '../api/api'
if (window.localStorage.getItem('user')) {
  var token = JSON.parse(window.localStorage.getItem('user')).token
}
let loading
// loading开始 方法
function startLoading() {
  // element-ui loading 服务调用方式
  loading = Loading.service({
    customClass: 'loading_icon',
    fullscreen: true,
    lock: true,
    text: '加载中...',
    spinner: 'el-icon-loading', // 自定义图标
    background: 'rgba(255, 255, 255, 0.1)'
  })
}
// loading结束 方法
function endLoading() {
  loading.close()
}

// 定义一个变量，有请求变量加一，收到响应变量减一
let loadingCount = 0
/**
 * 调用一次startLoadingAddCount() 方法 开启Loading 并 loadingCount + 1
 * 调用一次endLoadingSubCount() 方法 loadingCount - 1 直到为0 关闭loading
 */
export function startLoadingAddCount() {
  if (loadingCount === 0) {
    startLoading()
  }
  loadingCount++
}

export function endLoadingSubCount() {
  loadingCount--
  if (loadingCount === 0) {
    endLoading()
  }
}
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
  // axios中请求配置有baseURL选项，表示请求URL公共部分
  baseURL: HTTP_URI.BASEURL,
  // 超时
  timeout: 300000
})

// request拦截器
service.interceptors.request.use(
  config => {
    startLoadingAddCount()

    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // 是否需要防止数据重复提交
    const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    const token = window.localStorage.getItem('token')
    if (token && !isToken) {
      config.headers['token'] = token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    //
    if (!isRepeatSubmit && config.method === 'post') {
      const datas = config.data
      const data = Object.keys(datas).map(item => {
        if (datas[item] === '' || datas[item] == null) delete datas[item]
      })
      const requestObj = {
        url: config.url,
        data: data,
        time: new Date().getTime()
      }
      const sessionObj = cache.session.getJSON('sessionObj')
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj)
      }
    }
    return config
  },
  error => {
    endLoadingSubCount()
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  res => {
    endLoadingSubCount()
    // 未设置状态码则默认成功状态
    const code = res.data.status || 200
    // 获取错误信息
    const msg = res.data.message || res.data.msg
    if (code !== 200 && code !== 20000 && code !== 10001) {
      Notification.error({
        title: msg
      })
      return Promise.reject('error')
    } else if (code === 10001) {
      Notification.error({
        title: msg
      })
      window.localStorage.clear()
      setTimeout(() => {
        window.location.href = `/login`
      }, 1000)
    } else {
      return res.data
    }
  },
  error => {
    endLoadingSubCount()
    let { message } = error
    if (message === 'Network Error') {
      message = '网络连接错误'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    Message({
      message: message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
