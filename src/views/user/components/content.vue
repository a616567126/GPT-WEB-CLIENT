<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:28:40
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-04 13:44:53
 * @FilePath: /chat_gpt/src/views/user/components/content.vue
-->
<template>
  <div>
    <div
      v-for="(item,index) in chatListes"
      :key="index">
      <div
        v-if="item.role == 'assistant'"
        class="items">
        <div class="tx">
          <img
            :src="require('@/assets/chat.png')"
            style="width:40px;height:40px">
        </div>
        <div v-if="!phone"
          class="chat_box ">
          <div v-highlight
            class="markdown-body"
            v-if="index < chatListes.length - 1 "
            v-html="item.content">
          </div>
          <div v-else
            class="markdown-body"
            v-highlight
            v-html="item.content">
          </div>
        </div>
        <div v-else
          class="chat_box phone">
          <div v-highlight
            class="markdown-body"
            v-if="index < chatListes.length - 1"
            v-html="item.content">
          </div>
          <div v-else
            class="markdown-body"
            v-highlight
            v-html="item.content">
          </div>
        </div>
      </div>
      <div
        v-if="item.role == 'user' && item.content"
        class="items items_right">
        <div v-if="!phone"
          class="chat_box">
          {{ item.content }}
        </div>
        <div v-else
          class="chat_box phone">
          {{ item.content }}
        </div>
        <div class="tx">
          <img
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            style="width:40px;height:40px">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EasyTyper from 'easy-typer-js'
// 将marked 引入
import { marked } from 'marked'
// 引入代码高亮样式
import 'highlight.js/styles/devibeans.css'

export default {
  props: ['chatLists'],
  data() {
    return {
      phone: false,
      typewriter: '',
      mdRegex: '',
      i: 0,
      timer: 0,
      chatListes: [],
      obj: {
        output: '',
        isEnd: false,
        speed: 80,
        singleBack: true,
        sleep: 0,
        type: 'rollback',
        backSpeed: 0,
        sentencePause: true
      }
    }
  },
  watch: {
    chatLists: {
      handler(val) {
        this.chatListes = val
        if (val.length > 0) {
          if (val[val.length - 1].role == 'assistant') {
            if (this.mdRegex.test(val[val.length - 1].content)) {
              this.initTyped(marked(val[val.length - 1].content))
            } else {
              this.initTyped(val[val.length - 1].content)
            }
          }
          for (var i = 0; i < val.length; i++) {
            if (this.mdRegex.test(val[i].content)) {
              val[i].content = marked(val[i].content)
            }
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.mdRegex = /[#*`|.png]/
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    this.chatListes = this.chatLists
    if (this.chatListes && this.chatListes.length > 0) {
      if (this.chatListes[this.chatListes.length - 1].role == 'assistant') {
        if (this.mdRegex.test(this.chatListes[this.chatListes.length - 1].content)) {
          this.initTyped(marked(this.chatListes[this.chatListes.length - 1].content))
        } else {
          this.initTyped(this.chatListes[this.chatListes.length - 1].content)
        }
      }
      for (var j = 0; j < val.length; j++) {
        if (this.mdRegex.test(this.chatListes[j].content)) {
          this.chatListes[j].content = marked(this.chatListes[j].content)
        }
      }
    }
  },
  methods: {
    initTyped(input, fn, hooks) {
      const obj = this.obj
      const typed = new EasyTyper(obj, input, fn, hooks)
    }
  }
}
</script>

<style>
</style>