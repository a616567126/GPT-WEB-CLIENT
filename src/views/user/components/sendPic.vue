<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:30:48
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-08 14:08:17
 * @FilePath: /chat_gpt/src/views/user/components/sendPic.vue
-->
<template>
  <div class="input_box"
    :class="{'phone':phone?true:false}">
    <el-input
      v-model="sendText"
      type="textarea" :row="1"
      style="width:100%"
      ref="index"
      :disabled="disabled"
      @keyup.enter.native="sendChat"
      placeholder="请描述图片"></el-input>
    <el-button type="success"
      @click="sendChat"
      :disabled="disabled"
      style="margin-left: 20px;">
      <i class="el-icon-s-promotion"
        style="font-size: 20px;"></i>
    </el-button>
  </div>
</template>

<script>
export default {
  props: ['chatLists'],
  data() {
    return {
      phone: false,
      sendText: '',
      type: '0',
      num: 0,
      disabled: false,
      chatListss: []
    }
  },
  mounted() {
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    this.chatListss = []
    this.getTypes()
  },
  methods: {
    getTypes() {
      this.$https('getType', {}).then(res => {
        this.type = res.data.type
        if (res.type == 1) this.num = res.data.dayRemainingTimes
        else this.num = res.data.remainingTimes
        setTimeout(() => {
          if (this.num == 0) {
            this.disabled = true
          }
        }, 500)
      })
    },
    sendChat(e) {
      let num = this.$store.state.total
      if (this.sendText) {
        const send = {
          prompt: this.sendText,
          type: this.type
        }
        const objes = {
          content: this.sendText,
          role: 'user'
        }
        this.chatListss.push(objes)
        this.$emit('title', this.sendText)
        this.sendText = ''
        this.$emit('chatListss', this.chatListss)
        setTimeout(() => {
          this.disabled = true
          this.$https('CANVAS', send).then(res => {
            this.disabled = false
            if (res.code == 20000) {
              const objs = {
                role: 'assistant',
                chatType: '2',
                content: res.data.data[0].url
              }
              this.chatListss.push(objs)
              this.$emit('chatListss', this.chatListss)
              num = num - 1
              this.$store.commit('SET_TOTAL', num)
              this.disabled = false
              this.$emit('total', num)
            }
          })
        }, 500)
      } else {
        this.$message.error('请输入')
      }
    }
  }
}
</script>

<style>
</style>