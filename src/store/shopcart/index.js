import { reqCartList, reqDeleteCart, reqUpdateCheckedById } from "@/api";

const state  = {
  cartList: [],
}
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  //获取购物车列表数据
  async getCartList({commit}) {
    let result = await reqCartList()
    if (result.code == 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  //删除购物车中的某一商品    发请求过去删除商品，不需要返回数据，所有也不需要写mutations、state
  async deleteCartListBySkuId({commit}, skuId) {
    let result = await reqDeleteCart(skuId)
    if (result.code == 200) {//删除成功
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //切换商品选中状态  不需要服务器返回数据
  async updateCheckedById({commit}, {skuId, isChecked}) {
    let result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //删除购物车全部勾选的商品
  deleteAllCheckedCart({dispatch, getters}) {
    //context: 小仓库  commit(提交mutations修改state)  getters(计算属性)  dispatch(派发action)  state(当前仓库数据)
    //获取购物车中全部的数据
    let PromiseAll = []
    getters.cartList.cartInfoList.forEach(item => {
      //如果全勾派发action调用deleteCartListBySkuId，还需要知道删的是第几个
      let result = item.isChecked == 1 ? dispatch('deleteCartListBySkuId', item.skuId) : ''
      PromiseAll.push(result)//将每次返回的Promise添加到数组
    })
    //只要全部的p1|p2|p3...都成功，返回结果即为成功; 有一个失败，返回结果即为失败
    return Promise.all(PromiseAll)
  },
  //切换全部商品选中状态
  updateAllCartisChecked({dispatch, state}, isChecked) {
    let PromiseAll = []
    state.cartList[0].cartInfoList.forEach(item => {
      let result = dispatch('updateCheckedById', {
        skuId: item.skuId,//是数组的第几个
        isChecked,// 1 or 0
      })
      PromiseAll.push(result)//将每次返回的Promise添加到数组
    })
    return Promise.all(PromiseAll)//都成功，返回成功; 有一个失败，返回失败
  },
}
const getters = {
  cartList(state) {
    return state.cartList[0] || {}//或{}，防止undefined
  },
  //计算出购物车数据
  // cartInfoList(state) {
  //   return 
  // }
}

export default {
  state,
  mutations,
  actions,
  getters,
}