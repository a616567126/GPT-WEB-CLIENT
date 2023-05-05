<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:28:40
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-05-04 16:13:41
 * @FilePath: /chat_gpt/src/views/newBing/components/content.vue
-->
<template>
  <div>
    <div class="pages">

      <el-row :gutter="20">
        <el-col :lg="8"
          :md="8"
          v-for="(item,index) in list"
          :key="index">
          <div class="flex">
            <div
              class="title">
              {{ item.title }}
            </div>
            <el-card
              style="width: 100%;height: 80px;">
              {{ item.text }}
            </el-card>
          </div>
        </el-col>
      </el-row>
      <div
        style="margin-top: 20px; font-size: 24px;">
        选择对话模式</div>
      <el-card
        style="width:340px;margin-top: 20px;">
        <div class="nav">
          <div class="item"
            :class="{active:isActive == item.type}"
            v-for="(item,index) in navList"
            @click="changeItem(item,index)"
            :key="index">
            <div>更多</div>
            <div>
              {{ item.text }}
            </div>
          </div>
        </div>
      </el-card>
    </div>
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
      chatObj: {},
      isActive: 'h3imaginative',
      list: [
        {
          title: '提出复杂问题',
          text: '“我可以为我挑剔的只吃橙色食物的孩子做什么饭?”'
        },
        {
          title: '获取更好的答案',
          text: '获取更好的答案"销量最高的 3 种宠物吸尘器有哪些优点和缺点?"'
        },
        {
          title: '获得创意灵感',
          text: '以海盗的口吻写一首关于外太空鳄鱼的俳句”'
        }
      ],
      navList: [
        {
          id: 1,
          text: '准确模式',
          type: 'h3precise'
        },
        {
          id: 2,
          text: '创造模式',
          type: 'h3imaginative'
        },
        {
          id: 3,
          text: '均衡模式',
          type: 'harmonyv3'
        }
      ]
    }
  },
  watch: {
    chatList: {
      handler(val) {
        console.log(val[0].question, 'watch')
        console.log(val[0].answer, 'watch')
        if (val.length > 0) {
          this.chatObj = {}
          if (val[0].answer.includes('\n')) {
            this.chatObj.answer = `${val[0].answer.replace(/\n/g, '<br/>')}`
            this.chatObj.question = val[0].question
          } else {
            this.chatObj.answer = val[0].answer
            this.chatObj.question = val[0].question
          }
        }
        this.$forceUpdate()
      },
      deep: true
    },
    isChat(val) {
      if (this.chatList[val].answer.includes('\n')) {
        this.chatObj.answer = `${this.chatList[val].answer.replace(/\n/g, '<br/>')}`
        this.chatObj.question = this.chatList[val].question
      }
      this.$forceUpdate()
    },
    isChats() {
      console.log(this.chatList, 'isChats')
      this.chatObj = {}
      this.chatObj = this.chatList[0]
      if (this.chatObj.answer.includes('\n')) {
        this.chatObj.answer = `${this.chatObj.answer.replace(/\n/g, '<br/>')}`
      }
    }
  },
  mounted() {
    this.chatObj = {}
    this.mdRegex = /[#*`|]/
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    this.chatObj = {}
    console.log(this.chatList, 'mounted')
    if (this.chatList && this.chatList.length > 0) {
      this.chatObj = this.chatList[0]
      if (this.chatObj.answer.includes('\n')) {
        this.chatObj.answer = `${this.chatObj.answer.replace(/\n/g, '<br/>')}`
      }
    }
  },
  methods: {
    changeItem(item, index) {
      this.isActive = item.type
    }
  }
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
<style lang="scss" scoped>
.pages {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.flex {
  display: flex;
  flex-flow: column;
  align-items: center;
}
.title {
  font-size: 20px;
  margin: 30px 0 10px;
}
.nav {
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .item {
    width: 100px;
    text-align: center;
    padding: 5px 0;
    cursor: pointer;
  }
  .item.active {
    background: blue;
    border-radius: 5px;
    color: #ffffff;
  }
}
</style>