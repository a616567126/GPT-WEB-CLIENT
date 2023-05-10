<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-04-22 16:23:31
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-05-09 14:06:14
 * @FilePath: /chat_gpt/src/views/fsPage/pictureandpicture.vue
-->
<template>
  <div class="fs_page">
    <el-row :gutter="20">
      <el-col :lg="12">
        <el-card
          style="margin-bottom: 10px; ">
          <div class="flex">
            <div
              class="img_box">
              <input
                type="file"
                class="upload_btn"
                @change="handleFileChange" />
              <div
                class="avatar">
                <img
                  v-if="imageUrl"
                  :src="imageUrl"
                  class="avatars">
                <i v-else
                  class="el-icon-plus avatar-uploader-icon"></i>
              </div>
            </div>
            <div class="boxs">
              <div
                class="item">
                <el-input
                  placeholder="提示词"
                  style="width: 100%;"
                  v-model="form.prompt"></el-input>
                <div
                  style="margin-top: 10px;">
                  <el-input
                    placeholder="负面提示词"
                    v-model="form.negativePrompts"></el-input>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="12">
        <el-card
          style="margin-bottom: 10px; height: 142px;">
          <div slot="header">
            采样方法
          </div>
          <el-select
            v-model="form.sampler"
            style="width: 100%;">
            <el-option
              v-for="(item,index) in SamplingList"
              :key="index"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-card>
      </el-col>

      <el-col :lg="6">
        <el-card
          style="margin: 10px 0;height: 142px;">
          <div slot="header">
            随机种子
          </div>
          <el-input
            v-model="form.seed"
            placeholder="请输入"></el-input>
        </el-card>

      </el-col>
      <el-col :lg="6">
        <el-card
          style="margin: 10px 0;height: 142px;">
          <div slot="header">
            图片风格
          </div>
          <el-select
            filterable
            v-model="form.style"
            style="width: 100%;">
            <el-option
              v-for="(item,index) in StyleList"
              :key="index"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-card>
      </el-col>
      <el-col :lg="6">
        <el-card
          style="margin: 10px 0;height: 142px;">
          <div slot="header">
            宽度
            <span
              style="float: right;">{{ form.width }}</span>
          </div>
          <el-slider
            v-model="form.width"
            :max="768"></el-slider>
        </el-card>
      </el-col>
      <el-col :lg="6">
        <el-card
          style="margin: 10px 0;height: 142px;">
          <div slot="header">
            高度
            <span
              style="float: right;">{{ form.height }}</span>
          </div>
          <el-slider
            v-model="form.height"
            :max="768"></el-slider>
        </el-card>
      </el-col>
      <el-col :lg="6">
        <el-card
          style="margin: 10px 0;height: 142px;">
          <div slot="header">
            制导比例
            <span
              style="float: right;">{{ form.guidanceScale }}</span>
          </div>
          <el-slider
            :step="'0.5'"
            v-model="form.guidanceScale"
            :max="20"></el-slider>
        </el-card>
      </el-col>
      <el-col :lg="6">
        <el-card
          style="margin: 10px 0;height: 142px;">
          <div slot="header">
            降噪步数
            <span
              style="float: right;">{{ form.steps }}</span>
          </div>
          <el-slider
            :max="100"
            :min="10"
            v-model="form.steps"></el-slider>
        </el-card>
      </el-col>
      <el-col :lg="6">
        <el-card
          style="margin: 10px 0;height: 142px;">
          <div slot="header">
            是否禁用
          </div>
          <el-select
            v-model="form.upsample"
            style="width: 100%;">
            <el-option
              label="禁用"
              value="1"></el-option>
            <el-option
              label="启用"
              value="2"></el-option>
          </el-select>
        </el-card>
      </el-col>
      <el-col :lg="6">
        <el-card
          style="margin: 10px 0;height: 142px;">
          <div slot="header">
            渲染图片
          </div>
          <el-select
            filterable
            v-model="form.controlnetTask"
            style="width: 100%;">
            <el-option
              v-for="(item,index) in controlnetTaskList"
              :key="index"
              :label="item"
              :value="item"></el-option>
          </el-select>
        </el-card>
      </el-col>
      <el-col :lg="18">
        <el-card
          style="min-height:294px;margin-top: 10px;overflow-y: auto;">
          <el-card
            style="float:left;margin:5px"
            v-for="(item,index) in imgList"
            :key="index">
            <img :src="item"
              style="width: 100%;height: 100%;">
          </el-card>
          <i v-if="imgList.length == 0"
            class="el-icon-picture"
            style="font-size: 24px;"></i>
        </el-card>
      </el-col>
      <el-col :lg="6">
        <el-card
          style="height:294px;width:100%;margin-top: 10px; line-height: 240px;">
          <el-button
            size="large"
            type="primary"
            @click="createImg"
            style="height:80px; width: 100%;">生成图片</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      imageUrl: '',
      action: '',

      basedata: [],
      headers: {},
      fileData: [],
      form: {
        filename: '',
        prompt: '',
        negativePrompts: '',
        sampler: 'dpm',
        guidanceScale: 7.5,
        width: 512,
        height: 512,
        seed: 50,
        steps: 50,
        style: '',
        upsample: '2',
        controlnetTask: ''
      },
      SamplingList: ['ddim', 'lmsd', 'pndm', 'euler_d', 'euler_a_d', 'dpm'],
      imgList: [],
      StyleList: [
        '国画',
        '写实主义',
        '虚幻引擎',
        '黑白插画',
        '版绘',
        '低聚',
        '工业霓虹',
        '电影艺术',
        '史诗大片',
        '暗黑',
        '涂鸦',
        '漫画场景',
        '特写',
        '儿童画',
        '油画',
        '水彩画',
        '素描',
        '卡通画',
        '浮世绘',
        '赛博朋克',
        '吉卜力',
        '哑光',
        '现代中式',
        '相机',
        'CG渲染',
        '动漫',
        '霓虹游戏',
        '蒸汽波',
        '宝可梦',
        '火影忍者',
        '圣诞老人',
        '个人特效',
        '通用漫画',
        'Momoko',
        'MJ风格',
        '剪纸',
        '齐白石',
        '张大千',
        '丰子恺',
        '毕加索',
        '梵高',
        '塞尚',
        '莫奈',
        '马克·夏加尔',
        '丢勒',
        '米开朗基罗',
        '高更',
        '爱德华·蒙克',
        '托马斯·科尔',
        '安迪·霍尔',
        '新海诚',
        '倪传婧',
        '村上隆',
        '黄光剑',
        '吴冠中',
        '林风眠',
        '木内达朗',
        '萨雷尔',
        '杜拉克',
        '比利宾',
        '布拉德利',
        '普罗旺森',
        '莫比乌斯',
        '格里斯利',
        '比普',
        '卡尔·西松',
        '玛丽·布莱尔',
        '埃里克·卡尔',
        '扎哈·哈迪德',
        '包豪斯',
        '英格尔斯',
        'RHADS',
        '阿泰·盖兰',
        '俊西',
        '坎皮恩',
        '德尚鲍尔',
        '库沙特',
        '雷诺阿'
      ],
      controlnetTaskList: [
        'depth',
        'depth-from-image',
        'canny',
        'canny-from-image',
        'hed',
        'hed-from-image',
        'mlsd',
        'mlsd-from-image',
        'normal',
        'normal-from-image',
        'pose',
        'pose-from-image',
        'scribble',
        'scribble-from-image',
        'seg',
        'seg-from-image'
      ]
    }
  },
  mounted() {
    this.getLink()
  },
  methods: {
    getLink() {
      this.$https('UPLOADIMG', {}).then(res => {
        this.headers = res.data.headers
        this.action = res.data.url
        this.form.filename = res.data.filename
      })
    },
    handleFileChange(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      this.imageUrl = URL.createObjectURL(file)
      reader.onload = event => {
        const result = event.target.result
        this.fileData = result.split(',') // 将文件数据保存到 Vue 实例中
        this.upload(this.fileData)
      }
      reader.readAsText(file)
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
    createImg() {
      this.imgList = []
      if (this.form.prompt) {
        this.$https('PICANDPIC', this.form).then(res => {
          if (res.code == '50000') {
            this.$message.error(res.msg)
          } else {
            this.imgList = res.data
          }
        })
      } else {
        this.$message.error('请输入正面提示词')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fs_page {
  width: calc(100% - 40px);
  padding: 20px;
  height: calc(100vh - 180px);
  overflow-y: auto;
  .flex {
    display: flex;
    width: 100%;
    flex-grow: 1;
  }
  .boxs {
    display: flex;
    margin-left: 20px;
    justify-content: center;
    align-items: center;
    width: 100%;
    .item {
      width: 100%;
    }
    .items {
      width: 150px;
      text-align: center;
      margin-left: 20px;
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
</style>
<style lang="scss" scoped>
.img_box {
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px dotted #d9d9d9;
  border-radius: 5px;
  overflow: hidden;
  .upload_btn {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 3;
    opacity: 0;
    cursor: pointer;
  }
  .avatar {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .avatar-uploader-icon {
      font-size: 30px;
      color: #666666;
    }
  }
}
</style>