<template>
  <div>
    <Header></Header>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <!-- 在Home、Search路由下是显示的，在登录、注册或者其他路由下隐藏 -->
    <!-- <Footer v-show="$route.path == '/home' || $route.path == '/search'"></Footer> -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "",
  components: {
    Header,
    Footer,
  },
  mounted() {
    //派发一个action || 获取商品分类的三级列表数据, 考虑性能问题
    //通知vuex发请求，获取数据，存储于仓库当中
    this.$store.dispatch("categoryList");
  },
};
</script>

<style></style>
