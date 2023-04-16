<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-04-16 20:21:42
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-16 20:53:32
 * @FilePath: /chat_gpt/src/components/SlideVerify/index.vue
-->
<template>
  <!-- 遮罩层 -->
  <div class="mask">
    <div
      class="slideContainer">
      <slide-verify
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
        @fulfilled="onFulfilled"
        slider-text="向右滑动验证">
      </slide-verify>
      <div
        style="margin-top: 15px;">
        {{ text }}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      text: ''
    }
  },
  methods: {
    onSuccess(times) {
      this.text = '验证通过，耗时 ' + (times / 1000).toFixed(1) + '秒'
      this.$emit('success', 'success')
      this.onRefresh()
    },
    onFail() {
      this.text = '验证失败'
    },
    onRefresh() {
      //点击刷新按钮
      this.text = ''
    },
    onFulfilled() {
      //验证失败自动刷新
      this.text = '重新验证'
      this.onRefresh()
    }
  }
}
</script>
<style scoped>
.mask {
  position: fixed;
  left: 0%;
  top: 0%;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}
.mask .slideContainer {
  background-color: rgb(255, 255, 255);
  padding: 15px;
}
</style>
