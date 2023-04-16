<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-04-16 18:55:34
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-16 20:01:02
 * @FilePath: /chat_gpt/src/views/components/account.vue
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
          placeholder="请输入账号"
          v-model="regform.mobile"></el-input>
      </el-form-item>
      <el-form-item
        prop="password">
        <el-input :type="type"
          prefix-icon="el-icon-s-goods"
          placeholder="请输入密码"
          v-model="regform.password">
          <i slot="suffix"
            @click="type == 'password'? type ='text':type ='password'"
            class="el-input__icon el-icon-view"></i>
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
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      regform: {
        name: '',
        mobile: '',
        password: '',
        msgCode: '1000'
      },
      type: 'password',
      regrules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { max: 8, min: 2, message: '不能超过8个字符', trigger: 'blur' }
        ],
        mobile: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      }
    }
  },
  methods: {
    reglogin() {
      this.$refs.regform.validate(valid => {
        if (valid) {
          this.$emit('reglogin', this.regform)
        }
      })
    }
  }
}
</script>

<style>
</style>