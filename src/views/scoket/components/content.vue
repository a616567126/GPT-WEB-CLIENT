<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:28:40
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-23 18:59:22
 * @FilePath: /chat_gpt/src/views/scoket/components/content.vue
-->
<template>
  <div>
    <div>
      <div
        class="items items_right">
        <div
          v-if="!phone && chatObj.question"
          class="chat_box"
          v-html="chatObj.question">
        </div>
        <div
          v-else-if="phone && chatObj.question"
          class="chat_box phone"
          v-html="chatObj.question">
        </div>
        <div class="tx">
          <img
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            style="width:40px;height:40px">
        </div>
      </div>
      <div class="items"
        v-if="chatObj.answer">
        <div class="tx">
          <img
            :src="require('@/assets/chat.png')"
            style="width:40px;height:40px">
        </div>
        <div
          v-if="!phone && chatObj.answer"
          class="chat_box">
          <div v-highlight
            class="markdown-body"
            v-html="chatObj.answer">
          </div>
        </div>
        <div v-else
          class="chat_box phone">
          <div v-highlight
            class="markdown-body"
            v-html="chatObj.answer ">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 将marked 引入
import { marked } from 'marked'
// 引入代码高亮样式
import 'highlight.js/styles/devibeans.css'

export default {
  props: ['chatList', 'isChat', 'isChats'],
  data() {
    return {
      phone: false,
      mdRegex: '',
      chatLists: [],
      chatObj: {}
    }
  },
  watch: {
    chatList: {
      handler(val) {
        if (val.length > 0) {
          this.chatObj = {}
          this.chatObj = val[0]
        }
      },
      deep: true
    },
    isChat(val) {
      console.log(val)
      this.chatObj = {}
      this.chatObj = this.chatList[val]
      // if (this.mdRegex.test(this.chatObj.answer)) {
      //   this.chatObj.answer = marked(this.chatObj.answer)
      // }
      this.$forceUpdate()
    },
    isChats(val) {
      this.chatObj = {}
      this.chatObj = this.chatList[0]
      // if (this.mdRegex.test(this.chatObj.answer)) {
      //   this.chatObj.answer = marked(this.chatObj.answer)
      // }
    }
  },
  mounted() {
    this.chatObj = {}
    this.mdRegex = /[#*`|]/
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    this.chatObj = {}
    if (this.chatList && this.chatList.length > 0) {
      this.chatObj = this.chatList[0]
    }
  },
  methods: {}
}
</script>

<style>
.tx {
  width: 40px;
  height: 40px;
}
.chat_box {
  max-width: calc(100vw - 490px) !important;
}
.chat_box.phone {
  max-width: calc(100vw - 120px) !important;
}
</style>