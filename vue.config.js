module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      "/api": {//发请求路径中带有api，代理服务器开始工作找真实服务器要数据
        target: "http://gmall-h5-api.atguigu.cn/api/product/getBaseCategoryList",//target是要获取数据的那台服务器地址
      }
    }
  }
}