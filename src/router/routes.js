
//路由配置信息对外暴露
export default [
  {
    name: 'Home',
    path: '/home',
    //路由懒加载的写法，当此路由被访问时，箭头函数调用一次，再加载对应组件，这样高效
    component: () => import('@/views/Home'),
    meta: {//需不需要带footer组件
      show: true,
    }
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      show: false,
    }
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('@/views/Register'),
    meta: {
      show: false,
    }
  },
  {
    name: 'search',
    path: '/search/:keyword?',//:keyword表示占位  ?表示params参数可传可不传
    component: () => import('@/views/Search'),
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
    component: () => import('@/views/Detail'),
    meta: {
      show: true,
    }
  },
  {
    name: 'AddCartSuccess',
    path: '/addcartsuccess',
    component: () => import('@/views/AddCartSuccess'),
    meta: {
      show: true,
    }
  },
  {//购物车路由
    name: 'ShopCart',
    path: '/shopcart',
    component: () => import('@/views/ShopCart'),
    meta: {//带有footer组件
      show: true,
    }
  },
  {//交易路由
    name: 'Trade',
    path: '/trade',
    component: () => import('@/views/Trade'),
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //去交易页面，从购物车路由而来，放行
      if (from.path == '/shopcart') {
        next()
      } else {
        //从别的路由而来，中断当前的导航，停留在当前路由
        next(false)
      }
    }
  },
  {//支付路由
    name: 'Pay',
    path: '/pay',
    component: () => import('@/views/Pay'),
    meta: {
      show: true,
    },
    //路由独享守卫
    beforeEnter: (to, from, next) => {
      //从trade来，放行
      if (from.path == '/trade') {
        next()
      } else {
        //别的不放行，停留在当前路由
        next(false)
      }
    }
  },
  {//支付成功路由
    name: 'PaySuccess',
    path: '/paysuccess',
    component: () => import('@/views/PaySuccess'),
  },
  {//个人中心路由
    name: 'Center',
    path: '/center',
    component: () => import('@/views/Center'),
    meta: {
      show: true,
    },
    children: [//二级路由
      {
        name: 'groupOrder',
        path: 'grouporder',//注意不要再加 / 加了就是一级路由
        component: () => import('@/views/Center/groupOrder'),
      },
      {
        name: 'myOrder',
        path: 'myorder',
        component: () => import('@/views/Center/myOrder'),
        meta: {
          show: true,
        },
      },
      {
        //重定向，进入个人中心先展示我的订单订单路由页面
        path: '/center',
        redirect: '/center/myorder'
      }
    ]
  },
  {
    //重定向，在项目跑起来的时候，访问'/'立马会定向到首页
    path: '*',
    redirect: '/home',//重新定向到home路径
  },
]