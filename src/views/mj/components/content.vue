<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-24 14:28:40
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-05-10 17:19:50
 * @FilePath: /chat_gpt/src/views/mj/components/content.vue
-->
<template>
  <div>
    <div class="items"
      v-if="promptZh">
      <div class="tx">
        <img
          :src="require('@/assets/chat.png')"
          style="width:40px;height:40px">
      </div>
      <div class="chat_box">
        <div>
          关键字:{{ promptZh }}
        </div>
        <div>
          译文:{{ datareturn.promptEn }}
        </div>
        <div>
          任务ID:{{ datareturn.taskId }}
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
        <div class="chat_box">
          <div>
            <span
              >正在画图中...，请勿刷新或离开当前页面</span>
            <!-- <span
              v-if="status == 'NOT_START' || status == 'FAILURE'">
              画图失败，请重新画图...
            </span> -->
            <span
              style="margin-left: 10px;"
              v-if="time < 60">({{ time }}s)</span>
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
        <div class="chat_box">
          <div
            v-if="imageUrl">
            <span
              v-if="!imageUrl">{{ imageUrl }}</span>
            <img
              :src="imageUrl"
              v-loading="loadingImg"
              style="width:340px;height:340px">
            <div
              v-if="imageUrl">
              <div>
                <el-button
                  type="success"
                  @click="changeImg(item)"
                  v-for="(item,index) in UList"
                  :key="index">
                  {{item.name}}
                </el-button>
              </div>
              <div
                style="margin-top: 20px;">
                <el-button
                  type="primary"
                  @click="changeImg(item)"
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

  </div>
</template>

<script>
export default {
  props: ['datareturn', 'imageUrl', 'loadingImg', 'promptZh', 'status', 'time'],
  data() {
    return {
      phone: false,
      UList: [
        {
          value: 'U1',
          name: '放大1'
        },
        {
          value: 'U2',
          name: '放大2'
        },
        {
          value: 'U3',
          name: '放大3'
        },
        {
          value: 'U4',
          name: '放大4'
        }
      ],
      VList: [
        {
          value: 'V1',
          name: '变换1'
        },
        {
          value: 'V2',
          name: '变换2'
        },
        {
          value: 'V3',
          name: '变换3'
        },
        {
          value: 'V4',
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
    changeImg(item) {
      const obj = {
        content: this.datareturn.taskId + ' ' + item.value
      }
      this.$https('MJUV', obj).then(res => {
        this.$emit('changeImg', res.data)
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
  max-width: calc(100vw - 490px) !important;
}
.chat_box.phone {
  max-width: calc(100vw - 120px) !important;
}
</style>