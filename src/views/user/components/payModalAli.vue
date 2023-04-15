<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-23 20:49:05
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-15 20:09:34
 * @FilePath: /chat_gpt/src/views/user/components/payModalAli.vue
-->
<template>
  <el-dialog title="支付宝支付"
    :visible.sync="dialogVisible"
    :width="width"
    :fullscreen="phone"
    :before-close="handleClose">
    <el-form :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      :label-position="position"
      label-width="100px"
      class="demo-ruleForm">
      <el-form-item
        label="购买数量"
        prop="payNumber">
        <el-input
          type="Number"
          v-model="ruleForm.payNumber"></el-input>
      </el-form-item>
      <el-form-item
        label="支付方式"
        prop="type">
        <el-select
          v-model="ruleForm.type"
          style="width:100%"
          disabled
          placeholder="请选择支付方式">
          <el-option
            v-for="item in options"
            :key="item.type"
            :label="item.name"
            :value="item.type">
            <div
              style="display: flex;
          align-items: center;">
              <img
                style="width: 20px;height: 20px;margin-right: 20px;"
                :src="item.icon">
              <div>
                {{ item.name }}
              </div>
            </div>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer"
      class="dialog-footer">
      <el-button
        @click="handleClose">取消</el-button>
      <el-button
        type="primary"
        @click="handleSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      position: 'right',
      ruleForm: {
        payNumber: 1,
        type: 'alipay'
      },
      rules: {
        payNumber: [{ required: true, message: '请输入购买数量', trigger: 'blur' }],
        type: [{ required: true, message: '请选择支付方式', trigger: 'change' }]
      },
      width: '400px',
      phone: false,
      options: [
        {
          icon: require('@/assets/qq.png'),
          name: 'QQ钱包',
          type: 'qqpay'
        },
        {
          icon: require('@/assets/wx.png'),
          name: '微信支付',
          type: 'wxpay'
        },
        {
          icon: require('@/assets/pay.png'),
          name: '支付宝支付',
          type: 'alipay'
        }
      ]
    }
  },
  methods: {
    open(data) {
      this.dialogVisible = true
      this.ruleForm.productId = data.id
      this.phone = JSON.parse(window.localStorage.getItem('phone'))
      this.position = this.phone ? 'top' : 'right'
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.dialogVisible = false
      this.ruleForm = {
        payNumber: 1,
        type: 'alipay',
        productId: ''
      }
    },
    handleSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          console.log(this.ruleForm)
          this.$emit('AlipayType', this.ruleForm)
          this.handleClose()
        }
      })
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