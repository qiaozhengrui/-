//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)

import routes from './routes.js'

//1先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// console.log(originReplace)

//2重写push、replace
//第一个参数：告诉原来push方法，往哪里跳转(传递哪些参数)
//第二、三参数：传成功或失败
VueRouter.prototype.push = function(location, resolve, reject) {
  if (resolve && reject) {
    //调用原来的push方法,不能直接调，要加call
    //call、apply区别
    //相同点：都可以调用函数一次，都可以篡改函数的上下文一次
    //不同点：call和apply传递参数，call传递参数用","隔开，apply方法执行，传递数组
    //this是VueRouter的实例，location往哪里跳转，成功(resolve)失败(reject)的回调
    originPush.call(this, location, resolve, reject)
  } else {//后面两个成功、失败
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function(location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

//配置路由，需要暴露出去
export default new VueRouter({
  //开始配置路由信息
  routes,
  //滚动行为   路由跳转时，滚动条的位置
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 } 
  },
})