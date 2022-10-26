<template>
  <div class="order-right">
    <div class="order-content">
      <div class="title">
        <h3>我的订单</h3>
      </div>
      <div class="chosetype">
        <table>
          <thead>
            <tr>
              <th width="29%">商品</th>
              <th width="31%">订单详情</th>
              <th width="13%">收货人</th>
              <th>金额</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>
      <div class="orders">

        <table class="order-item" v-for="(order, index) in myOrder.records" :key="order.id">
          <thead>
            <tr>
              <th colspan="5">
                <span class="ordertitle">
                  {{ order.createTime }} 　订单编号：{{ order.outTradeNo }} 
                  <span class="pull-right delete">
                    <img src="../images/delete.png">
                  </span>
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cart, index) in order.orderDetailList" :key="cart.id">
              <td width="60%">
                <div class="typographic">
                  <!-- 商品图片 -->
                  <img :src="cart.imgUrl" style="width: 90px; height: 100px;">
                  <!-- 商品名 -->
                  <a href="#" class="block-text">{{ cart.skuName }}</a>
                  <!-- 商品数量 -->
                  <span>x{{ cart.skuNum }}</span>
                  <a href="#" class="service">售后申请</a>
                </div>
              </td>
              <!-- 收货人姓名 -->
              <!-- 根据订单详情列表的长度来排版后面姓名，总金额，未支付等表格合并成为一个格子 同时只取第一个商品的这些信息所占的格子 -->
              <td :rowspan="order.orderDetailList.length" v-if="index == 0" width="8%" class="center">{{ order.consignee }}</td>
              <td :rowspan="order.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>总金额¥{{ order.totalAmount }}.00</li>
                  <li>在线支付</li>

                </ul>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index == 0" width="8%" class="center">
                <!-- 有无支付？ -->
                <a href="#" class="btn">{{ order.orderStatusName }}</a>
              </td>
              <td :rowspan="order.orderDetailList.length" v-if="index == 0" width="13%" class="center">
                <ul class="unstyled">
                  <li>
                    <a href="mycomment.html" target="_blank">评价|晒单</a>
                  </li>

                </ul>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
      <!-- 分页 -->
      <!-- pageNo当前的页数、pageSize每页需展示多少条数据、total整个分页器共多少条数据、continues分页器连续页数  自定义子传父事件getPageNo触发上一页功能-->
      <Pagination 
        :pageNo="page" 
        :pageSize="limit" 
        :total="myOrder.total" 
        :continues="5"
        @getPageNo="getPageNo" />
    </div>
    <!--猜你喜欢-->
    <div class="like">
      <h4 class="kt">猜你喜欢</h4>
      <ul class="like-list">
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike01.png" />
          </div>
          <div class="attr">
            <em>DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本</em>
          </div>
          <div class="price">
            <em>¥</em>
            <i>3699.00</i>
          </div>
          <div class="commit">已有6人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike02.png" />
          </div>
          <div class="attr">
            Apple苹果iPhone 6s/6s Plus 16G 64G 128G
          </div>
          <div class="price">
            <em>¥</em>
            <i>4388.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike03.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
        <li class="likeItem">
          <div class="p-img">
            <img src="../images/itemlike04.png" />
          </div>
          <div class="attr">DELL戴尔Ins 15MR-7528SS 15英寸 银色 笔记本
          </div>
          <div class="price">
            <em>¥</em>
            <i>4088.00</i>
          </div>
          <div class="commit">已有700人评价
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'myOrder',
  data() {
    return {
      //初始化参数
      page: 1,//初始为第一页
      limit: 3,//每页展示3个数据
      //存储我的订单的数据
      myOrder: {},
    }
  },
  mounted() {
    //获取我的订单数据方法
    this.getData()
  },
  methods: {
    //获取我的订单的方法
    async getData() {
      const { page, limit } = this
      let result = await this.$API.reqMyOrderList(page, limit)//带着参数发请求
      if (result.code == 200) {//成功则把data里的值赋给myOrder里
        this.myOrder = result.data
      }
    },
    //获取当前点击的是哪一页
    getPageNo(page) {
      //修改组件响应式数据page
      this.page = page
      //发请求重新渲染页面
      this.getData()
    }
  }
}
</script>

<style scoped>

</style>