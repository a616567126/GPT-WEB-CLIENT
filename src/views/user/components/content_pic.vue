<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:28:40
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-04 13:56:57
 * @FilePath: /chat_gpt/src/views/user/components/content_pic.vue
-->
<template>
  <div>
    <div
      v-for="(item,index) in chatListPic"
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

          <div
            class="markdown-body"
            v-highlight>
            <img
              :src="item.content"
              style="width:100%" />
          </div>
        </div>
        <div v-else
          class="chat_box phone">
          <div v-highlight
            class="markdown-body">
            <img
              :src="item.content"
              style="width:100%" />
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
export default {
  props: ['chatListses'],
  data() {
    return {
      chatListPic: [],
      phone: false
    }
  },

  mounted() {
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    setTimeout(() => {
      this.chatListPic = this.chatListses
    }, 1000)
  },
  watch: {
    chatListses: {
      handler(val) {
        this.chatListPic = val
      }
    }
  },
  methods: {}
}
</script>

<style>
</style>