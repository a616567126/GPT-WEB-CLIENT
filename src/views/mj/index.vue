<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-20 20:49:33
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-05-13 10:09:55
 * @FilePath: /chat_gpt/src/views/mj/index.vue
-->
<template>
  <div class="contents">
    <div class="body">
      <Notice :notice="notice"
        @open="open">
      </Notice>
      <div class="main_home">
        <div class="left"
          v-if="!phone">
          <Menu
            @addList="addList"
            :total="totals"
            @changeChat="changeChat"
            :kit-list="kitList"
            :chat-list="chatLists"
            :user-info="userInfo">
          </Menu>
        </div>
        <div
          class="chat_right">
          <Content
            :loadingImg="loadingImg"
            @changeImg="changeImg"
            :promptZh="promptZh"
            :changeImgs="changeImgs"
            :status="status"
            @scuccess="scuccess"
            :time="time"
            :userTimes="userTimes"
            :codeNum="codeNum"
            :userTime="userTime"
            :imageUrlChange="imageUrlChange"
            :datareturn="datareturn"
            :imageUrl="imageUrl">
          </Content>
        </div>
      </div>
      <div>
        <div class="tool"
          :class="{'phone':phone}">
          <el-tooltip
            class="item"
            effect="dark"
            content="即时通讯"
            placement="top-start">
            <img
              src="../../assets/chats_icon.png"
              class="icon">
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="正常通讯"
            placement="top-start">
            <img
              @click="changeChats(1)"
              src="../../assets/chat_icon.png"
              class="icon">
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="画图"
            placement="top-start">
            <img
              @click="changeChats(3)"
              src="../../assets/picture.png"
              class="icon">
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="SD"
            placement="top-start">
            <i class="el-icon-picture icon"
              v-show="sdSatte > 0"
              style="font-size:20px;color:#666666"
              @click="changeChats(4)"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="newBing"
            placement="top-start">
            <i class="el-icon-document-copy icon"
              v-show="isOpenBing > 0"
              style="font-size:20px;color:#666666"
              @click="changeChats(5)"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="fs"
            placement="top-start">
            <i class="el-icon-cpu icon"
              v-show="isOpenFlagStudio > 0"
              @click="changeChats(7)"
              style="font-size:20px;color:#666666"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="mj"
            placement="top-start">
            <i class=" el-icon-camera icon"
              :class="{'active':isActive == 0}"
              v-show="isOpenMj > 0"
              @click="changeChats(8)"
              style="font-size:20px;color:#666666"></i>
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="充值"
            placement="top-start">
            <img
              @click="changeChats(2)"
              src="../../assets/pay_2.png"
              class="icon">
          </el-tooltip>
          <span
            style="right: 30px;position: absolute;"
            :style="{color:color}">
            <!-- <span
              v-if="time < 60">{{ time }}s</span> -->
            <i v-if="color == 'green'"
              class="el-icon-circle-check"
              style="margin-right:5px;font-size: 14px;"></i>
            <i v-if="color == 'red'"
              class="el-icon-circle-close"
              style="margin-right:5px;font-size: 14px;"></i>
            {{ scoketText }}</span>
        </div>
        <SendText
          @sendText="sendTexts"
          @ok="getData"
          :scuccess="scuccesss"
          @total="total">
        </SendText>
      </div>
    </div>
    <el-drawer
      :append-to-body="true"
      :size="'280px'"
      @close="close"
      custom-class="drawer_box"
      :visible.sync="$store.state.drawer"
      :direction="direction"
      :with-header="false">
      <Menu @addList="addList"
        @changeChat="changeChat"
        :total="totals"
        :kit-list="kitList"
        @close="close"
        :chat-list="chatList"
        :user-info="userInfo">
      </Menu>
    </el-drawer>
    <NoticeModal ref="notice">
    </NoticeModal>
  </div>
</template>

