//是向模拟的mock二次封装
import axios from 'axios'

//引入进度条
import nprogress from 'nprogress'
//还得引入进度条样式
import 'nprogress/nprogress.css'
//start方法：进度条开始   done：进度条结束

//1.利用axios对象的方法create去创建一个axios实例
//2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  //配置对象
  //基础路径，发请求的时候，路径会自动出现api，不用手写
  baseURL: '/mock',//baseURL表示基于那个路径
  //代表请求超时的时间5s
  timeout: 5000,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，所以可以在请求发出之前做一些事情
requests.interceptors.request.use((config) => {
  //config：配置对象，对象里有个重要的属性，headers请求头
  //请求拦截器捕获到请求的时候，进度条开始变动
  nprogress.start()
  return config
})

//响应拦截器
requests.interceptors.response.use((res) => {
  //成功的回调：服务器响应数据回来后，响应拦截器可以检测到，可以做一些事
  //服务器返回数据成功，拿到数据后，进度条结束
  nprogress.done()
  return res.data
}, (error) => {
  //响应失败的回调函数：打印一些错误的信息，或者终止promise链都行
  return Promise.reject(new Error('faile'))
})

//对外导出
export default requests