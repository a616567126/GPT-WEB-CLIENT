<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-20 21:02:46
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-31 09:54:14
 * @FilePath: /chat_gpt/src/components/notice.vue
-->
<template>
  <div
    class="notice-card-wrapper box">
    <div class="header">
      <div class="title">
        <!-- 系统公告 -->
        <div class="message">
          <div
            class="inner-container">
            <span
              v-html="notice"></span>
          </div>
        </div>

      </div>
    </div>
    <el-button type="text"
      class="more_btn"
      @click="$emit('open',item)">查看更多</el-button>
  </div>
</template>

<script>
export default {
  props: ['notice'],
  name: 'SystemNotice',
  components: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.notice-card-wrapper {
  height: 30px;
  background-color: antiquewhite;
  padding: 0 10px;
  position: relative;
  .more_btn {
    position: absolute;
    right: 0;
    top: -4px;
    height: 30px;
    width: 100px;
    background: antiquewhite;
    z-index: 99;
  }
  .inner-container {
    line-height: 30px;
    margin-left: 100%; // 把文字弄出可见区域
    width: 1000%;
    height: 30px;
    overflow: hidden;
    animation: myMove 30s linear infinite; // 重点，定义动画
    animation-fill-mode: forwards;
  }
  /*文字无缝滚动*/
  @keyframes myMove {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-2500px);
    }
  }
}
</style>


