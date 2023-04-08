<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-25 15:16:43
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-06 14:49:41
 * @FilePath: /chat_gpt/src/layout/mainUser.vue
-->
<template>
  <div class="content">
    <div class="header">
      <div class="icon"
        v-if="phone && ($route.path == '/' || $route.path == '/scoket' )">
        <i style="font-size: 20px;color:#999999"
          class="el-icon-s-fold"
          @click="toggle"></i>
      </div>
      <div class="center"
        style="padding-left: 20px;">
        <el-button
          v-if="$route.path !== '/'"
          type="text"
          @click="$router.push('/')"><i
            class="el-icon-arrow-left"></i>
          返回</el-button>
        <span
          style="margin-left: 20px;">{{ $route.meta.title }}</span>
      </div>
      <div class="rights">
        <span
          @click="$refs.layout.open()">
          <el-avatar
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"></el-avatar>
        </span>
      </div>
    </div>
    <router-view></router-view>
    <LayOut ref="layout">
    </LayOut>
  </div>
</template>

<script>
import LayOut from './layOut.vue'
export default {
  components: { LayOut },
  data() {
    return {
      phone: false,
      show: false
    }
  },
  mounted() {
    console.log(this.$route.path)
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
  },
  methods: {
    toggle() {
      this.show = !this.show
      this.$store.commit('SET_OPEN', this.show)
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  background: #f5f5f5;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  align-items: center;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 60px;
    background: #ffffff;
    .icon {
      margin-left: 20px;
      width: 20px;
    }
    .center {
      width: calc(100% - 110px);
      text-align: left;
    }
    .rights {
      width: 40px;
      margin-right: 10px;
    }
  }
}
</style>