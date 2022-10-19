1. vue-cli脚手架初始化项目
      1. node + webpack + 淘宝镜像

      2. node_modules文件夹放的是：项目依赖文件夹

      3. public文件夹：放置一些静态资源（图片），
           注意：public文件夹中的静态资源，在webpack打包的时候，会原封不动的打包到dist文件夹

      4. src文件夹(程序员代码文件夹)
          1. assets文件夹：一般也是放置静态资源(一般放置多个组件共用的静态资源)
              注意：放置在assets文件夹里面的静态资源，在webpack打包的时候，webpack会把静态资源当做一个模板，打包JS文件里面
          2. components文件夹：一般放置的是非路由组件(全局组件)
          3. App.vue：唯一的跟组件，Vue当中的组件(.vue)
          4. main.js：程序入口文件，也是整个程序当中最先执行的文件

      5. babel.config.js：配置文件(babel相关)

      6. package.json：认为项目的身份证，记录项目叫做什么，项目当中有哪些依赖、项目怎么运行

      7. package-lock.json：缓存性文件

      8. README.md：说明性文件



2. 项目的配置
      1. 项目运行的时候，让浏览器自动打开  //加上open
      ---package.json
      "scripts": {
        "serve": "vue-cli-service serve --open",
        "build": "vue-cli-service build",
        "lint": "vue-cli-service lint"
      },

      2. eslint 校验功能关闭
      ---在根目录下，创建一个vue.config.js
      
      3. src文件夹简写方法，配置特别
      ---jsconfig.json配置别名【@】提示【@代表的是src文件夹，这样将来文件过多，找的时候方便】
        {
          "compilerOptions": {
            "baseUrl": "./",
            "paths": {
              "@/*": ["src/*"]
            }
          },
          "exclude": ["node_modules", "dist"]
        }




3. 项目路由的分析
      1. vue-router
        前端所谓路由：key/value键值对
        key：URL(地址栏中的路劲)
        value：相应的路由组件
      注意：项目上中下结构

      2. 路由组件
        Home首页路由组件、Search路由组件、login登录组件、Refister注册路由

      3. 非路由组件
        Header【首页、搜索页】
        Footer【在首页、搜索页】，但是在登录/注册/页面是没有




4. 完成非路由组件Header与Footer业务
    1. 在项目中，不在以HTML + CSS为主，主要写业务、逻辑
       在开发项目的时候
        1. 书写静态页面（HTML + CSS）
        2. 拆分组件
        3. 获取服务器的动态显示
        4. 完成相应的动态业务逻辑
      注意一：创建组件的时候，组件结构 + 组件样式 + 图片资源
      注意二：项目采用less样式，浏览器不识别less样式，需通过less、less-loader（@5版本号）进行处理less样式
             把less样式变为css样式，浏览器才可以识别
      注意三：如果想让组件识别less样式，需要在style标签身上加上 lang="less"

    2. 使用组件的步骤(非路由组件)
      -创建或者定义
      -引入
      -注册
      -使用




5. 路由组件的搭建
      vue-router
      在上面分析的时候，路由组件应该有四个：Home、Search、Login、Register
      -components文件夹：经常放置非路由组件(共用全局组件)
      -pages/views文件夹：经常放置路由组件

    1. 配置路由
      项目当中配置的路由一般放置在router文件夹中
    
    2. 总结
      路由组件与非路由组件的区别
      1. 路由组件一般放置在pages|views文件夹，非路由组件一般放置在components文件夹中
      2. 路由组件一般需要在router文件夹中进行注册(使用的即为组件的名字)，非路由组件在使用时，一般都是以标签的形式使用
      3. 注册完路由，不管路由组件还是非路由组件，身上都有$route、$router属性
        $route：一般获取路由信息【路劲、query、params等到】
        $router：一般进行编程式导航进行路由跳转【push、replace】

    3. 路由跳转
      路由跳转的方式有两种
      1. 声明式导航router-link，可以进行路由的跳转
      2. 编程式导航push、replace，可以进行路由跳转
      注意：
        编程式导航：声明式导航能做的，编程式导航都能做
        但是编程式导航除了可以路由跳转，还可以做一些其他的业务逻辑




6. Footer组件显示与隐藏
    1. 显示或者隐藏组件：v-if/v-show
      Footer组件：在Home、Search时显示Footer组件
      Footer组件：在登录、注册时隐藏的

    2. 可以根据组件身上的$route获取当前路由的信息，通过路由路径判断Footer显示与隐藏

    3. 配置路由的时候，可以给路由添加路由元信息【meta】，路由需配置对象，它的key不能乱写




7. 路由传参
    1. 路由跳转有几种方式
      如：A-B
      声明式导航：router-link(务必要有to属性)，可以实现路由的跳转
      编程式导航：利用的是组件实例的$router.push/replace方法，可以实现路由的跳转。(可以书写一些自己的业务)

    2. 路由传参的参数有几种写法
      params参数：属于路径当中的一部分，需注意，在配置路由的时候，需占位
      query参数：不属于路径当中的一部分，类似于ajax中的queryString  /home?k=v&kv=,不需要占位




8. 路由传参相关面试题
    1. 路由传递参数(对象写法)path是否可以结合params参数一起使用
      不行，path这种写法不能与params参数一起使用，但对象的写法可以是name、path形式
    2. 如何指定params参数可传可不传
      如：配置路由的时候，占位了(params参数)，但路由跳转时不传递
      路径会出现问题
      问题路径：http://localhost:8080/#/search?k=QWE       params参数是空，undefined
      正常路径：http://localhost:8080/#/search/qwe?k=QWE

    3. params参数可传可不传，如果传的是空字符串怎么解决
      用undefined解决

    4. 路由组件能否传递props数据
      可以，且有三种方法
        1. 布尔值写法
          props: true,

        2. 对象写法: 额外的给路由组件传递一些props
          props: {
            a: 1,
            b: 2,
          }

        3. 函数写法：可以把params、query参数，通过props传递给路由组件
          props: ($route) => ({
            keyword: $route.params.keyword,
            k: $route.query.k
          })
