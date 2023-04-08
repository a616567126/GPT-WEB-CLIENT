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
export const WebSocketObj = {
 websock:null,
 initWebSocket: () => {
  console.log(window.localStorage.getItem('userInfo'));
  if (typeof WebSocket === 'undefined') {
    return console.log('您的浏览器不支持websocket')
  }
  if(window.localStorage.getItem('userInfo')){
   let userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
    this.websock = new WebSocket(HTTP_URI.BASEURL + '/chatWebSocket/' + userInfo.userId)
    this.websock.onmessage = this.websocketonmessage
    this.websock.onopen = this.websocketonopen
    this.websock.onerror = this.websocketonerror
    this.websock.onclose = this.websocketclose
    console.log(this.websock);
  }
},
websocketonopen() {
 // 连接建立之后执行send方法发送数据
 const actions = { test: 'test' }
 this.websocketsend(JSON.stringify(actions))
},
websocketonerror() {
 // 连接建立失败重连
 this.initWebSocket()
},
websocketonmessage(socketMsg) {
 // 数据接收
 const redata = JSON.parse(socketMsg.data)
 console.log('接收的数据', redata)
},
websocketsend(Data) {
 // 数据发送
 this.websock.send(Data)
},
websocketclose(e) {
 // 关闭
 console.log('断开连接', e)
},
destroyed() {
 // 离开路由之后断开websocket连接
 this.websock.close()
}
}
export default WebSocketObj
