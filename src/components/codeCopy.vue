<template>
  <div class="copy-content">
    <!-- 复制按钮 -->
    <div
      class="copy-btn code-data-copy"
      @click="copyMessage"
      data-clipboard-action="copy"
      :data-clipboard-text="code">
      <svg t="1609826359524"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2955">
        <path
          d="M770.63802083 933.875H216.92708332c-44.82421875 0-79.1015625-34.27734375-79.10156249-79.1015625V195.59374999h553.7109375c44.82421875 0 79.1015625 34.27734375 79.1015625 79.10156251v659.1796875zM190.55989583 248.328125v606.4453125c0 15.8203125 10.546875 26.3671875 26.36718751 26.3671875h500.97656249V274.6953125c0-15.8203125-10.546875-26.3671875-26.3671875-26.3671875H190.55989583z"
          p-id="2956" />
        <path
          d="M612.43489583 424.98828125H296.02864583c-13.18359375 0-26.3671875-10.546875-26.3671875-26.3671875 0-13.18359375 10.546875-26.3671875 26.3671875-26.3671875h316.40625c13.18359375 0 26.3671875 10.546875 26.36718751 26.3671875 0 13.18359375-13.18359375 26.3671875-26.36718751 26.3671875z m0 131.8359375H296.02864583c-13.18359375 0-26.3671875-10.546875-26.3671875-26.3671875 0-13.18359375 10.546875-26.3671875 26.3671875-26.3671875h316.40625c13.18359375 0 26.3671875 10.546875 26.36718751 26.3671875 0 13.18359375-13.18359375 26.3671875-26.36718751 26.3671875z m0 131.8359375H296.02864583c-13.18359375 0-26.3671875-10.546875-26.3671875-26.3671875 0-13.18359375 10.546875-26.3671875 26.3671875-26.3671875h316.40625c13.18359375 0 26.3671875 10.546875 26.36718751 26.3671875 0 13.18359375-13.18359375 26.3671875-26.36718751 26.3671875z"
          p-id="2957" />
        <path
          d="M828.64583333 90.125h-527.34375001c-15.8203125 0-26.3671875 10.546875-26.36718749 26.3671875s10.546875 26.3671875 26.36718751 26.3671875h527.34374999c15.8203125 0 26.3671875 10.546875 26.3671875 26.3671875v606.4453125H823.37239583v52.73437499h84.375V169.2265625c0-44.82421875-36.9140625-79.1015625-79.1015625-79.1015625z"
          p-id="2958" />
        <path
          d="M797.00520833 802.0390625a26.3671875 26.3671875 0 1 0 52.73437501 0 26.3671875 26.3671875 0 1 0-52.73437501 0z"
          p-id="2959" />
      </svg>
    </div>
    <div v-if="success"
      class="copy-success-text">
      复制成功!</div>
  </div>
</template>

<script>
import clipboard from 'clipboard' //复制插件
export default {
  data() {
    return {
      code: null,
      success: false
    }
  },
  methods: {
    copyMessage(value) {
      let _this = this
      _this.success = false
      let clipboard = new this.clipboard('.code-data-copy')
      clipboard.on('success', function (e) {
        console.log('复制成功')
        _this.success = true
        // setTimeout(() => {
        //   _this.success = false
        // }, 300)
        clipboard.destroy() // 销毁,避免多次点击重复出现
      })
      clipboard.on('error', function () {
        console.log('复制失败')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.copy-content {
  height: 0;
}
.icon {
  width: 0.8rem;
  height: 0.8rem;
  fill: white;
}
.copy-btn {
  user-select: none;
  opacity: 0;
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
  padding: 5px;
  border-radius: 3px;
  transition: 0.3s;
  background: rgba(255, 255, 255, 0.2);
  &:active {
    background: rgba(253, 253, 253, 0.575);
  }
}
.copy-success-text {
  color: white;
  position: absolute;
  font-size: 12px;
  top: 8px;
  right: 2.5rem;
  font-weight: 200;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  animation: successCopy 0.5s ease both 1;
}
@keyframes successCopy {
  70% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}
</style>