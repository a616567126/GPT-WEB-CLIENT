<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-23 20:49:05
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-25 19:24:07
 * @FilePath: /chat_gpt/src/views/user/components/noticeModal.vue
-->
<template>
  <el-dialog
    :title="obj.title"
    :visible.sync="dialogVisible"
    :width="width"
    :fullscreen="phone"
    :before-close="handleClose">
    <el-row :gutter="30">
      <el-col :md="6"
        :sm="12">
        <span
          class="gary_text">{{ obj.createTime }}</span>
      </el-col>
      <!-- <el-col :md="6"
        :sm="12">
        <span
          class="gary_text">发布人:{{ obj.createName }}</span>
      </el-col> -->
    </el-row>
    <div
      class="modal_content">
      <div
        style="margin-top: 30px;"
        v-html="obj.content">
      </div>
    </div>
    <span slot="footer"
      class="dialog-footer">
      <el-button
        @click="handleClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      obj: {},
      width: '800px',
      phone: false
    }
  },
  methods: {
    open(data) {
      this.dialogVisible = true
      this.phone = JSON.parse(window.localStorage.getItem('phone'))
      this.obj = data
    },
    handleClose() {
      this.dialogVisible = false
      this.obj = {}
    }
  }
}
</script>

<style lang="scss" scoped>
.gary_text {
  color: #555555;
  font-size: 14px;
}
.modal_content {
  height: 55vh;
  overflow-y: auto;
}
</style>