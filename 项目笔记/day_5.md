# 复习：
  1. 完成商品分类的三级列表路由跳转一级路由传参(合并参数)
  2. 完成search模块中对于typeNav使用(过渡动画的)
  3. 对于typeNav请求次数也进行优化
  4. swiper插件
    经常制作轮播图(移动端、PC端都可以使用)
    使用步骤：
      1. 引入相应的依赖包(swiper.js||swiper.css)，至少有这两个文件
      2. 页面结构必须要有且要完整。没有的话不能操作DOM
      3. 初始化swiper实例，给轮播图添加动态效果
  5. mock数据，通过mockjs模块实现



1. 完美解决轮播图方案
    watch+nextTick：数据侦听，监听已有数据变化
    $nextTick：在下次DOM更新 循环结束之后 执行延迟回调，在 修改数据之后 立即使用这个方法，获取更新后的DOM
    $nextTick：可以保证页面中的结构一定是有的，经常和很多插件一起使用[都需要DOM存在]


2. 开发floor组件
    切记：仓库当中的state数据格式，不能乱写，数据格式取决于服务器返回的数据
    1. getFloorList的action在哪里触发？
        需要在Home路由组件当中发的，不能在Floor内部组件发action。因为需要v-for遍历floor组件，Home是父组件，Floor是子组件
    2. v-for也可以在自定义标签当中使用
    3. 组件通信的方式有哪些？面试高频题
      1）props：用于父子组件通信
      2）自定义事件：@on、@emit  可以实现子给父通信
      3）全局事件总线：$bus  全能
        pubsub-js：vue中几乎不用  react中用的  全能
      4）插槽
      5）vuex


3. 把首页当中轮播图拆分为一个共用全局组件
    注意：在开发项目中出现某一组件在很多地方使用，把它变成全局组件
      注册一次后可在任意地方使用，共用的组件、非路由组件放到components文件夹下


4. search模块的开发
    1）先写静态页面 + 静态组件拆分出来
    2）发请求(API)
    3）写仓库(vuex，三连环<state初始值、action异步或逻辑的地方、mutation修改state>)
    4）组件获取仓库数据，动态展示数据