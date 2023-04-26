<template>
  <div class="contentes">
    <el-card
      class="product_box"
      :class="{'pc':phone?false:true}">
      <div>商品列表</div>
      <el-row :gutter="20">
        <el-col :md="8"
          :sm="12" :xs="24"
          v-for="(item,index) in list"
          :key="index">
          <el-card
            class="cards"
            @click="openPay(item,1)"
            :style="{'background':item.type == 0 ?'rgba(255,0,0,.05)':(item.type == 1?'rgba(0,255,0,.05)':'rgba(255,168,0,.05)')}">
            <div
              class="item name"
              :style="{'background-color':item.type == 0 ?'rgba(255,0,0,.8)':(item.type == 1?'rgba(0,255,0,.8)':'rgba(255,168,0,.8)'),'font-size':'12px'}">
              {{ item.name }}(剩余:
              {{  item.stock}})
            </div>
            <div
              style="display: flex;justify-content: center;align-items: center;">
              <div
                @click="openPay(item,2)"
                class="item price"
                :style="{'color':item.type == 0 ?'red':(item.type == 1?'green':'orange')}">
                ￥{{ item.price }}
              </div>
              <div
                @click="openPay(item,2)"
                class="item wd"
                v-if="item.type !== 1">
                {{ item.numberTimes }}次问答
              </div>
              <div
                @click="openPay(item,2)"
                class="item wd"
                v-if="item.type == 1">
                上限{{ item.monthlyNumber }}次问答
              </div>
            </div>

            <div
              @click="openPay(item,2)"
              class="item remark"
              style="font-size: 12px;"
              v-if="item.type == 2">
              仅限月卡用户使用，有效期一天
            </div>
            <div class="ceng"
              @click="openPay(item,1)">
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <form id='paying'
      :action='url'
      method='post'>
      <input type='hidden'
        name='money'
        :value='form.money' />
      <input type='hidden'
        name='name'
        :value='form.name' />
      <input type='hidden'
        name='notify_url'
        :value='form.notify_url' />
      <input type='hidden'
        name='out_trade_no'
        :value='form.out_trade_no' />
      <input type='hidden'
        name='pid'
        :value='form.pid' />
      <input type='hidden'
        name='return_url'
        :value='form.return_url' />
      <input type='hidden'
        name='type'
        :value='form.type' />
      <input type='hidden'
        name='sign_type'
        :value='form.sign_type' />
      <input type='hidden'
        name='sign'
        :value='form.sign' />
      <input type='submit'
        v-show=" false"
        value='正在跳转'>
    </form>
    <el-card
      style="margin-top: 20px;"
      class="product_box"
      :class="{'pc':phone?false:true}">
      <div
        style="margin-bottom: 10px;">
        订单列表</div>
      <el-table v-if="!phone"
        :header-cell-style="{
        background: '#EEF1F6',
        color: 'rgba(41,44,53,0.7)',
      }" :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="订单编号">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="price"
          label="价格">
        </el-table-column>
        <el-table-column
          prop="payType"
          label="支付方式">
        </el-table-column>
        <el-table-column
          label="支付状态">
          <template
            slot-scope="scope">
            <span
              v-if="scope.row.state == '0'">
              <el-tag
                type="info">待支付</el-tag>
            </span>
            <span
              v-else-if="scope.row.state == '1'">
              <el-tag
                type="success">支付完成</el-tag>
            </span>
            <span
              v-else-if="scope.row.state == '2'">
              <el-tag
                type="danger">支付失败</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          width="180"
          label="支付时间">
        </el-table-column>
      </el-table>
      <div v-if="phone">
        <el-card
          :body-style="{ padding: '0px' }"
          v-for="(item,index) in tableData"
          :key="index"
          class="cardss">
          <div
            class="card_body">
            <div
              class="items">
              <div
                class="label">
                订单编号：
              </div>
              <div
                class="value">
                {{ item.id }}
              </div>
            </div>
            <div
              class="items">
              <div
                class="label">
                订单名称：
              </div>
              <div
                class="value">
                {{ item.productName }}
              </div>
            </div>
            <div
              class="items">
              <div
                class="label">
                商品价格：
              </div>
              <div
                class="value">
                {{ item.price }}
              </div>
            </div>
            <div
              class="items">
              <div
                class="label">
                支付方式：
              </div>
              <div
                class="value">
                <span
                  v-if="item.payType == 'alipay'">支付宝支付</span>
                <span
                  v-else-if="item.payType == 'wxpay'">微信支付</span>
                <span
                  v-else-if="item.payType == 'qqpay'">QQ钱包</span>
              </div>
            </div>
            <div
              class="items">
              <div
                class="label">
                支付状态：
              </div>
              <div
                class="value">
                <span
                  v-if="item.state == '0'">
                  <el-tag
                    size="mini"
                    type="info">待支付</el-tag>
                </span>
                <span
                  v-else-if="item.state == '1'">
                  <el-tag
                    size="mini"
                    type="success">支付完成</el-tag>
                </span>
                <span
                  v-else-if="item.state == '2'">
                  <el-tag
                    size="mini"
                    type="danger">支付失败</el-tag>
                </span>
              </div>
            </div>
            <div
              class="items">
              <div
                class="label">
                支付时间：
              </div>
              <div
                class="value">
                {{ item.createTime }}
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-card>
    <PayModal ref="showPay"
      @payType="payFun">
    </PayModal>
    <AliPayModal
      ref="showAliPay"
      @AlipayType="AlipayType">
    </AliPayModal>
    <Qrcode ref="qrcode"
      @handleClose="handleClose">
    </Qrcode>
  </div>
