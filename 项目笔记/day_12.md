1. 交易页面完成(商品清单)
    动态展示服务器数据完成


2. 提交订单
    1）先把支付组件先做好
    2）点击提交订单按钮的时候，需要再向服务器发起一次请求[把支付的一些信息传递给服务器]


3. 获取支付信息[不在使用vuex]
    1. [在入口文件：main.js处]统一接口api文件夹里面全部请求函数、统一引入 `[import * as API from '@/api']`
    2. `[Vue.prototype.$API = API//挂载在Vue.prototype实例身上]`
    3. 在组件的方法里可以直接调用，不用再单个每次都要引入，如：`[import { reqSubmitOrder } from '@/api']`
    4. [不允许在生命周期函数上使用异步，加上async的操作，可以写成在methods写成一个方法，再调用]


4. elementUI使用 + 按需引入
    antd: PC端用的组件库，又分为Vue/React版本
    antd-mobile: 移动端组件库

    ElementUI：PC端组件库
    vant：vue移动端

  1）elementUI按需引入，配置文件发生变化，项目需要重启
    安装：npm i --save element-ui
    按需引入：npm install babel-plugin-component -D



5. 二维码生成 [qrcode]
    安装 npm i qrcode --save
    引入 import QRCode from 'qrcode'


6. 支付业务
    根据异步返回的成功失败


7. 个人中心
    强拆分为二级路由