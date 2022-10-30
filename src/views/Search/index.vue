<template>
  <div>
    <!-- 商品分类三级列表 -->
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread：面包屑，带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">{{ searchParams.keyword }}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <!-- split切割为数组，用<:>切割，取数组的第一项下标 -->
            <li class="with-x" v-if="searchParams.trademark">{{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!-- 平台售卖属性值展示的面包屑 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index" >{{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector：Search的子组件-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" /> 

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 排序的价格结构 -->
              <ul class="sui-nav">
                <!-- 动态确定是综合|价格    需要传参来区分上来点的是综合or价格-->
                <li :class="{active: isOne}" @click="changOrder('1')">
                  <a>综合 <span v-show="isOne" class="iconfont" :class="{'icon-up': isAsc, 'icon-down': isDesc}"></span></a>
                </li>
                <li :class="{active: isTwo}" @click="changOrder('2')">
                  <a>价格 <span v-show="isTwo" class="iconfont" :class="{'icon-up': isAsc, 'icon-down': isDesc}"></span> </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品展示列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good, index) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 商品的图片：路由跳转的时候须带商品的id参数(id params) -->
                    <router-link :to=" `/detail/${good.id}` ">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <!-- 价格 -->
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{ good.title }}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- pageNo当前的页数、pageSize每页需展示多少条数据、total整个分页器共多少条数据、continues分页器连续页数
            自定义子传父事件getPageNo触发上一页功能 -->
          <Pagination :pageNo="searchParams.pageNo" 
          :pageSize="searchParams.pageSize" :total="total" :continues="5" 
          @getPageNo="getPageNo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'Search',
  data() {
    return {
      //带给服务器的参数是动态的
      searchParams: {
        //一二三级分类的id
        "category1Id": "",
        "category2Id": "",
        "category3Id": "",
        "categoryName": "",//分类的名字
        "keyword": "",//关键字。搜索框的输入内容
        "order": "1: desc",//排序 初始状态应是综合|降序
        "pageNo": 1,//分页器，表示当前第几页,默认首页
        "pageSize": 5,//表示每页展示的数据个数
        "props": [],//平台售卖属性操作带的参数
        "trademark": "",//品牌
      }
    }
  },
  components: {
    SearchSelector,
  },
  //组件挂载完毕之前执行一次，先于mounted之前
  created() {
    //在发请求之前，把接口需要传递的参数进行整理(在给服务器发请求之前，把参数这里好，服务器就会返回查询额数据)
    //复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    // this.searchParams.keyword = this.$route.params.keyword

    //合并写法：Object.assign。es6新增语法，合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
    // console.log(this.$route)
  },
  mounted() {//组件挂载完毕执行一次【仅仅执行一次】
    //在发请求之前传给服务器参数【searchParams参数发生变化有数值带给服务器】
    this.getDate()//先调用一次
  },
  computed: {
    //mapGetters的写法：传递的数组。因为getters计算没划分模块【home, search】
    ...mapGetters(['goodsList']),
    // 1是综合 2是价格   indexOf判断的'1'是否存在
    isOne() {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo() {
      return this.searchParams.order.indexOf('2') !== -1
    },
    //判断箭头向上还是向下   indexOf判断不等于asc就是升序箭头上
    isAsc() {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc() {
      return this.searchParams.order.indexOf('desc') !== -1
    },
    //获取search模块共展示多少数据
    ...mapState({
      total: state => state.search.searchList.total
    }),
  },
  methods: {
    //向服务器发请求获取search模块数据 (根据参数不同返回不同的数据进行展示)  
    //把这次请求封装为一个函数，因为函数可以多次调用，在需要调用的时候调用即可
    getDate() {
      // 接口返回的数据格式   至少带有个空对象
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    //删除分类的名字，带x的
    removeCategoryName() {
      //点x的时候，把带给服务器的参数置空或undefined
      //注：传给服务器参数说明可有可无的。如果属性值为空的字符串还是会把相应的字段传给服务器
      //    但字段如果是undefined，则不会带给服务器
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      //还应再发一次请求，展示默认的数据
      this.getDate()
      //地址栏也需要更改，通过路由跳转的方法(自己跳转自己)
      //需考虑: 路由跳转时有params参数也应携带跳转
      if (this.$route.params) {
        this.$router.push({name: 'search', params: this.$route.params})
      }
    },
    //删除关键字，keyword
    removeKeyword() {
      this.searchParams.keyword = ''
      //还应再发一次请求，展示默认的数据
      this.getDate()
      //需考虑: 路由跳转时有query参数也应携带跳转
      if (this.$route.query) {
        this.$router.push({name: 'search', query: this.$route.query})
      }
      //让兄弟组件Header清除关键字
      this.$bus.$emit('clear')
    },
    //子传父通信：自定义事件回调
    trademarkInfo(trademark) {
      //整理品牌字段的参数   格式："ID: 品牌名称"
      this.searchParams.trademark = `${trademark.tmId}: ${trademark.tmName}`
      //再次发请求获取search模块列表数据进行展示
      this.getDate()
    },
    //删除品牌的信息
    removeTradeMark() {
      //点x时，将品牌信息置空
      this.searchParams.trademark = ''
      //再次发请求
      this.getDate()
    },
    //收集平台属性的回调函数 (自定义事件)
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]
      //参数格式整理好
      let props = `${attr.attrId} : ${attrValue} : ${attr.attrName}`
      //数组去重，不然点击平台属性值的时候一直冒出
      //indexOf判断点击的平台属性值不存在才push，存在不push
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props)
      }
      //再次发请求
      this.getDate()
    },
    //删除平台售卖的属性  删除数组第几个值需要知道下标，要传参
    removeAttr(index) {
      //再次整理参数
      //通过splice方法删除数组里叉掉的元素返回修改后的数组，从指定的索引开始移除，只移除一个
      this.searchParams.props.splice(index, 1)
      //再次发请求
      this.getDate()
    },
    //综合|价格排序的操作    flag形参是一个标记，表示用户点击的是1综合 or 2价格(用户点击的时候传进来的)
    changOrder(flag) {
      // 拿到第一次order状态 1 or 2? desc or asc?
      let originOrder = this.searchParams.order
      // originFlag 1 or 2? | originSort desc or asc?
      let originFlag = this.searchParams.order.split(":")[0]
      let originSort = this.searchParams.order.split(":")[1]
      //准备一个新的order属性值
      let newOrder = ''
      //flag是用户点的，如果和originFlag(是1)相同，则点的是综合
      if(flag == originFlag) {
        //originSort判断传过来的是不是升序，是升序返回降序，否则(是降序)返回升序   取反
        newOrder = `${originFlag}:${originSort == "asc" ? "desc" : "asc" }`
      } else {//点的是价格
        //用户点击传进来的是2，默认就是desc降序
        newOrder = `${flag}:${"desc"}`
      }
      //将得到新的order属性值赋予searchParams下
      this.searchParams.order = newOrder
      //再次发请求
      this.getDate()
    },
    //自定义事情的回调，获取当前是第几页数
    getPageNo(pageNo) {
      //整理即将带给服务器的参数  把用户点击额当前页数赋给pageNo
      this.searchParams.pageNo = pageNo
      //再次发请求
      this.getDate()
    },
  },
  watch: {//监听组件身上的属性的属性值变化
    //监听路由的信息是否发生变化，发生变化则再次发起请求
    $route(newValue, oldValue) {
      //再次发请求之前整理合并带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params)
      //再次发起ajax请求
      this.getDate()
      this.searchParams.category1Id = ''
      this.searchParams.category2Id = ''
      this.searchParams.category3Id = ''
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 86px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              list-style: none;
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            list-style: none;
            height: 100%;
            width: 20%;
            margin-top: 12px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: -15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 50px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  // i {
                  //   // margin-left: -5px;
                  // }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  // box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;


        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;
            position: relative;
            // left: 50%;

            li {
              line-height: 18px;
              display: inline-block;
              left: -9%;
              position: relative;

              a {
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>