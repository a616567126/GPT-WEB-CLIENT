<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-25 16:21:08
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-25 19:22:08
 * @FilePath: /chat_gpt/src/views/user/notice.vue
-->
<template>
  <div class="contentes">
    <div class="product_box"
      :class="{'pc':phone?false:true}">
      <el-tabs
        v-model="activeName"
        type="border-card"
        @tab-click="handleClick">
        <el-tab-pane
          label="公告" name="1">
          <noticeCard
            :phone="phone"
            v-if="activeName == '1'"
            :pageNumber="pageNumber"
            :pageSize="pageSize"
            :total="total"
            @changePage="changePage"
            :tableData="tableData">
          </noticeCard>
        </el-tab-pane>
        <el-tab-pane
          label="指南" name="2">
          <noticeCard
            v-if="activeName == '2'"
            :phone="phone"
            :pageNumber="pageNumber"
            :pageSize="pageSize"
            :total="total"
            @changePage="changePage"
            :tableData="tableData">
          </noticeCard>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import noticeCard from './components/noticeCard.vue'
export default {
  components: { noticeCard },
  data() {
    return {
      phone: false,
      activeName: '1',
      pageSize: 10,
      total: 0,
      pageNumber: 1,
      tableData: []
    }
  },
  mounted() {
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    this.getData()
  },
  methods: {
    handleClick() {
      this.getData()
    },
    // 翻页
    changePage(data) {
      this.pageNumer = data.pageNumer
      this.pageSize = data.pageSize
      this.getData()
    },
    getData() {
      this.$https('NOTICELIST', {
        type: this.activeName,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      }).then(res => {
        this.tableData = res.data.productPage.records
        this.tableData.map(item => {
          this.$set(item, 'year', item.createTime.substring(0, 4))
          this.$set(item, 'date', item.createTime.substring(5, 11))
        })
        this.total = parseInt(res.data.productPage.total)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.contentes {
  padding: 20px;
  overflow-y: auto;
  width: 100%;
  height: calc(100vh - 60px);
  .product_box.pc {
    max-width: 1400px;
  }
  .product_box {
    background: #fff;
    max-width: 90vw;
    margin: 0 auto;
  }
}
</style>