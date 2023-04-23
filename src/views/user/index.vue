<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-20 20:49:33
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-23 10:59:41
 * @FilePath: /chat_gpt/src/views/user/index.vue
-->
<template>
  <div class="contents">
    <div class="body" :class="{
      'phone':phone?true:false
    }">
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
            :chat-list="chatList"
            :user-info="userInfo">
          </Menu>
        </div>
        <div
          class="chat_right">
          <Content
            v-if="isActive == 0"
            :chatLists="chatLists">
          </Content>
          <ContentPic
            :chatListses="chatListses"
            v-if="isActive == 1">
          </ContentPic>
        </div>
      </div>
      <div>
        <div class="tool"
          :class="{'phone':phone}">
          <el-tooltip
            class="item"
            effect="dark"
            content="正常通讯"
            placement="top-start">
            <img
              @click="changeChats(0)"
              :class="{'active':isActive == 0}"
              src="../../assets/chat_icon.png"
              class="icon">
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="即时通讯"
            placement="top-start">
            <img
              @click="changeChats(2)"
              :class="{'active':isActive == 2}"
              src="../../assets/chats_icon.png"
              class="icon">
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="画图"
            placement="top-start">
            <img
              @click="changeChats(1)"
              :class="{'active':isActive == 1}"
              src="../../assets/picture.png"
              class="icon">
          </el-tooltip>
          <el-tooltip
            class="item"
            effect="dark"
            content="SD"
            placement="top-start">
            <i class="el-icon-picture icon"
              v-show="sdState > 0"
              style="font-size:20px;color:#666666"
              @click="changeChats(4)"></i>
          </el-tooltip>

          <el-tooltip
            class="item"
            effect="dark"
            content="充值"
            placement="top-start">
            <img
              @click="changeChats(3)"
              src="../../assets/pay_2.png"
              class="icon">
          </el-tooltip>
        </div>
        <SendText
          v-if="isActive == 0"
          @ok="getData"
          @total="total"
          :chatLists="chatLists">
        </SendText>
        <SendPic @ok="getData"
          v-if="isActive == 1"
          @total="total"
          @chatListss="chatListss">
        </SendPic>
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
import ContentPic from './components/content_pic.vue'
import SendText from './components/send.vue'
import SendPic from './components/sendPic.vue'
export default {
  name: 'marquee',
  components: { Notice, Menu, ContentPic, SendPic, NoticeModal, Content, SendText },
  data() {
    return {
      cmOptions: {
        tabSize: 2,
        mode: 'text/javascript',
        theme: 'base16-light', // 主题
        lineNumbers: true,
        line: true
      },
      list: [],
      totals: 0,
      dialogVisibles: false,
      sendText: '',
      title: 'New Chat',
      isActive: 0,
      userInfo: {},
      chatLists: [],
      kitList: [],
      chatListses: [],
      direction: 'ltr',
      chatList: [],
      oldScrollTop: 0,
      phone: false,
      sdState: 0,
      notice: ''
    }
  },
  created() {},

  mounted() {
    this.getSdState()
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    console.log(this.phone, '000')
    document.querySelector('.box').addEventListener('scroll', this.scrolling)
    if (this.$route.query && this.$route.query.id) {
      console.log(122)
      this.isActive = 1
    } else {
      this.isActive = 0
    }
    this.getData()
  },
  watch: {
    chatLists: {
      handler(val) {
        console.log(val, '000')
        this.scrollToBottom()
      },
      deep: true
    }
  },
  methods: {
    getSdState() {
      this.$https('GETSDSTATE', {}).then(res => {
        this.sdState = res.data
      })
    },
    chatListss(data) {
      this.chatListses = data
    },
    changeChats(e) {
      if (e == 1) {
        this.$confirm('画图记录不做保存', '提示', {
          confirmButtonText: '继续',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.isActive = e
          this.chatListses = [
            {
              content: '',
              role: 'user'
            }
          ]
        })
      } else if (e == 2) {
        this.$router.push('/')
      } else if (e == 3) {
        this.$router.push('/user/product')
      } else if (e == 4) {
        this.$router.push('/sdPage/index')
      } else {
        this.isActive = e
      }
    },
    getData() {
      this.$https('USERHOME', {
        sendType: 0
      }).then(res => {
        this.notice = res.data.content
        this.chatList = res.data.logList
        this.chatList.map(item => {
          this.$set(item, 'disabled', true)
          this.$set(item, 'chatLists', JSON.parse(item.useValue))
          this.$set(item, 'name', item.chatLists[0].content)
        })
        if (this.chatList.length > 0) {
          this.chatLists = this.chatList[0].chatLists
          this.title = this.chatLists[0].content
        } else {
          const obj = {
            disabled: true,
            name: 'New Chat',
            chatLists: []
          }
          this.chatList.push(obj)
          this.chatLists = this.chatList[0].chatLists
        }
        this.kitList = res.data.kitList
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
      this.chatLists = data[0].chatLists
      this.title = data[0].name
    },
    open() {
      this.$https('REPEST', {
        logId: window.localStorage.getItem('logId'),
        newMessages: window.localStorage.getItem('newMessages')
      }).then(res => {})
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
      this.title = data.data.name
      this.chatLists = data.data.chatLists
      this.drawer = data.show
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
    overflow: hidden !important;
    width: calc(100vw - 30px) !important;
    height: calc(100vh - 60px) !important;
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
    filter: grayscale(0);
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
</style>
<style lang="scss">
.drawer_box .el-drawer__body {
  background: #ffffff;
}
</style>
