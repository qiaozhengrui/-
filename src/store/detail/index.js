import { reqGetGoodInfo, reqAddorUpdateShopCart } from "@/api"

const state = {
  goodInfo: {}
}
const mutations = {
  GETGOODINFO(state, goodInfo) {
    state.goodInfo = goodInfo
  },
}
const actions = {
  //获取产品信息的actions
  async getGoodInfo({commit}, skuId) {
    let result = await reqGetGoodInfo(skuId)
    if (result.code == 200) {
      commit('GETGOODINFO', result.data)
    }
  },
  //获取商品信息的action, 两个参数
  async addorUpdateShopCart({commit}, {skuId, skuNum}){
    //加入购物车返回的解构
    //加入购物车后发请求，前台将参数带给服务器，服务器写入数据成功后，没返回其他数据，只返回code==200，表示这次操作成功
    //因为服务器没有返回其余数据，所以不需要在进行存储修改数据
    let result = await reqAddorUpdateShopCart(skuId, skuNum)
    if (result.code == 200) {//请求成功表示加入购物车成功
      return "ok"
    } else {//请求失败表示加入购物车失败。返回一个失败的promise
      return Promise.reject(new Error('faile'))
    }
  }
}
const getters = {//简化从仓库拿数据的繁琐程度
  //路径导航简化的数据
  categoryView(state) {
    //state.goodInfo初始状态空对象，空对象的categoryView属性值undefined, ||{}至少是个空对象，假的报错不会有
    return state.goodInfo.categoryView || {}
  },
  //商品信息的简化数据
  skuInfo(state) {
    return state.goodInfo.skuInfo || {}
  },
  //商品售卖属性的简化
  spuSaleAttrList(state) {
    return state.goodInfo.spuSaleAttrList || []
  },
}


export default {
  state,
  mutations,
  actions,
  getters,
}