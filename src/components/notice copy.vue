<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-20 21:02:46
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-26 17:04:49
 * @FilePath: /chat_gpt/src/components/notice.vue
-->
<!-- 公告栏组件 -->
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
              v-html="list[0].name"></span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <el-carousel height="40px"
      width="100%"
      direction="vertical"
      indicator-position='none'
      arrow="never"
      :autoplay="true">
      <el-carousel-item
        class="text_item"
        v-for="(item,index) in list"
        :key="index">
        <div
          class="items line_1 inner-container">
          {{item.name}}
        </div>
        <div class="items">
          <el-button
            type="text"
            @click="$emit('open',item)">查看更多</el-button>
        </div>
      </el-carousel-item>
    </el-carousel> -->
  </div>
</template>

<script>
export default {
  name: 'NoticeBar',
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      istop: false
    }
  },
  created() {
    setInterval(this.showBox, 2000)
  },
  mounted() {},
  methods: {
    showBox() {
      // 该方法开始运行时，让该类名可以使用
      this.istop = true
      setTimeout(() => {
        this.list.push(this.list[0])
        this.list.shift()
        // 运行到内部延时器时，让该类名不能使用
        this.istop = false
      }, 5000)
    }
  }
}
</script>
<style scoped lang='scss'>
.box {
  background-color: antiquewhite;
  padding: 0 10px;
}

.text_item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.line_1 {
  width: calc(100% - 70px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notice-card-wrapper {
  .inner-container {
    margin-left: 100%; // 把文字弄出可见区域
    width: 200%;
    animation: myMove 30s linear infinite; // 重点，定义动画
    animation-fill-mode: forwards;
  }
  /*文字无缝滚动*/
  // @keyframes myMove {
  //   0% {
  //     transform: translateX(0);
  //   }
  //   100% {
  //     transform: translateX(-2500px);
  //   }
  // }
}
</style>

