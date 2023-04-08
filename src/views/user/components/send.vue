<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:30:48
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-08 14:08:35
 * @FilePath: /chat_gpt/src/views/user/components/send.vue
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
      chatListss: [],
      num: 0
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
    },
    num(val) {
      if (val == 0) {
        this.disabled = true
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
    this.chatListss = this.chatLists
    window.localStorage.setItem('messages', JSON.stringify(this.chatListss))
    this.getTypes()
  },
  methods: {
    getTypes() {
      this.$https('getType', {}).then(res => {
        this.obj.type = res.data.type
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
      this.obj.logId = ''
      if (window.localStorage.getItem('logId')) {
        this.obj.logId = window.localStorage.getItem('logId')
      } else {
        this.obj.logId = ''
      }
      if (this.sendText) {
        const send = {
          content: this.sendText,
          role: 'user'
        }
        this.$emit('title', this.sendText)
        this.obj.messages.push(send)
        this.sendText = ''

        setTimeout(() => {
          this.disabled = true
          this.$https('CHAT', this.obj).then(res => {
            if (res.code == 20000) {
              this.chatListss.push(res.data.choices[0].message)
              num = num - 1
              this.$store.commit('SET_TOTAL', num)
              this.disabled = false
              this.$emit('total', num)
              setTimeout(() => {
                window.localStorage.setItem('logId', res.data.logId)
                window.localStorage.setItem('newMessages', JSON.stringify(this.chatListss))
                // this.$https('REPEST', {
                //   logId: window.localStorage.getItem('logId'),
                //   newMessages: window.localStorage.getItem('newMessages')
                // }).then(res => {})
              }, 500)
            } else {
              const objs = {
                content: '网络异常，请重试。',
                role: 'assistant'
              }
              const index = res.msg.indexOf('_')
              const logId = res.msg.substring(index + 1, res.msg.length)
              window.localStorage.setItem('logId', logId)
              this.chatListss.push(objs)
              setTimeout(() => {
                window.localStorage.setItem('newMessages', JSON.stringify(this.chatListss))
              }, 500)
              this.$https('ADD', { logId: logId, newMessages: JSON.stringify(this.chatListss) }).then(res => {
                this.$emit('ok')
              })
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