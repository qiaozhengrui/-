import Vue from 'vue' 
import App from './App.vue'
//定义全局组件    
import TypeNav from '@/components/TypeNav'//三级联动全局组件
import Carousel from '@/components/Carousel'//轮播图全局组件
import Pagination from '@/components/Pagination'

//引入后要使用，第一个参数：全局组件的名字；第二个参数：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)

//引入路由
import router from '@/router'
//引入vuex
import store from './store'
//引入MockServe.js----mock数据，因为MockServe.js没有对外导出，需要至少执行一次
import '@/mock/mockServe'
//引入swiper样式，轮播。 因为三个地方用到轮播样式，所以放在入口文件一起用
import "swiper/css/swiper.css"

new Vue({
  render: h => h(App),
  //全局事件总线$bus的配置
  beforeCreate() {
    Vue.prototype.$bus = this//this是VM实例
  },
  //注册路由  底下的写法是key/value一致，省略value的写法【router是小写的】
  //注册路由信息：当这里书写router的时候，组件身上都拥有$route、$router属性
  router,
  //注册vuex：组件实例的身上会多出$store属性
  store,
}).$mount('#app')


