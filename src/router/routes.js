//引用一级路由组件
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@pages/AddCartSuccess'

//路由配置信息对外暴露
export default [
  {
    name: 'AddCartSuccess',
    
  },
  {
    name: 'Home',
    path: '/home',
    component: Home,
    meta: {//需不需要带footer组件
      show: true,
    }
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      show: false,
    }
  },
  {
    name: 'register',
    path: '/register',
    component: Register,
    meta: {
      show: false,
    }
  },
  {
    name: 'search',
    path: '/search/:keyword?',//:keyword表示占位  ?表示params参数可传可不传
    component: Search,
    meta: {
      show: true,
    },
    
    //路由组件是否可传递props数据
    //1.布尔值写法
    // props: true,
    
    //2.对象写法: 额外的给路由组件传递一些props
    // props: {
      //   a: 1,
      //   b: 2,
      // }
      
      //3.函数写法：可以把params、query参数，通过props传递给路由组件
      props: ($route) => ({
        keyword: $route.params.keyword,
        k: $route.query.k
    })
  },
  {
    name: 'Detail',
    path: '/detail/:skuId?',
    component: Detail,
    meta: {
      show: true,
    }
  },
  {
    //重定向，在项目跑起来的时候，访问'/'立马会定向到首页
    path: '*',
    redirect: '/home',//重新定向到home路径
  },
]