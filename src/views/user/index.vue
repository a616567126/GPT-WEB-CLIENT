<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-20 20:49:33
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-28 13:53:38
 * @FilePath: /chat_gpt/src/views/user/index.vue
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
            :chat-list="chatList"
            :user-info="userInfo">
          </Menu>
        </div>
        <div class="right">
          <Content
            :chatLists="chatLists">
          </Content>
        </div>
      </div>
      <SendText @ok="getData"
        @total="total"
        :chatLists="chatLists">
      </SendText>
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
      title: 'New Chat',
      isActive: 0,
      userInfo: {},
      chatLists: [],
      kitList: [],
      direction: 'ltr',
      chatList: [],
      oldScrollTop: 0,
      phone: '',
      notice: ''
    }
  },
  created() {},

  mounted() {
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    document.querySelector('.box').addEventListener('scroll', this.scrolling)
    this.getData()
  },
  watch: {
    chatLists: {
      handler(val) {
        this.scrollToBottom()
      },
      deep: true
    }
  },
  methods: {
    getData() {
      this.$https('USERHOME', {}).then(res => {
        // window.localStorage.setItem('data', JSON.stringify(res.data))
        // this.list = [{ name: res.data.content }]
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
      this.$router.push('/user/notice')
    },
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('.right')
        container.scrollTop = container.scrollHeight
      })
    },
    scrolling() {
      let scrollTop = document.querySelector('.right').scrollTop
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
      this.title = data.data.chatLists[0].content
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
      .right {
        height: calc(100vh - 200px);
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
