<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-04-16 18:55:34
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-23 16:23:06
 * @FilePath: /chat_gpt/src/views/components/mailcode.vue
-->
<template>
  <div>
    <el-form :model="regform"
      :rules="regrules"
      ref="regform"
      label-width="0px"
      class="demo-ruleForm">
      <el-form-item
        prop="name">
        <el-input
          prefix-icon="el-icon-user-solid"
          placeholder="请输入姓名"
          v-model="regform.name"></el-input>
      </el-form-item>
      <el-form-item
        prop="mobile">
        <el-input
          prefix-icon="el-icon-mobile-phone"
          placeholder="请输入手机号"
          v-model="regform.mobile"></el-input>
      </el-form-item>
      <el-form-item
        prop="email">
        <el-input
          prefix-icon="el-icon-message"
          placeholder="请输入邮箱"
          v-model="regform.email"></el-input>
      </el-form-item>
      <el-form-item
        prop="emailCode">
        <el-input
          prefix-icon="el-icon-folder-checked"
          placeholder="请输入验证码"
          v-model="regform.emailCode">
          <el-button
            slot="append"
            @click="getCode"
            :disabled="disabled"
            type="primary">{{ codeText }}</el-button>
        </el-input>
      </el-form-item>
      <el-form-item
        style="margin-bottom: 0;">
        <el-button
          type="primary"
          @click="reglogin"
          style="width:100%">
          注册</el-button>
      </el-form-item>
      <div v-if="message"
        style="color:green;font-size: 13px;text-align: center; margin-top: 5px;">
        {{ message }},请登录邮箱查看验证码
      </div>
    </el-form>
    <SlideVerify
      @success="success"
      v-if="showSlide">
    </SlideVerify>
  </div>
</template>

<script>
import SlideVerify from '@/components/SlideVerify/index.vue'
export default {
  components: { SlideVerify },
  data() {
    return {
      regform: {
        name: '',
        mobile: '',
        email: '',
        emailCode: ''
      },
      message: '',
      disabled: false,
      timer: null,
      showSlide: false,
      codeText: '获取验证码',
      regrules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
        emailCode: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { max: 11, min: 11, message: '手机号格式错误', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    getCodes() {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.time = TIME_COUNT
        this.disabled = true
        this.timer = setInterval(() => {
          if (this.time > 0 && this.time <= TIME_COUNT) {
            this.time--
            this.codeText = this.time + 's后获取'
          } else {
            this.disabled = false
            this.codeText = '获取验证码'
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    getCode() {
      if (this.regform.email) {
        this.showSlide = true
      } else {
        this.$message.warning('请输入邮箱')
      }
    },
    reglogin() {
      this.$refs.regform.validate(valid => {
        if (valid) {
          this.$emit('regloginMail', this.regform)
        }
      })
    },
    success(data) {
      this.showSlide = false
      this.getCodes()
      this.$https('SENDMAILCODE', {
        email: this.regform.email
      }).then(res => {
        if (res.status != 200) {
          this.message = res.msg
          this.$message.error(res.msg)
        } else {
          this.message = '发送成功！'
          this.$message.success('发送成功！')
        }
      })
    }
  }
}
</script>

<style>
</style>