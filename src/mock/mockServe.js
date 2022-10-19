//用此文件模拟虚拟的数据

//先引入mockjs模块
import Mock from 'mockjs'
//引入JSON数据格式，[JSON数据格式没有对外暴露，但是可以引入]
//webpack默认对外暴露的：图片、JSON数据格式
import banner from './banner.json'
import floor from './floor.json'

//mock数据：第一个参数是请求地址   第二个参数：请求这个地址相应的数据
Mock.mock("/mock/banner", {
  code: 200,
  data: banner,
})//模拟首页大的轮播图的数据
Mock.mock("/mock/floor", {
  code: 200,
  data: floor,
})