1. 编程式路由跳转到当前路由(参数不变)，多次执行会抛出NavigationDuplicated的警告错误
  --路由跳转有两种形式：声明式导航、编程式导航
  --声明式导航没有这类问题，因为vue-router底层已经处理好了
    1. 为何编程式导航进行路由跳转的时候，会有这种警告错误
          Avoided redundant navigation to current location//避免了到当前位置的冗余导航
      解决：通过给push方法传递相应的成功(resolve)、失败(reject)的回调函数，可以捕获当前的错误，可以解决
              this.$router.push({
                name: 'search',
                params: {
                  keyword: this.keyword
                },
                query: {
                  k: this.keyword.toUpperCase()
                }
              }, () => {

              }, (error) => {
                console.log(error)
              })
            但此种写法治标不治本，将来在别的组件当中push、replace，编程式导航还是有类似错误

    2. 问题
      1. this：当前组件实例是search
      2. this.$router属性：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，
         给组件实例添加$router、$route属性
      3. push：VueRouter类的一个实例

        function VueRouter() {

        }

        //原型对象的方法
        VueRouter.prototype.push = function() {
          //函数上下文为VueRouter类的一个实例
        }

        let $router = new VueRouter()

        $router.push(xxx)

        this.$router.push()



2. Home模块组件拆分
  --先把静态页面完成
  --拆分出静态组件
  --获取服务器的数据进行展示
  --动态业务



3. 三级联动组件完成
    由于三级联动，在Home、Search(搜索)、Detail(详情)，把三级联动注册为全局组件
    好处：注册为全局组件，只需要注册一次，就可以在项目任意地方使用



4. 完成其余静态组件
    HTML + CSS + 图片资源--------细心[结构，样式，图片资源]



5. POSTMAN测试接口
  --经过postman工具测试，接口是否有问题
  --如果服务器返回的数据code字段200，代表服务器返回数据成功
  --整个项目，接口前缀都有/api



6. axios二次封装
  --XMLHttpRequest
  --fetch
  --Jquery
  --axios

    1. 为什么需要对axios进行二次封装
      请求拦截器：可以在发请求之前处理一些业务
      响应拦截器：当服务器数据返回以后，可以处理一些事情

    2. 在项目当中经常出现API文件夹[axios]
      接口当中：路径都带有/api
      baseURL: '/api'

      http://xxx.xxx:8080/api

    3. axios可以参考git、npm关于axios的文档



7. 接口统一管理
    项目小(1-2个组件)：完全可在组件的生命周期函数中发请求
    项目大(几百个组件、几十个接口)：axios.get('xxx')

    1. 跨域问题
      什么是跨域：协议、域名、端口号不同请求，称为跨域
      http://localhost:8081/#/home -----前端项目本地服务器
      http://39.98.123.211         -----后台服务器

      传统的解决方案
        JSONP、CROS、代理



8. nprogress进度条的使用
    安装 npm i --save nprogress
    1. start：进度条开始
    2. done：进度条结束
    
    进度条颜色是可以修改的，需要修改样式



9. vuex状态管理
    1. vuex是什么
      是状态管理库，集中式管理项目中组件共用的数据
      小项目不需要vuex，大项目组件多，数据多，数据维护费劲，使用vuex

      state
      mutations
      getters
      actions
      modules

    2. 基本使用
      在src文件夹下新建store仓库

    3. vuex实现模块化开发
      若项目过大，组件过多，接口、数据过多，可以让Vuex实现模块式开发
      1. 模拟state存储数据
      {
        count: 1,
        search: {a: 1},
        detail: {sss},
        pay: {}
      }
      2. modules模块化开发
      {
        home: {},
        search: {},
      }



10. 三级分类
    看见样式大致能看出结构
    [
      {
        [
          '喜羊羊',
          {
            [],
          }
        ]，
      },
      {},
      {},
    ]
