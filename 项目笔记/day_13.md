1. 个人中心的完成
    用了封装过的分页器

2. 全局守卫
    未登录访问, 交易相关(trade), 支付相关(pay,paysuccess), 用户中心(center)相关跳转到登录页面


3. 组件独享守卫
    1)只有从购物车界面才能跳转到交易页面(创建订单)
    2)只有从交易页面(创建订单)才能跳转到支付页面
    3)只有从支付页面才能跳转到支付成功页面


4. 图片懒加载
    地址：https://www.npmjs.com/package/vue-lazyload
    安装：npm i vue-lazyload@1.3.3
    引入懒加载插件：import VueLazyload from 'vue-lazyload'
    注册懒加载：Vue.use(VueLazyload)
        注意：[可配置对象]  Vue.use(VueLazyload, {
                            preLoad: 1.3,
                            error: errorimage,
                            loading: loadimage,//懒加载默认的图片
                            attempt: 1
                          })
    拓展：自定义插件


5. vee-validata 基本使用 [基本不用，用elementui进行表单验证]
    1)安装与引入

    2)提示信息

    3)基本使用


6. 路由懒加载
    


7. 打包上线
    1) 打包
        npm run build
      注意：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错
        有了[map文件]后，就可以像未加密的代码一样，准确输出哪行报错
        该文件项目不需要可删除
        可以[手动删]也可[配置删除]
        配置删除：在vue.config.js下
                [productionSourceMap:false]
    2) 购买云服务器
    3) 安全组设置
        让服务器的一些端口号打开
    4) xshell链接服务器与linux指令
        cd /[根目录]   mkdir 创建文件夹   pwd绝对路径
    5) nginx反向代理
        yum i nginx[etc]