</template>

<script>
import PayModal from './components/payModal.vue'
import AliPayModal from './components/payModalAli.vue'
import Qrcode from './components/qrcode.vue'
export default {
  components: { PayModal, AliPayModal, Qrcode },
  data() {
    return {
      phone: false,
      url: '',
      list: [],
      form: {},
      aliUrl: '',
      payType: 0,
      tableData: []
    }
  },
  mounted() {
    this.phone = JSON.parse(window.localStorage.getItem('phone'))
    this.getData()
  },
  methods: {
    getData() {
      this.$https('PRODUCT', {}).then(res => {
        this.list = res.data.productList
        this.payType = res.data.payType
        this.tableData = res.data.orderList
        window.localStorage.setItem('productList', JSON.stringify(res.data.productList))
        window.localStorage.setItem('orderList', JSON.stringify(res.data.orderList))
      })
    },
    handleClose() {
      this.getData()
    },
    AlipayType(data) {
      setTimeout(() => {
        const obj = JSON.parse(window.localStorage.getItem('type'))
        console.log(obj)
        if (obj.type == 'alipay') {
          this.$message.success('正在发起支付...')
          this.$https('ALIPAY', data).then(res => {
            if (res.status == 200) {
              document.write(res.data)
            } else {
              this.$message.warning(res.msg)
            }
          })
        } else {
          this.$message.success('正在发起支付...')
          this.$https('WEIPAY', data).then(res => {
            if (res.status == 200) {
              this.$refs.qrcode.open(res.data)
            } else {
              this.$message.warning(res.msg)
            }
          })
        }
      }, 1000)
    },
    payFun(data) {
      this.$message.success('正在发起支付...')
      this.$https('PAY', data).then(res => {
        if (res.status == 200) {
          this.url = res.data.url
          this.form = {
            money: `${res.data.money}`,
            name: res.data.name,
            notify_url: res.data.notifyUrl,
            out_trade_no: res.data.outTradeNo,
            pid: `${res.data.pid}`,
            type: res.data.type,
            sign: res.data.sign,
            sign_type: res.data.signType,
            return_url: res.data.returnUrl
          }
          console.log(this.form)
          // return
          setTimeout(() => {
            document.forms['paying'].submit()
          }, 500)
        } else {
          this.$message.warning(res.msg)
        }
      })
    },
    openPay(data, index) {
      this.$https('getType', {}).then(res => {
        if (data.type == 2 && res.data.type !== 2) {
          this.$alert('只有月卡用户可以购买加油包', '提示')
        } else {
          if (this.payType == 0) {
            this.$refs.showPay.open(data)
          } else {
            window.localStorage.removeItem('type')
            this.$refs.showAliPay.open(data, this.payType)
          }
        }
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
  // display: flex;
  // flex-flow: column;
  // align-items: center;
}
.product_box.pc {
  max-width: 1400px;
}
.product_box {
  background: #fff;
  max-width: 90vw;
  margin: 0 auto;
  .cards {
    position: relative;
    margin: 10px;
    height: 90px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .ceng {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 999;
    }
    .item.name {
      position: absolute;
      right: 0;
      top: -0;
      width: 150px;
      display: inline-block;
      text-align: center;
      color: #fff;
      border-radius: 0 0 0 5px;
    }
    .item.price {
      text-align: center;
      font-size: 24px;
      display: inline-block;
    }
    .item.wd {
      font-size: 13px;
      text-align: center;
      color: #999999;
      display: inline-block;
      margin-left: 20px;
    }
    .remark {
      font-size: 12px;
      text-align: center;
      position: absolute;
      bottom: 5px;
      left: 0;
      width: 100%;
    }
  }
}

.cardss {
  margin-bottom: 20px;
  .card_body {
    overflow: hidden;
    padding: 10px 5px;
    .items {
      display: flex;
      align-items: center;
      height: 24px;
      .label {
        color: #666666;
        width: 70px;
        text-align: justify;
        text-justify: distribute-all-lines;
        text-align-last: justify;
        font-size: 13px;
        -moz-text-align-last: justify;
        -webkit-text-align-last: justify;
      }
      .value {
        font-weight: 500;
        overflow: hidden;
        font-size: 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        width: calc(100% - 80px);
      }
    }
  }
}
.cards:last-child {
  margin-bottom: 0;
}
</style>