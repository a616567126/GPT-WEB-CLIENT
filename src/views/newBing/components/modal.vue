<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-23 20:49:05
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-23 21:45:59
 * @FilePath: /chat_gpt/src/views/user/components/modal.vue
-->
<template>
  <el-dialog title="查看加油包"
    :visible.sync="dialogVisible"
    width="500px"
    append-to-body
    :fullscreen="phone"
    :before-close="handleClose">
    <div>
      <div
        class="item_product">
        <div class="label">
          产品名称:
        </div>
        <div class="value">
          {{ obj.productName }}
        </div>
      </div>
      <div
        class="item_product">
        <div class="label">
          加油次数:
        </div>
        <div class="value">
          {{ obj.numberTimes }}
        </div>
      </div>
      <div
        class="item_product">
        <div class="label">
          使用次数:
        </div>
        <div class="value">
          {{ obj.useNumber }}
        </div>
      </div>
      <div
        class="item_product">
        <div class="label">
          是否过期:
        </div>
        <div class="value">
          <el-tag
            :type="obj.state == 0?'scuuess':'danger'">{{ obj.state == 0?'未过期':'已过期' }}</el-tag>
        </div>
      </div>
      <div
        class="item_product">
        <div class="label">
          过期时间
        </div>
        <div class="value">
          {{ obj.expirationDateTime }}
        </div>
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
      phone: false,
      obj: {}
    }
  },
  methods: {
    open(data) {
      this.dialogVisible = true
      this.phone = JSON.parse(window.localStorage.getItem('phone'))
      this.obj = data
      this.obj.expirationDateTime = data.expirationDateTime.substring(0, 10)
    },
    handleClose() {
      this.dialogVisible = false
      this.obj = {}
    }
  }
}
</script>

<style lang="scss" soped>
.item_product {
  display: flex;
  margin: 10px;
  align-items: center;
  .value {
    margin-left: 20px;
  }
}
</style>