<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:30:48
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-26 09:27:11
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
      sendNum: 0,
      logId: '',
      num: 0,
      disabled: false,
      messagesList: [],
      newMessageList: [],
      chatListss: []
    }
  },
  watch: {
    chatLists: {
      handler(val) {
        console.log(val)
        this.chatListss = val
        this.obj.messages = val
        window.localStorage.setItem('messages', JSON.stringify(val))
        this.disabled = false
        this.sendNum = 0
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
      this.sendNum += 1
      if (this.sendNum < 2) {
        let num = this.$store.state.total
        if (this.sendText) {
          const obj = {
            question: this.sendText, // 获取发送文本框中的内容
            answer: `` // 初始化回答为空
          }
          this.$emit('sendText', obj)
          this.sendText = ''
          num = num - 1
          // 发送文本内容
          // 清空发送框
          // 数量减一
          this.$store.commit('SET_TOTAL', num) // 在 Vuex 中提交 SET_TOTAL mutation，将 num 作为参数传递
          this.disabled = false // 将 disabled 属性设置为 false，使按钮可用
          this.$emit('total', num) // 触发 total 事件，并将 num 作为参数传递
          setTimeout(() => {
            this.sendNum = 0 // 2 秒后将 sendNum 属性设置为 0
          }, 2000)
        } else {
          this.$message.error('请输入')
        }
      }
    }
  }
}
</script>

<style>
</style>