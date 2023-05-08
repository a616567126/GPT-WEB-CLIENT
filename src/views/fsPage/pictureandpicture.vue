<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-04-22 16:23:31
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-05-08 10:14:39
 * @FilePath: /chat_gpt/src/views/fsPage/pictureandpicture.vue
-->
<template>
  <div class="fs_page">
    <el-card>
      <el-upload
        class="avatar-uploader"
        :show-file-list="false"
        :action="action"
        :auto-upload="false"
        :on-change="handleChange">
        <img v-if="imageUrl"
          :src="imageUrl"
          class="avatar">
        <i v-else
          class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-button
        @click="upload">上传</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      imageUrl: '',
      action: '',
      filename: '',
      basedata: [],
      headers: {}
    }
  },
  created() {
    this.headers.token = window.localStorage.getItem('token')
  },
  mounted() {
    this.getLink()
  },
  methods: {
    getLink() {
      this.$https('UPLOADIMG', {}).then(res => {
        this.headers = res.data.headers
        console.log(this.headers, '0000')
        this.action = res.data.url
        this.filename = res.data.filename
      })
    },
    handleChange(file) {
      console.log(file)

      this.imageUrl = URL.createObjectURL(file.raw)
      const reader = new FileReader()
      reader.readAsArrayBuffer(file.raw)
      reader.onload = function (e) {
        console.log(e.target.result)
        window.localStorage.setItem('arr', JSON.stringify(e.target.result))
      }
      setTimeout(() => {
        console.log(window.localStorage.getItem(arr))
        // this.upload(JSON.parse(window.localStorage.getItem(arr)))
      }, 1000)
    },
    upload(data) {
      axios({
        method: 'put', //请求方法
        data: data,
        url: this.action,
        headers: this.headers
      }).then(res => {
        console.log(res, '----------')
        //执行成功后代码处理
      })
    },
    getBase64(file) {
      return new Promise(function (resolve, reject) {
        let reader = new FileReader()
        let imgResult = ''
        reader.readAsDataURL(file)
        reader.onload = function () {
          imgResult = reader.result
        }
        reader.onerror = function (error) {
          reject(error)
        }
        reader.onloadend = function () {
          resolve(imgResult)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.fs_page {
  width: calc(100% - 40px);
  padding: 20px;
  height: calc(100vh - 60px);
  overflow-y: auto;
  .boxs {
    display: flex;
    justify-content: center;
    align-items: center;
    .item {
      width: 100%;
      margin-right: 10px;
    }
    .items {
      width: 150px;
      text-align: center;
      .btn {
        display: inline-block;
        width: 100%;
        text-align: center;
        margin-right: 10px;
        color: #fff;
        background: orange;
        height: 54px;
        line-height: 54px;
        border-radius: 6px;
        cursor: pointer;
      }
      .btn:hover {
        background: rgba(255, 166, 0, 0.904);
      }
    }
  }
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>