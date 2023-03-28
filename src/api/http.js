/*
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: 小白
 * @Date: 2022-03-02 13:14:18
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-22 13:39:07
 * @FilePath: /chat_gpt/src/api/http.js
 */
import request from './request'
import { HTTP_URI } from './api'
export const REQUEST = {
  POST: function (businessType, datas, isToken) {
    if (!HTTP_URI[businessType]) return
    return request({
      url: HTTP_URI[businessType],
      method: 'post',
      data: datas
    })
  },
  GET: function (businessType, params) {
    return request({
      url: HTTP_URI[businessType],
      method: 'get',
      params: params
    })
  }
}
export default REQUEST
