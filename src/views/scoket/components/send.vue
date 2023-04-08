<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:30:48
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-06 23:22:06
 * @FilePath: /chat_gpt/src/views/scoket/components/send.vue
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
      placeholder="请输入"></el-input>
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
      obj: {},
      logId: '',
      disabled: false,
      messagesList: [],
      newMessageList: [],
      chatListss: []
    }
  },
  watch: {
    chatLists: {
      handler(val) {
        this.chatListss = val
        this.obj.messages = val
        window.localStorage.setItem('messages', JSON.stringify(val))
        this.disabled = false
      }
    }
  },
  created() {
    if (window.localStorage.getItem('logId')) {
      this.$https('REPEST', {
        logId: window.localStorage.getItem('logId'),
        newMessages: window.localStorage.getItem('newMessages')
      }).then(res => {})
    }
  },
  mounted() {
    this.phone = JSON.parse(window.localStorage.getItem('phone'))

    this.getTypes()
  },
  methods: {
    getTypes() {
      this.$https('getType', {}).then(res => {
        this.obj.type = res.data.type
      })
    },
    sendChat(e) {
      let num = this.$store.state.total
      this.obj.logId = ''
      if (window.localStorage.getItem('logId')) {
        this.obj.logId = window.localStorage.getItem('logId')
      } else {
        this.obj.logId = ''
      }
      if (this.sendText) {
        const obj = {
          question: this.sendText,
          answer: ``
        }
        this.$emit('sendText', obj)
        this.sendText = ''
        num = num - 1
        this.$store.commit('SET_TOTAL', num)
        this.disabled = false
        this.$emit('total', num)
      } else {
        this.$message.error('请输入')
      }
    }
  }
}
</script>

<style>
</style>