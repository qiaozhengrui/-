//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'

//使用插件
Vue.use(VueRouter)
//引入store，
import store from '@/store'

import routes from './routes.js'

//1先把VueRouter原型对象的push，先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

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

//配置路由，对外暴露VueRouter类的实例
let router =  new VueRouter({
  //开始配置路由信息
  routes,
  //滚动行为   路由跳转时，滚动条的位置
  scrollBehavior(to, from, savedPosition) {
    // 始终滚动到顶部
    return { y: 0 } 
  },
})

//全局守卫：前置守卫(在路由跳转之前进行判断)
router.beforeEach(async (to, from, next) => {
  //to: 可以获取到将要跳转的那个路由信息
  //from: 可以获取到从哪个路由而来的信息【当前导航正要离开的路由】
  //next: 是个放行函数
  //1.next() 放行所有  2.next('path') 放行到指定路由                      3.next(false)中断当前的导航
  // next()
  //用户登录了有otken，未登录则没有
  let token = store.state.user.token
  //拿到用户名信息
  let name = store.state.user.info.name
  
  //用户登录
  if (token) {
    //想去login 重定向，回首页
    if (to.path == '/login') {
      next('/home')
      console.log(1)
    } else {
      //登录了去的不是login  【home|search|detail|register|shopcart】
      if (name) {//用户名信息已有，放行
        next()
      } else {
      //用户名信息没有    派发action，让仓库里有用户名信息再跳转
        try {
          //等待获取用户信息成功之后 放行
          await store.dispatch('userInfo')
          next()
        } catch(error) {
          //token过期失效，获取不到用户信息，重新登录
          //清除token成功
          await store.dispatch('userLogout')
          next('/login')
        }
      }
    }
  } else {
  //用户未登录【暂时没处理完毕，后期再继续处理】  先全放行
    next()
  }
})

//需要暴露出去
export default router