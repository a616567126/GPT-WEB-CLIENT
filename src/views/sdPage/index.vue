<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-04-22 16:23:31
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-04-23 13:18:47
 * @FilePath: /chat_gpt/src/views/sdPage/index.vue
-->
<template>
  <div class="sd_page">
    <el-card>
      <div slot="header">
        txt2img
      </div>
      <div class="boxs">
        <div class="item">
          <el-input
            type="textarea"
            placeholder="Prompt (press Ctrl+Enter or Alt+Enter to generate)"
            style="width: 100%;"
            v-model="form.prompt"></el-input>
        </div>
        <div class="items">
          <span class="btn"
            @click="createImg">
            Generate
          </span>
        </div>
      </div>
      <div class="boxs"
        style="margin-top: 10px;">
        <el-input
          type="textarea"
          placeholder="Negative prompt (press Ctrl+Enter or Alt+Enter to generate)"
          v-model="form.negativePrompt"></el-input>
      </div>
      <el-row :gutter="20">
        <el-col :lg="12">
          <el-card
            style="margin: 10px 0;height: 142px;">
            <div
              slot="header">
              Sampling method
            </div>
            <el-select
              v-model="form.samplerIndex"
              style="width: 100%;">
              <el-option
                v-for="(item,index) in SamplingList"
                :key="index"
                :label="item"
                :value="item"></el-option>
            </el-select>
          </el-card>
        </el-col>
        <el-col :lg="12">
          <el-card
            style="margin: 10px 0;height: 142px;">
            <div
              slot="header">
              Sampling steps
              <span
                style="float: right;">{{ form.steps }}</span>
            </div>
            <el-slider
              disabled
              v-model="form.steps"
              :max="100"></el-slider>
          </el-card>
        </el-col>
        <el-col :lg="6">
          <el-card
            style="margin: 10px 0;height: 142px;">
            <div
              slot="header">
              width
              <span
                style="float: right;">{{ form.width }}</span>
            </div>
            <el-slider
              disabled
              v-model="form.width"
              :max="1000"></el-slider>
          </el-card>
        </el-col>
        <el-col :lg="6">
          <el-card
            style="margin: 10px 0;height: 142px;">
            <div
              slot="header">
              height
              <span
                style="float: right;">{{ form.height }}</span>
            </div>
            <el-slider
              disabled
              v-model="form.height"
              :max="1000"></el-slider>
          </el-card>
        </el-col>
        <el-col :lg="6">
          <el-card
            style="margin: 10px 0;height: 142px;">
            <div
              slot="header">
              Batch size
              <span
                style="float: right;">{{ form.batchSize }}</span>
            </div>
            <el-slider
              :max="10"
              disabled
              v-model="form.batchSize"></el-slider>
          </el-card>
        </el-col>
        <el-col :lg="6">
          <el-card
            style="margin: 10px 0;height: 142px;">
            <div
              slot="header">
              CFG Scale
              <span
                style="float: right;">{{ form.cfgScale }}</span>
            </div>
            <el-slider
              :max="10"
              disabled
              v-model="form.cfgScale"></el-slider>
          </el-card>
        </el-col>
        <el-col :lg="12">
          <el-card
            style="margin: 10px 0;height: 142px;">
            <div
              slot="header">
              Seed
            </div>
            <el-input
              v-model="form.seed"
              placeholder="请输入"></el-input>
          </el-card>
          <el-card
            style="margin: 10px 0;height: 142px;">
            <div
              slot="header">
              ETA
            </div>
            <el-input
              v-model="form.eta"
              placeholder="请输入"></el-input>
          </el-card>
        </el-col>
        <el-col :lg="12">
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
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SamplingList: [
        'Euler a',
        'Euler',
        'LMS',
        'Heun',
        'DPM2',
        'DPM2 a',
        'DPM++ 2S a',
        'DPM++ 2M',
        'DPM++ SDE',
        'DPM fast',
        'DPM adaptive',
        'LMS Karras',
        'DPM2 Karras',
        'DPM2 a Karras',
        'DPM++ 2S a Karras',
        'DPM++ 2M Karras',
        'DPM++ SDE Karras',
        'DDIM',
        'PLMS',
        'UniPC'
      ],
      imgList: [],
      form: {
        prompt: '',
        negativePrompt: '',
        samplerIndex: '',
        steps: 20,
        width: 512,
        height: 512,
        batchSize: 1,
        cfgScale: 7,
        seed: -1,
        eta: 1
      }
    }
  },
  methods: {
    createImg() {
      this.imgList = []
      if (this.form.prompt) {
        this.$https('CREATESD', this.form).then(res => {
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
.sd_page {
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
</style>