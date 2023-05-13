<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:28:40
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-05-13 10:17:23
 * @FilePath: /chat_gpt/src/views/mj/components/content.vue
-->
<template>
  <div>
    <!-- 原来的 -->
    <div class="items"
      v-if="promptZh">
      <div class="tx">
        <img
          :src="require('@/assets/chat.png')"
          style="width:40px;height:40px">
      </div>
      <div class="chat_box"
        :class="{'phone':phone}">
        <div>
          关键字:{{ promptZh }}
        </div>
        <div>
          译文:{{ datareturn.promptEn }}
        </div>
        <div>
          任务ID:{{ datareturn.taskId }}
        </div>
        <div>
          画图用时:{{ userTimes }}s
          <!-- {{ (userTime / 3600).toFixed(0) }} -->
        </div>
      </div>
    </div>
    <div v-if="status">
      <div class="items"
        v-if="status !== 'SUCCESS'">
        <div class="tx">
          <img
            :src="require('@/assets/chat.png')"
            style="width:40px;height:40px">
        </div>
        <div class="chat_box"
          :class="{'phone':phone}">
          <div>
            <span
              v-if="status == 'IN_PROGRESS'">正在画图中...</span>
            <span
              v-if="status == 'NOT_START' || status == 'FAILURE'">
              画图失败，请重新画图...
            </span>
          </div>
        </div>
      </div>
      <div class="items"
        v-else>
        <div class="tx">
          <img
            :src="require('@/assets/chat.png')"
            style="width:40px;height:40px">
        </div>
        <div class="chat_box"
          :class="{'phone':phone}">
          <div
            v-if="imageUrl">
            <span
              v-if="!imageUrl">{{ imageUrl }}</span>
            <img
              :src="imageUrl"
              v-loading="loadingImg"
              style="width:340px;height:340px">
            <div
              v-if="imageUrl && !phone"
              style="margin-top: 20px;">
              <div>
                <el-button
                  :disabled="item.disabled"
                  type="success"
                  @click="changeImg(item,index,1)"
                  v-for="(item,index) in UList"
                  :key="index">
                  {{item.name}}
                </el-button>
              </div>
              <div
                style="margin-top: 20px;">
                <el-button
                  type="primary"
                  :disabled="item.disabled"
                  @click="changeImg(item,index,2)"
                  v-for="(item,index) in VList"
                  :key="index">
                  {{item.name}}
                </el-button>
              </div>
            </div>

            <div
              v-if="imageUrl && phone"
              style="margin-top: 20px;width: 340px;">
              <div
                style="overflow: hidden;">
                <el-button
                  :disabled="item.disabled"
                  type="success"
                  size="mini"
                  @click="changeImg(item,index,1)"
                  v-for="(item,index) in UList"
                  :key="index">
                  {{item.name}}
                </el-button>
              </div>
              <div
                style="margin-top: 20px;overflow: hidden;">
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="item.disabled"
                  @click="changeImg(item,index,2)"
                  v-for="(item,index) in VList"
                  :key="index">
                  {{item.name}}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template
      v-if="imageUrlChange && imageUrlChange.length > 0">
      <template
        v-for="item in imageUrlChange">
        <div class="items">
          <div class="tx">
            <img
              :src="require('@/assets/chat.png')"
              style="width:40px;height:40px">
          </div>
          <div
            class="chat_box"
            :class="{'phone':phone}">
            <div>
              任务ID:{{ item.taskId }}
            </div>
            <div>
              变换方式:<span
                v-if="item.type == 1">放大</span>
              <span
                v-if="item.type == 2">变换</span>
            </div>
            <div>
              画图用时:{{ item.userTime }}s
            </div>
          </div>
        </div>
        <div
          v-if="item.changeImageUrl"
          class="items">
          <div class="tx">
            <img
              :src="require('@/assets/chat.png')"
              style="width:40px;height:40px">
          </div>
          <div
            class="chat_box"
            :class="{'phone':phone}">
            <img
              v-if="item.changeImageUrl"
              :src="item.changeImageUrl"
              style="width: 340px;height:340px" />
            <div
              v-if="item.changeImageUrl && !phone && item.type == 2"
              style="margin-top: 20px;">
              <div>
                <el-button
                  :disabled="btn.disabled"
                  type="success"
                  @click="changeImg(btn,index,1)"
                  v-for="(btn,index) in UList"
                  :key="index">
                  {{btn.name}}
                </el-button>
              </div>
              <div
                style="margin-top: 20px;">
                <el-button
                  type="primary"
                  :disabled="btn.disabled"
                  @click="changeImg(btn,index,2)"
                  v-for="(btn,index) in VList"
                  :key="index">
                  {{btn.name}}
                </el-button>
              </div>
            </div>
            <div
              v-if="item.changeImageUrl && phone && item.type == 2"
              style="margin-top: 20px;width: 340px;">
              <div
                style="overflow: hidden;">
                <el-button
                  :disabled="btn.disabled"
                  type="success"
                  size="mini"
                  @click="changeImg(btn,index,1)"
                  v-for="(btn,index) in UList"
                  :key="index">
                  {{btn.name}}
                </el-button>
              </div>
              <div
                style="margin-top: 20px;overflow: hidden;">
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="btn.disabled"
                  @click="changeImg(btn,index,2)"
                  v-for="(btn,index) in VList"
                  :key="index">
                  {{btn.name}}
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: ['datareturn', 'imageUrl', 'loadingImg', 'promptZh', 'status', 'time', 'imageUrlChange', 'userTime', 'codeNum', 'userTimes'],
  data() {
    return {
      phone: false,
      UList: [
        {
          value: 'U1',
          disabled: false,
          name: '放大1'
        },
        {
          value: 'U2',
          disabled: false,
          name: '放大2'
        },
        {
          value: 'U3',
          disabled: false,
          name: '放大3'
        },
        {
          value: 'U4',
          disabled: false,
          name: '放大4'
        }
      ],
      disabled: false,
      dianjiNum: 1,
      VList: [
        {
          value: 'V1',
          disabled: false,
          name: '变换1'
        },
        {
          value: 'V2',
          disabled: false,
          name: '变换2'
        },
        {
          value: 'V3',
          disabled: false,
          name: '变换3'
        },
        {
          value: 'V4',
          disabled: false,
          name: '变换4'
        }
      ]
    }
  },
  mounted() {
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
  },
  watch: {
    status(val) {
      if (val !== 'IN_PROGRESS') {
        this.$emit('scuccess')
      }
    }
  },
  methods: {
    // 'datareturn', 'imageUrl', 'loadingImg', 'promptZh', 'status', 'time', 'imageUrlChange', 'userTime', 'codeNum', 'userTimes'
    getList() {
      this.list = [
        {
          name: '关键字',
          name2: '译文',
          name3: '任务ID',
          promptZh: this.promptZh,
          imageUrl: this.imageUrl,
          status: this.status,
          loadingImg: this.loadingImg,
          promptEn: this.datareturn.promptEn,
          taskId: this.datareturn.taskId,
          type: 2,
          userTimes: this.userTimes
        },
        {
          name: '关键字',
          name2: '变换方式',
          name3: '任务ID',
          promptZh: this.promptZh,
          type: 1,
          imageUrlChange: this.imageUrlChange
        }
      ]
    },
    changeImg(item, index, e) {
      const obj = {
        content: this.datareturn.taskId + ' ' + item.value
      }
      this.dianjiNum += 1
      this.$https('MJUV', obj).then(res => {
        const changeObj = {
          type: e,
          taskId: res.data.taskId,
          userTime: 0,
          changeImageUrl: ''
        }
        this.$emit('changeImg', changeObj)
        if (e == 1) {
          this.UList[index].disabled = true
          this.$forceUpdate()
          item.disabled = true
          console.log(this.UList[index].disabled)
        } else {
          this.VList[index].disabled = true
          item.disabled = true
          this.$forceUpdate()
        }
      })
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
  overflow-x: auto;
  max-width: calc(100vw - 490px) !important;
}
.chat_box.phone {
  overflow-x: auto;
  max-width: calc(100vw - 120px) !important;
}
</style>