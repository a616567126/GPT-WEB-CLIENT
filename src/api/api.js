/*
export const baseUrl = 'https://gpt.v-wim.xyz-a-s'
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: 小白
 * @Date: 2022-04-25 15:58:33
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-17 13:53:33
 * @FilePath: /chat_gpt/src/api/api.js
 */
export const baseUrl = 'https://gpt.v-wim.xyz'
// export const baseUrl = 'http://103.106.189.148:8624'
export const wsUrl = 'wss://gpt.v-wim.xyz'
// export const wsUrl = 'ws://103.106.189.148:8624'

// export const baseUrl = 'http://ee9qu3.natappfree.cc'
export const HTTP_URI = {
  BASEURL: baseUrl,
  REGISTER: baseUrl + '/user/token/register',
  LOGIN: baseUrl + '/user/token/login',
  PRODUCT: baseUrl + '/product/list',
  ALIPAY: baseUrl + '/order/ali/create',
  USERHOME: baseUrl + '/user/token/home',
  CHAT: baseUrl + '/v1/chat/turbo',
  getType: baseUrl + '/user/token/getType',
  REPEST: baseUrl + '/use/log/updateLog',
  ADD: baseUrl + '/use/log/resetLog',
  NOTICELIST: baseUrl + '/announcement/queryPage',
  PAY: baseUrl + '/order/create',
  CANVAS: baseUrl + '/v1/chat/official',
  REGTYPE: baseUrl + '/user/token/get/register/method',
  GETCODE: baseUrl + '/user/token/send/msg',
  CODEREG: baseUrl + '/user/token/register/msm'
}
export default { HTTP_URI, baseUrl }