<script>
import Notice from '@/components/notice.vue'
import Menu from './components/menu.vue'
import NoticeModal from './components/noticeModal.vue'
import Content from './components/content.vue'
import SendText from './components/send.vue'
export default {
  name: 'marquee',
  components: { Notice, Menu, NoticeModal, Content, SendText },
  data() {
    return {
      list: [],
      totals: 0,
      dialogVisibles: false,
      sendText: '',
      isActive: 0,
      color: '',
      scoketText: '',
      title: 'New Chat',
      userInfo: {},
      kitList: [],
      scrollFlag: false,
      loading: false,
      isChat: 0,
      isChats: 0,
      direction: 'ltr',
      chatList: [],

      chatLists: [],
      oldScrollTop: 0,
      phone: false,
      notice: '',
      arr: [],
      sdSatte: 0,
      isOpenBing: 0,
      isOpenFlagStudio: 0,
      isOpenMj: 0,
      mdRegex: '',
      userTimes: 0,
      loadingImg: false,
      promptZh: '',
      timer: null,
      status: '',
      changeImgs: false,
      time: 60,
      scuccesss: false,
      codeNum: 0,
      timeres: null,
      times: 0,
      changetimeres: null,
      changetimes: 0,
      datareturn: {
        // promptEn: 'Golden Monkey',
        // taskId: '7881601451882157'
      },
      imageUrlChange: [],
      // imageUrlChange: 'https://img.v-wim.xyz/20230511/1683807904820.jpg',
      imageUrl: '',
      userTime: ''
      // imageUrl: 'https://img.v-wim.xyz/20230510/1683697381188.jpg'
    }
  },
  created() {},

  mounted() {
    this.getSdState()
    this.mdRegex = /[#*`|]/
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    document.querySelector('.box').addEventListener('scroll', this.scrolling)
    this.getData()
    this.initWebSocket()
  },
  watch: {
    chatList: {
      handler(val) {
        this.chatLists = val
        this.scrollToBottom()
      },
      deep: true
    }
  },
  methods: {
    getSdState() {
      this.$https('GETSDSTATE', {}).then(res => {
        this.sdSatte = res.data.isOpenSd
        this.isOpenFlagStudio = res.data.isOpenFlagStudio
        this.isOpenBing = res.data.isOpenBing
        this.isOpenMj = res.data.isOpenMj
      })
    },
    // 发送websockwt请求
    initWebSocket(ids) {
      let websocketUrl = this.wsUrl + '/chatWebSocket/' + JSON.parse(window.localStorage.getItem('userInfo')).userId
      // WebSocket与普通的请求所用协议有所不同，ws等同于http，wss等同于https
      this.webSock = new WebSocket(websocketUrl)
      this.webSock.onopen = this.webSocketOnOpen
      this.webSock.onerror = this.webSocketOnError
      this.webSock.onmessage = this.webSocketOnMessage
      this.webSock.onclose = this.webSocketClose
    },
    webSocketOnOpen() {
      this.scoketText = '连接成功'
      this.color = 'green'
      //  传递参数  不需要传参就不传
      // this.webSocketSend(this.id)
    },
    scuccess() {
      this.scuccesss = false
      clearInterval(this.timer)
      this.timer = null
    },
    webSocketOnMessage(e) {
      console.log(e.data, '0202020929272553')
      //接收数据

      const data = JSON.parse(e.data)
      console.log(data, 'index')
      if (this.changeImgs == false) {
        if (data.imageUrl) {
          this.imageUrl = data.imageUrl
          this.userTime = data.finishTime - data.submitTime
          this.status = data.status
          if (data.status !== 'IN_PROGRESS') {
            this.scuccesss = true
            clearInterval(this.timeres)
            this.timeres = null
          }
        } else {
          this.loading = true
          this.status = data.status
          if (data.status !== 'IN_PROGRESS') {
            this.scuccesss = true
            clearInterval(this.timeres)
            this.timeres = null
          }
          setTimeout(() => {
            this.loading = false
          }, 2000)
        }
      } else {
        if (data.imageUrl) {
          this.imageUrlChange[this.imageUrlChange.length - 1].changeImageUrl = data.imageUrl
          this.status = data.status
          if (data.status !== 'IN_PROGRESS') {
            this.scuccesss = true
            clearInterval(this.changetimeres)
            this.changetimeres = null
          }
        } else {
          this.loading = true
          this.status = data.status
          if (data.status !== 'IN_PROGRESS') {
            this.scuccesss = true
            clearInterval(this.changetimeres)
            this.changetimeres = null
          }
          setTimeout(() => {
            this.loading = false
          }, 2000)
        }
      }
      // this.lists.push(jsonObj.message)
      // if (e.data.includes('\n')) {
      //   let str = `${e.data.replace(/\n/g, '<br/>')}`
      //   this.arr.push(str)
      // } else {
      //   this.arr.push(e.data)
      // }
      // this.arr.push(e.data)
    },
    getTimes() {
      if (!this.timeres) {
        this.times = 0
        this.timeres = setInterval(() => {
          this.times++
          if (this.times > 0) {
            this.userTimes = this.times
          }
        }, 1000)
      }
    },
    getChangeTimes() {
      if (!this.changetimeres) {
        this.changetimes = 0
        this.changetimeres = setInterval(() => {
          this.changetimes++
          if (this.changetimes > 0) {
            this.imageUrlChange[this.imageUrlChange.length - 1].userTime = this.changetimes
            this.$forceUpdate()
          }
        }, 1000)
      }
    },
    getCodes(TIME_COUNT) {
      if (!this.timer) {
        this.time = TIME_COUNT
        this.disabled = true
        this.timer = setInterval(() => {
          if (this.time > 0 && this.time <= TIME_COUNT) {
            this.time--
          } else {
            this.$https('LOOKSTATUS', {
              taskId: this.datareturn.taskId
            }).then(res => {
              this.codeNum += 1
              this.status = res.data.status
              if (res.data.status == 'IN_PROGRESS') {
                this.$message.info('画图中...')
                clearInterval(this.timer)
                this.timer = null
                setTimeout(() => {
                  this.getCodes(60)
                }, 1000)
              } else {
                if (res.data.status == 'NOT_START' || res.data.status == 'FAILURE') {
                  this.$message.error('生成失败，请重新发起')
                }
                clearInterval(this.timeres)
                this.timeres = null
                clearInterval(this.timer)
                this.timer = null
                // this.time = 60
              }
            })
          }
        }, 1000)
      }
    },
    webSocketClose(e) {
      this.scoketText = '断开连接'
      this.color = 'red'
      this.lockReconnect = false
      this.reconnect()
    },
    webSocketOnError(e) {
      this.$message.error('报错信息', e)
    },
    webSocketSend(Data) {
      //发送数据发送
      this.webSock.send(Data)
    },
    // 断开重连操作
    reconnect() {
      if (this.lockReconnect) return
      this.lockReconnect = true
      let _this = this
      //没连接上会一直重连，设置延迟避免请求过多
      setTimeout(function () {
        _this.initWebSocket()
        _this.lockReconnect = false
        // _this.isOne = 1;
      }, 2000)
    },

    sendTexts(data) {
      this.chatLists = []
      this.changeImgs = ''
      this.imageUrl = ''
      this.status = ''
      this.codeNum = 0
      this.getTimes()
      this.datareturn = {}
      this.chatLists.unshift(data)
      this.scuccesss = true
      this.promptZh = data.question
      this.$https('MJCHAT', {
        action: 'IMAGINE',
        prompt: data.question
      }).then(res => {
        this.datareturn = res.data
        this.status = 'IN_PROGRESS'
        this.arr = []
        this.loading = true
        this.getCodes(60)
      })

      //
      // this.webSocketSend(data.question)
    },
    changeImg(data) {
      this.imageUrlChange.push(data)
      this.$message.success('正在重新生成')
      this.changeImgs = true
      this.getCodes(60)
      this.getChangeTimes()
      // this.datareturn.taskId = data.taskId
      this.loadingImg = true
    },
    changeChats(e) {
      if (e == 1) {
        this.$router.push('/scoket')
      } else if (e == 2) {
        this.$router.push('/user/product')
      } else if (e == 3) {
        this.$router.push({
          path: '/scoket',
          query: {
            id: e
          }
        })
      } else if (e == 4) {
        this.$router.push('/sdPage/index')
      } else if (e == 5) {
        this.$router.push('/newBing/index')
      } else if (e == 7) {
        this.$router.push('/fsPage/index')
      }
    },
    getData() {
      this.$https('USERHOME', {
        sendType: 1
      }).then(res => {
        this.notice = res.data.content
        // this.chatList = res.data.logList
        this.chatList = []
        // if (this.chatList.length > 0) {
        //   this.title = this.chatList[0].question
        //   this.chatList.map(item => {
        //     if (this.mdRegex.test(item.answer)) {
        //       item.answer = marked(item.answer)
        //     }
        //   })
        // } else {
        //   const obj = {
        //     disabled: true,
        //     question: 'New Chat',
        //     answer: ''
        //   }
        //   this.chatList.push(obj)
        // }
        // this.kitList = res.data.kitList
        this.userInfo = {
          dayRemainingTimes: res.data.dayRemainingTimes,
          name: res.data.name,
          expirationTime: res.data.expirationTime,
          remainingTimes: res.data.remainingTimes,
          type: res.data.type
        }
        if (res.data.type == 0) {
          this.$store.commit('SET_TOTAL', res.data.remainingTimes)
        } else {
          this.$store.commit('SET_TOTAL', res.data.dayRemainingTimes)
        }
      })
    },
    close(data) {
      this.drawer = data
      this.$store.commit('SET_OPEN', data)
    },
    addList(data) {
      this.chatList.unshift(data)
    },
    open() {
      this.$router.push('/user/notice')
    },
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('.chat_right')
        container.scrollTop = container.scrollHeight
      })
    },
    scrolling() {
      let scrollTop = document.querySelector('.chat_right').scrollTop
      // 更新——滚动前，滚动条距文档顶部的距离
      let scrollStep = scrollTop - this.oldScrollTop
      this.oldScrollTop = scrollTop
      //判断当前是向上or向下滚动
      if (scrollStep < 0) {
        //向上
        this.scrollFlag = false
      } else {
        this.scrollFlag = true
      }
    },
    total(data) {
      this.totals = data
    },
    changeChat(data) {
      this.drawer = data.show
      this.isChat = data.data
      this.$store.commit('SET_OPEN', data.show)
    }
  }
}
</script>
<style lang="scss">
.contents {
  .body {
    border: 1px solid #e6e6e6;
    border-radius: 10px;
    overflow: hidden;
    width: calc(100vw - 30px);
    height: calc(100vh - 80px);
    position: relative;
    .main_home {
      display: flex;
      flex-grow: 1;
      .left {
        width: 280px;
        background: #ffffff;
        height: calc(100vh - 120px);
      }
      .chat_right {
        height: calc(100vh - 220px);
        overflow-y: auto;
        width: 100%;
        position: relative;
        .items_right {
          justify-content: flex-end;
        }
        .items {
          display: flex;
          align-items: flex-start;
          width: 100%;
          flex-grow: 1;
          margin-top: 20px;
          .tx {
            width: 40px;
            height: 40px;
            margin-left: 10px;
            border-radius: 10px;
            overflow: hidden;
            margin-right: 10px;
          }
          .chat_box {
            max-width: 60vw;
            padding: 10px 20px;
            background: #ffffff;
            border-radius: 5px;
            margin: 0 10px;
          }
          .chat_box.phone {
            max-width: 60vw;
            padding: 10px 20px;
            background: #ffffff;
            border-radius: 5px;
            margin: 0 10px;
          }
        }
      }
    }
  }
}
.tool.phone {
  width: 100%;
  left: 0;
}
.tool {
  display: flex;
  height: 40px;
  background: #ffffff;
  align-items: center;
  position: absolute;
  bottom: 70px;
  left: 280px;
  width: calc(100% - 290px);
  padding-left: 20px;
  .icon {
    width: 20px;
    margin: 0 10px;
    cursor: pointer;
    filter: grayscale(100%);
  }
  .icon:hover,
  .icon.active {
    color: purple !important;
  }
}
.input_box {
  display: flex;
  padding: 15px 20px;
  width: calc(100% - 290px);
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 270px;
}
.input_box.phone {
  display: flex;
  padding: 15px 20px;
  width: calc(100% - 30px);
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  left: 0;
}
.menu_box.phone {
  width: 240px;
  height: calc(100vh - 145px);
}
.menu_box {
  width: 240px;
  padding: 20px;
  height: calc(100vh - 260px);
  overflow: auto;
  .btnx {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid #d9d9d9;
    border-radius: 5px;
    margin-top: 10px;
    padding: 10px 5px;
    cursor: pointer;
    .input {
      border: 0;
      outline: none;
      background: #ffffff;
    }
  }
  .btnx.active {
    border: 1px solid seagreen;
    color: seagreen;
    .input {
      color: seagreen;
    }
  }
}

.footer {
  border-top: 1px solid #d9d9d9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  flex-grow: 1;
  height: 80px;
}
.footer.phone {
  .lefts {
    width: 50px !important;
    height: 50px !important;
  }
}
.icon.active {
  color: purple;
}
</style>
<style lang="scss">
.drawer_box .el-drawer__body {
  background: #ffffff;
}
</style>
