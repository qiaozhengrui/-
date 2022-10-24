<template>
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <!-- 没有用户名信息==未登录，显示下方的p字段 -->
          <p v-if="!username">
            <span>请</span>
            <!-- 声明式导航要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <!-- 有用户信息==登录，显示下方字段 -->
          <p v-else>
            <a>{{ username }}</a>
            <a class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <a href="###">我的订单</a>
          <a href="###">我的购物车</a>
          <a href="###">我的尚品汇</a>
          <a href="###">尚品汇会员</a>
          <a href="###">企业采购</a>
          <a href="###">关注尚品汇</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <!-- 上方的v-model给表单元素双向绑定 -->
          <button class="sui-btn btn-xlarge btn-danger" type="button" @click="goSearch">
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      keyword: '',
    }
  },
  methods: {
    //搜索按钮的回调函数，需要向search
    goSearch() {
      //路由传递参数：
      //第一种：字符串形式
      // this.$router.push('/search/' + this.keyword + '?k=' + this.keyword.toUpperCase())

      //第二种：模板字符串
      // this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

      //第三种：对象的写法  name同样要在相应的路由组件起名
      // this.$router.push({
      //   name: 'search',
      //   params: {
      //     keyword: this.keyword
      //   },
      //   query: {
      //     k: this.keyword.toUpperCase()
      //   },
      // })

      /************************************************************************************** */
      //面试1. 路由传递参数(对象写法)path是否可以结合params参数一起使用？
      //答：不行，path这种写法不能与params参数一起使用，但对象的写法可以是name、path形式
      // this.$router.push({
      //   path: '/search',
      //   params: {
      //     keyword: this.keyword
      //   },
      //   query: {
      //     k: this.keyword.toUpperCase()
      //   }
      // })

      //面试2. 如何指定params参数可传可不传
      //如果路由要求传递params参数，如不传递，则URL会出问题
      //如何指定params参数是否可传递，在配置路由时，在占位的后面加上"?"(表示params参数可传可不传)
      // this.$router.push({
      //   name: 'search',
      //   params: {
      //     keyword: this.keyword
      //   },
      //   query: {
      //     k: this.keyword.toUpperCase()
      //   }
      // })

      //面试3. params参数可传可不传，如果传的是空字符串怎么解决
      //用undefined解决
      // this.$router.push({
      //   name: 'search',
      //   params: {
      //     keyword: '' || undefined
      //   },
      //   query: {
      //     k: this.keyword.toUpperCase()
      //   }
      // })

      //面试4. 路由组件能否传递props数据
      //可以的，有三种写法
      //1.布尔值写法
      //2.对象写法
      //3.函数写法
      
      //此处也要判断query参数是否存在,存在也要传递
      if (this.$route.query) {
        let loction = {
          name: 'search',
          params: {
            keyword: this.keyword || undefined
          }
        }
        loction.query = this.$route.query,
        this.$router.push(loction)
      }
    },
    //退出登录
    async logout() {
      //退出需要 1.需发请求，通知服务器退出登录【清除一些数据：token等】
      // 2. 清除项目中所有关于用户信息的的数据【userInfo、token等】
      try {
        //等待退出成功
        await this.$store.dispatch('userLogout')
        //回到首页
        this.$router.push('/home')
      } catch(error) {
        
      }
    }
  },
  mounted() {
    //通过全局事件总线清除关键字
    this.$bus.$on('clear', () => {
      this.keyword = ''
    })
  },
  computed: {
    //用户名信息
    username() {
      return this.$store.state.user.info.name
    }
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;
          margin-top: 0px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>