<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派/事件委托  | 鼠标移出的时候 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画，需要transition标签包裹 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <!-- 事件委托 -->
            <div class="all-sort-list2" @click="goSearch">
              <!-- c1一级分类、菜单/遍历计算出来的categoryList数组 -->
              <!-- cur鼠标移上谁，谁才会有相应的类名叫cur -->
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId"
                :class="{ cur: currentIdx == index }" >
                <!-- 鼠标移入的时候 -->
                <h3 @mouseenter="changeIdx(index)">
                  <!-- 一级分类的名字要替换  :data开头的是自定义事件-->
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a>
                  <!-- 声明式导航写法出现卡顿 -->
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <!-- style判断鼠标移上是否显示二三级分类 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIdx == index ? 'block' : 'none' }"
                >
                  <!-- 二级分类 -->
                  <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId" >
                    <dl class="fore">
                      <dt>
                        <!-- 二级分类的名字要替换 -->
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a>
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <!-- 三级分类的名字要替换 -->
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">
                            {{ c3.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//引入lodash,把全部功能函数引入
// import _ from 'lodash'
//按需引入lodash
import throttle from "/node_modules/lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //存储用户鼠标移上哪个一级分类
      currentIdx: -1,
      show: true,
    };
  },
  methods: {
    //鼠标进入修改响应式数据currentIdx属性
    // changeIdx(index) {//es6写法
    //   //index：鼠标移上某个一级分类的元素索引值
    //   this.currentIdx = index
    // },
    changeIdx: throttle(function (index) {
      //节流 trottle回调函数别用箭头函数，可能出现上下文的this
      //index：鼠标移上某个一级分类的元素索引值
      //防抖节流问题
      //正常情况(慢慢操作)：鼠标进入，每个一级分类h3，都会触发鼠标进入事件
      //非正常情况(操作过快)：本身全部的一级分类都应触发鼠标进入事件，经过测试，只有部分h3触发了
      this.currentIdx = index;
    }, 50),
    //进行路由跳转的方法
    goSearch(e) {
      // 最好的解决方案：编程式导航+事件委托
      // 完全利用事情委托存在的问题：1.点击的一定是a标签吗 2.如何获取参数[1、2、3级分类的产品的名字、id]
      // 问题1：子节点中的a标签，加上自定义属性data-categoryName,其余的子节点是没有的
      let el = e.target;
      // 问题2(怎么拿到点击的节点，以及判断此节点是否是a标签)
      // 获取当前触发这个事件的节点[h3,a,dt,dl],需要带有data-categoryname这样节点[一定是a标签]
      // 节点有一个属性dataset属性，可以获取节点的自定义属性与属性值
      let { categoryname, category1id, category2id, category3id } = el.dataset;
      //如果此标签身上有categoryname一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = {name: 'search'}//往哪跳转
        let query = {categoryName: categoryname}//query参数
        //如何区分一二三级分类的a标签
        //如果此标签身上出现category1Id，...2Id，...3Id,则区分一二三级分类
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category1Id = category2id
        } else if (category3id) {
          query.category1Id = category3id
        }
        //判断：如果路由跳转的时候，带有params参数，也要传递过去
        if (this.$route.params) {
          location.params = this.$route.params
          //动态给location配置对象添加query属性
          location.query = query
          // 路由跳转
          this.$router.push(location)
        }
      }
    },
    //当鼠标移入的时候，让商品分类进行展示
    enterShow() {
      this.show = true
    },
    //一级分类鼠标移出的事情回调
    //当鼠标离开的时候，让商品分类进行隐藏
    leaveShow() {
      this.currentIdx = -1
      //判断如果是Search路由组件的时候才会执行
      if (this.$route.path != '/home') {
        this.show = false
      }
    },
  },
  //组件挂载完毕，可以向服务器发请求
  mounted() {
    //当组件挂载完毕，让show的属性变为false
    //如果不是Home组件，将typeNav隐藏
    if (this.$route.path != '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数，当使用这个计算属性的时候，右侧函数会立即执行一次
      //注入一个参数state，其实即为大仓库中的数据
      categoryList: (state) => {
        return state.home.categoryList;
      },
    }),
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251a;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 84px;
                  line-height: 22px;
                  text-align: left;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {  //鼠标移上事件
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background-color: skyblue;
        }
      }
    }
    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
    }
    //过渡动画结束状态(进入)
    .sort-enter-to {
      height: 461px;
    }
    //定义动画时间、速率
    .sort-enter-active {
      transition: all .5s linear
    }
  }
}
</style>
