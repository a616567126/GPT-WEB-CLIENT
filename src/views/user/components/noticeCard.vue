<!--
 * @Description:: 请补充填写
 * @Version: 1.0
 * @Author: smallWhite
 * @Date: 2023-03-23 14:40:12
 * @LastEditors: smallWhite
 * @LastEditTime: 2023-03-25 19:14:03
 * @FilePath: /chat_gpt/src/views/user/components/noticeCard.vue
-->
<template>
  <div class="mt20">
    <div
      v-if="tableData.length > 0">
      <div class="items"
        :class="{'phone':phone?true:false}"
        v-for="(item,index) in tableData"
        :key="index">
        <div class="date">
          <div class="title">
            {{ item.date }}
          </div>
          <div class="line">
          </div>
          <div class="text">
            {{ item.year }}
          </div>
        </div>
        <div class="tbodys">
          <div class="title">
            {{ item.title }}
          </div>
          <div
            class="contentes">
            {{item.content  }}
          </div>
          <div>
            <el-button
              @click="$refs.show.open(item)"
              type="text">查看全文
              <i
                class="el-icon-right"></i></el-button>
          </div>
        </div>
      </div>
      <div class="pagination">
        <el-pagination
          style="margin-top:20px"
          :current-page="pageNumer"
          :page-size="pageSize"
          :background="true"
          layout="total, prev, pager, next"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <el-card v-else>
      <el-empty
        description="暂无数据" />
    </el-card>
    <noticeModal ref="show">
    </noticeModal>
  </div>
</template>

<script>
import noticeModal from './noticeModal.vue'
export default {
  props: {
    // eslint-disable-next-line vue/require-valid-default-prop
    tableData: { type: Array, default: [] },
    pageSize: { type: Number, default: 10 },
    pageNumer: { type: Number, default: 1 },
    total: { type: Number, default: 0 },
    phone: { type: Boolean, default: false }
  },
  components: { noticeModal },
  methods: {
    // 修改翻页
    handleSizeChange(e) {
      this.$emit('changePage', {
        pageNumer: this.pageNumer,
        pageSize: e
      })
    },
    // 设置每页条数
    handleCurrentChange(e) {
      this.$emit('changePage', {
        pageNumer: e,
        pageSize: this.pageSize
      })
    }
  }
}
</script>


<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: end;
}
.items.phone {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d9d99d;
  height: 120px;
  width: 100%;
  .date {
    flex-grow: 1;
    width: 100px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 100px;
    border-right: 1px solid #d9d99d;
    .title {
      font-size: 24px;
      height: 70px;
    }
    .line {
      width: 30px;
      height: 2px;
      background: #000;
      margin-left: -35px;
    }
    .text {
      line-height: 60px;
      font-size: 20px;
      margin-left: -20px;
    }
  }
  .tbodys {
    width: calc(100% - 100px);
    padding: 20px;
    flex-grow: 1;
    .title {
      height: 30px;
      font-size: 18px;
      font-weight: bold;
    }
    .contentes {
      margin-top: 10px;
      height: 50px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-size: 15px;
      color: #555;
    }
  }
}
.items {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d9d99d;
  height: 200px;
  width: 100%;
  .date {
    flex-grow: 1;
    width: 200px;
    display: flex;
    flex-flow: column;
    justify-content: center;
    align-items: center;
    height: 180px;
    border-right: 1px solid #d9d99d;
    .title {
      font-size: 24px;
      height: 70px;
    }
    .line {
      width: 30px;
      height: 2px;
      background: #000;
      margin-left: -35px;
    }
    .text {
      line-height: 60px;
      font-size: 20px;
      margin-left: -20px;
    }
  }
  .tbodys {
    width: calc(100% - 200px);
    padding: 20px;
    flex-grow: 1;
    .title {
      height: 50px;
      font-size: 18px;
      font-weight: bold;
    }
    .contentes {
      margin-top: 10px;
      height: 90px;
      line-height: 24px;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 4;
      overflow: hidden;
      font-size: 15px;
      color: #555;
    }
  }
}
.items:last-child {
  border-bottom: 0px solid #d9d99d;
}
</style>
