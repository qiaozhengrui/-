<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(cart, index) in cartInfoList" :key="cart.id">
          <!-- 第一列 -->
          <li class="cart-list-con1">
            <!-- 初始==1，全勾 -->
            <input type="checkbox" name="chk_list" :checked="cart.isChecked == 1" 
            @change="updateChecked(cart, $event)">
            <!-- change触发的第一个参数：修改谁。  第二个：$event获取的是当前的checked，isChecked是0or1? -->
          </li>
          <li class="cart-list-con2">
            <!-- 购物车商品图片 -->
            <img :src="cart.imgUrl">
            <!-- 商品name -->
            <div class="item-msg">{{ cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <!-- 商品价格 -->
            <span class="price">{{ cart.skuPrice}}.00</span>
          </li>
          <li class="cart-list-con5">
            <!-- 购买的商品数量 -->
            <a href="javascript:void(0)" class="mins" @click="handler('minus', -1, cart)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="cart.skuNum" 
            @change="handler('change', $event.target.value * 1, cart)">
            <a href="javascript:void(0)" class="plus" @click="handler('add', 1, cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <!-- 购买的单一商品总价格 -->
            <span class="sum">{{ cart.skuPrice * cart.skuNum}}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <!-- 购物车商品全选被勾，且cartInfoList购物车商品大于0才能全选被勾 -->
        <input class="chooseAll" type="checkbox" :checked="isAllCheck && cartInfoList.length > 0" 
        @change="updateAllCartChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <!-- 所有的商品总价 -->
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
//引入lodash,把全部功能函数引入
// import _ from 'lodash'
//按需引入lodash
import throttle from "/node_modules/lodash/throttle";

  export default {
    name: 'ShopCart',
    mounted() {
      //防治将来获取购物车的数据，请求发多次
      this.getData()
    },
    methods: {
      getData() {
        //获取个人购物车数据
        this.$store.dispatch('getCartList')
      },
      //修改某个商品的个数，三个地方都触发同一个事件      向服务器发请求，修改数量
      //修改产品个数之前需要节流，防止点击过快,数量为0为负数
      handler: throttle(async function (type, disNum, cart) {
        //type: 为了区分这三个元素
        //disNum参数：+ 变化量(1)  - 变化量(-1)  input最终的个数(并不是变化量)
        //cart: 哪个产品(此产品身上有id)
        switch(type) {
          //加号
          case "add":
            disNum = 1
          break
          //减号
          case "minus":
            //判断商品的个数大于1，才可以传递给服务器-1  传给服务器的都是相差的数
            // if (cart.skuNum > 1) {
            //   disNum = -1
            // } else {//商品个数小于等于1，传给服务器0，就不让执行-1，原封不动
            //   disNum = 0
            // }
            //上方if判断简写三元表达式  
            disNum = cart.skuNum > 1 ? -1 : 0
          break
          case "change":
            //用户输入的是非法的(汉字负数等)，带给服务器数字为0，表示不减不加
            if (isNaN(disNum) || disNum < 1) {
              disNum = 0
            } else {//正常情况下会有小数   用户输入的数 - 购物车原本的数
              disNum = parseInt(disNum) - cart.skuNum
            }
          break
        }
        //派发action
        try {
          //await等待修改成功
          await this.$store.dispatch('addorUpdateShopCart', {
            skuId: cart.skuId,//是哪个商品的id在发请求
            skuNum: disNum,//变化的量
          })
          //再次获取服务器最新的数据进行展示
          this.getData()
        } catch(error) {

        }
      }, 400),
      //删除某个商品的操作
      async deleteCartById(cart) {
        try {
          //如果删除成功再次发请求获取新的数据进行展示
          await this.$store.dispatch('deleteCartListBySkuId', cart.skuId)
          this.getData()
        } catch(error) {
          alert(error.message)
        }
      },
      //切换商品选中状态的操作
      async updateChecked(cart, event) {
        //传给服务器的参数isChecked不是布尔值，应该是 0 or 1
        let checked = event.target.checked ? '1' : '0'
        try {
          //数据修改成功，再次获取服务器数据(购物车)进行展示
          await this.$store.dispatch('updateCheckedById', {
            skuId: cart.skuId,//切换的是第几个
            isChecked: checked,//1勾，0不勾
          })
          this.getData()
        } catch(error) {//失败则提示
          alert('error.message')
        }
      },
      //删除购物车全部商品的操作   这个回调没办法收集到有用的数据
      async deleteAllCheckedCart() {
        try {
          //派发action,等待成功
          await this.$store.dispatch('deleteAllCheckedCart')
          this.getData()//重新发请求拉取最新的数据渲染页面
        } catch(error) {//删失败给提示
          alert(error.message)
        }
      },
      //修改全部产品的选中状态
      async updateAllCartChecked(event) {
        //的checked为1是全勾，0全不勾
        let isChecked = event.target.checked ? '1' : '0'
        try {
          //派发actions 等待成功 
          await this.$store.dispatch('updateAllCartisChecked', isChecked)
          this.getData()//重新发请求渲染页面
        } catch(error) {//修改不了给提示
          console.log(error.message)
        }
      }
    },
    computed: {
      ...mapGetters(['cartList']),
      //这里才是要的购物车数据
      cartInfoList() {
        return this.cartList.cartInfoList || []
      },
      //计算所有商品的总价
      totalPrice() {
        let sum = 0
        this.cartInfoList.forEach(item => {
          sum += item.skuNum * item.skuPrice
        })
        return sum
      },
      //购物车产品是否全勾
      isAllCheck() {
        // every也是遍历数组，如果有一个不是判断要的是false, 所有判断正确是true
        return this.cartInfoList.every(item => item.isChecked == 1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
            list-style: none;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>