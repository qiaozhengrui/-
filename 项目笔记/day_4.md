# 复习 
  1. 商品分类的三级列表由静态变为动态形式[获取服务器数据问题，解决跨域问题]
  2. 函数防抖与节流[面试频率高]
  3. 路由跳转：声明式导航[router-link]、编程式导航
    编程式导航解决这个问题：自定义属性


1. 开发Search模块中的TypeNav商品分类菜单(过渡动画效果)
    过度动画：前提条件、元素务必要有v-if|v-show指令才可以进行动画


2. 商品分类三级列表可以进行优化
    在APP根组件当中发请求【根组件mounted】执行一次


3. 合并params与query参数


4. 开发Home首页中的ListContainer[轮播图]组件和Floor[家用电器]组件
    注意：服务器返回的数据(接口)只有商品分类菜单分类数据，对于ListContainer和Floor组件数据服务器没有提供的

    mock[模拟]数据：如果需要mock数据，可以用到mockjs.
    mockjs发送的数据会被前端拦截，不到发到后端
    [mock]使用步骤：
      1. 在src目录下创建一个mock文件夹，提供模拟数据的。不会向服务器发请求
      2. 准备模拟的数据[JSON数据]，（mock文件夹中创建相应的JSON文件）
      3. 把mock数据需要的图片放置到public文件夹中【public文件夹在打包的时候，会把相应的资源原封不动打包到dist文件夹中】
      4. 创建mockServe.js，通过mockjs插件实现模拟数据
      5. mockServe.js文件在入口文件引入(至少需要执行一次，才能模拟数据)


5. ListContainer组件开发重点
    安装Swiper插件: 实现轮播图效果。安装Swiper@5
    npm i --save swiper@5