<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-04-21 15:45:21
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-21 16:26:08
 * @FilePath: /chat_gpt/src/views/user/components/qrcode.vue
-->
<template>
  <el-dialog title="微信支付"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">

    <div class="bodys">
      <div id="qrCode"
        ref="qrCodeDiv">

      </div>
      <img
        src="@/assets/wxpay.png"
        class="exm">
      <div
        style="width: 200px;margin-top: 20px;text-align: center;">
        {{ text }}</div>
    </div>
    <div
      style="color:red;margin-top: 20px; text-align: center;">
      支付完成后请关闭支付窗口！
    </div>
    <span slot="footer"
      class="dialog-footer">
      <el-button
        @click="handleClose">关
        闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'qrCode',
  data() {
    return {
      dialogVisible: false,
      text: ''
    }
  },
  methods: {
    open(data) {
      this.dialogVisible = true
      this.text = `支付金额：${data.price}`
      this.$nextTick(() => {
        this.bindQRCode(data.codeUrl)
      })
    },
    handleClose() {
      this.dialogVisible = false
      this.$emit('handleClose')
    },
    bindQRCode(text) {
      new QRCode(this.$refs.qrCodeDiv, {
        text: text,
        width: 200,
        height: 200,
        colorDark: '#333333', //二维码颜色
        colorLight: '#ffffff', //二维码背景色
        correctLevel: QRCode.CorrectLevel.Q //容错率，L/M/H
      })
    }
  }
}
</script>

<style>
.bodys {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-flow: column;
}
.qrCode {
  position: relative;
}
.exm {
  width: 150px;
  margin-top: 10px;
  /* width: 50px;
  height: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -25px;
  margin-top: -60px; */
}
</style>