<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-23 20:34:36
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-05-06 08:28:52
 * @FilePath: /chat_gpt/src/views/scoket/components/menu.vue
-->
<template>
  <div>
    <div class="menu_box"
      :class="{'phone':phone?true:false}"
      style="padding:20px">
      <!-- <el-button
        type="primary"
        style="width: 100%;"
        @click="addList"
        plain>Add
        Chat</el-button> -->
      <div class="btnx"
        :class="{active:isActive === index}"
        v-for="(item,index) in chatList"
        :key="index"
        @click.stop="openWindow(item,index)">
        <div>
          <i
            class="el-icon-chat-dot-square"></i>
        </div>
        <div>
          <input class="input"
            :disabled="true"
            v-model="item.question" />
        </div>
        <div class="edit">
          <!-- <i class="el-icon-edit-outline"
            @click.stop="item.disabled = !item.disabled"
            v-if="item.disabled"
            style="margin-right: 5px;"></i> -->
          <!-- <i class="el-icon-delete"
            v-if="item.disabled"
            @click="del(item,index)"></i>
          <i class="el-icon-document-checked"
            v-if="!item.disabled"
            @click.stop="item.disabled = !item.disabled"></i> -->
        </div>
      </div>
    </div>
    <div class="footer"
      :class="{'phone':phone?true:false}">
      <div class="lefts">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
      </div>
      <div class="center"
        style="text-align: left;margin-left: -50px;">
        <div
          style="font-size: #666;">
          {{ userInfo.name }}
          <el-tag size="mini"
            v-if="userInfo.type == 0"
            type="info">普</el-tag>
          <el-tag size="mini"
            v-if="userInfo.type == 1"
            type="warning">月</el-tag>
          <template
            v-if="kitList && kitList.length > 0">
            <el-tag
              style="margin:  0 3px;cursor: pointer;"
              size="mini"
              v-for="(item,index) in kitList"
              :key="index"
              @click="$refs.show.open(item)"
              type="danger">加</el-tag>
          </template>
        </div>
        <div
          v-if="userInfos.type == 0"
          style="font-size: 13px;color:#999999;margin-top: 5px;">
          剩余：{{userInfos.remainingTimes}}次
        </div>
        <div
          v-if="userInfos.type == 1"
          style="font-size: 13px;color:#999999;margin-top: 5px;">
          今日剩余：{{ userInfos.dayRemainingTimes }}次
        </div>
        <div
          v-if="userInfos.type == 1"
          style="font-size: 13px;color:#999999">
          {{userInfos.expirationTime.substring(0,10)}}到期
        </div>
      </div>
      <div>
        <el-button size="mini"
          @click="payPage"
          type="warning">充值</el-button>
      </div>
    </div>
    <Modal ref="show"></Modal>
  </div>
</template>

<script>
import Modal from './modal.vue'
export default {
  props: ['chatList', 'userInfo', 'kitList', 'total'],
  components: { Modal },
  data() {
    return {
      phone: false,
      isActive: 0,
      userInfos: {}
    }
  },
  mounted() {
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    setTimeout(() => {
      this.userInfos = this.userInfo
      this.userInfos.remainingTimes = this.$store.state.total
    }, 2000)
  },
  computed: {},
  watch: {
    chatList: {
      handler(val) {
        if (val && val.length > 0) {
          this.chatLists = val[0].chatLists
        }
      },
      deep: true
    },
    userInfo(val) {
      this.userInfos = val
    },
    total(val) {
      if (this.userInfos.type == 0) {
        this.userInfos.remainingTimes = val
      } else {
        this.userInfos.dayRemainingTimes = val
      }
    }
  },
  methods: {
    addList() {
      if (
        (this.userInfo.type == 0 && this.userInfo.remainingTimes == 0) ||
        (this.userInfo.type == 1 && this.userInfo.dayRemainingTimes == 0)
      ) {
        this.$alert('请先充值，然后进行对话', '提示')
      } else {
        const obj = {
          question: '',
          answer: ''
        }
        this.title = ''
        this.$emit('addList', obj)
        this.$emit('close', false)
      }
    },

    openWindow(item, index) {
      this.isActive = index
      this.$emit('changeChat', { data: index, show: false })
    },
    del(item, index) {
      this.chatList.splice(index, 1)
    },
    payPage() {
      this.$store.commit('SET_OPEN', false)
      this.$router.push('/user/product')
    }
  }
}
</script>

<style>
</style>