//统一管理项目接口的模块
//引入二次封装的axios（带有请求，响应的拦截器）
import requests from './request'
//引入二次封装好的mockAjax
import mockRequests from './mockAjax'
//三级联动接口
//接口：/api/product/getBaseCategoryList    get请求     无参数

//对外导出，别的模块要使用
export const reqCategoryList = () => {
  //发请求：axios发请求返回结果Promise对象
  return requests({
    url: "http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList",//要跳转的接口地址
    method: 'get',//发的是get请求
  })
}

//获取banner(Home首页轮播图接口)
export const reqGetBannerList = () => mockRequests.get('/banner')//因为baseURL: '/mock'，写好了，直接写mock即可

//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor')

//获取search(搜索)模块数据  地址：/api/list   请求方式：POST   参数：需要带参数

// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
//当前这个函数不需要接受外部传递参数，且当前接口给服务器传递参数params，至少是一个空对象
export const reqGetSearchInfo = (params) => requests({
  url: 'http://gmall-h5-api.atguigu.cn/api/list',
  method: 'post',
  data: params,
})

//获取商品详情信息的接口   URL：/api/item/{skuId}   请求方式：get   参数：需要带参数
export const reqGetGoodInfo = (skuId) => requests({
  url: `http://gmall-h5-api.atguigu.cn/api/item/${skuId}`,
  method: 'get',
})

//将商品添加进购物车中（获取更新某个产品的个数）
//获取 商品添加进购物车 数据   地址：/api/cart/addToCart/{skuId}/{skuNum}   请求方式：POST   参数：需要带参数(两个)
export const reqAddorUpdateShopCart = (skuId, skuNum) => requests({
  url: `http://gmall-h5-api.atguigu.cn/api/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post',
  // data: skuId, skuNum,
})

//获取购物车列表的数据接口   URL: /api/cart/cartList   请求方式：get  参数：无
export const reqCartList = () => requests({
  url: 'http://gmall-h5-api.atguigu.cn/api/cart/cartList',
  method: 'get',
})

//删除购物车商品数据接口  URL:/api/cart/deleteCart/{skuId}  请求方式：delete  参数：需要
export const reqDeleteCart = (skuId) => requests({
  url: `http://gmall-h5-api.atguigu.cn/api/cart/deleteCart/${skuId}`,
  method: 'delete',
})

//切换商品选中状态的接口  URL: /api/cart/checkCart/{skuID}/{isChecked}  method: get  parameter: require
export const reqUpdateCheckedById = (skuId, isChecked) => requests({
  url: `http://gmall-h5-api.atguigu.cn/api/cart/checkCart/${skuId}/${isChecked}`,
  method: 'get',
})




