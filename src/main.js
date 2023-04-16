/*
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-20 20:49:33
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-16 20:40:50
 * @FilePath: /chat_gpt/src/main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import hljs from 'highlight.js'
import SlideVerify from 'vue-monoplasty-slide-verify'

import '@/assets/css/style.scss'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { REQUEST } from '@/api/http'
import { wsUrl } from '@/api/api'
Vue.config.productionTip = false
Vue.prototype.wsUrl = wsUrl
Vue.prototype.$https = REQUEST.POST
Vue.use(SlideVerify)
Vue.use(ElementUI)
Vue.use(hljs)
//封装成一个指令,highlight是指令的名称
Vue.directive('highlight', el => {
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    // 创建ol标签元素
    let ol = document.createElement('ol')
    // 2.根据换行符获取行数，根据获取的行数生成行号
    let rowCount = block.outerHTML.split('\n').length
    for (let i = 1; i < rowCount; i++) {
      // 创建li标签元素
      let li = document.createElement('li')
      let text = document.createTextNode(i)
      // 将生成的行号添加到li标签中
      li.appendChild(text)
      // // 将li标签添加到ol标签中
      // ol.appendChild(li)
    }
    // 为ol标签添加class名
    ol.className = 'pre-numbering'
    block.parentNode.appendChild(ol)
    hljs.highlightBlock(block)
  })
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
