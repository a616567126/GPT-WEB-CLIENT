<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-04-22 16:23:31
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-05-09 14:41:12
 * @FilePath: /chat_gpt/src/views/fsPage/index.vue
-->
<template>
  <div class="fs_page">
    <el-tabs
      v-model="activeName">
      <el-tab-pane label="文生图"
        name="1">
        <textandpicture>
        </textandpicture>
      </el-tab-pane>
      <!-- <el-tab-pane label="图生图"
        name="2">
        <pictureandpicture>
        </pictureandpicture>
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import textandpicture from './textandpicture.vue'
import pictureandpicture from './pictureandpicture.vue'
export default {
  components: { textandpicture, pictureandpicture },
  data() {
    return {
      activeName: '1'
    }
  },

  methods: {}
}
</script>
<style>
.fs_page {
  width: calc(100% - 40px);
}
</style>
