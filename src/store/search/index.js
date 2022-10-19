import { reqGetSearchInfo } from "@/api"

//search模块的仓库
const state = {
  searchList: {},
}
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList
  }
}
const actions = {
  //获取search模块数据
  async getSearchList({ commit }, params={}) {//第二个参数载荷
    //当前reqGetSearchInfo这个函数在调用获取服务器数据的时候，至少传递一个参数(空对象)
    //params形参，是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
    let result = await reqGetSearchInfo(params)
    if (result.code == 200) {
      commit('GETSEARCHLIST', result.data)
    }
  }
}
//类似于computed计算属性，用现有数据得到推导出来的信息，state推导出的信息都放这里
//项目中getters主要作用是：简化仓库中的数据【简化数据而生】
//可把组件中需要的数据进行简化【将来组件在获取数据的时候就很方便】
const getters = {
  goodsList(state) {
    //这么写服务器数据回来没问题
    //若网络不给力或无网络，state.searchList.goodsList返回的是一个undefined。计算新属性的值至少有个数组
    return state.searchList.goodsList || []
  },
  trademarkList(state) {
    return state.searchList.trademarkList || []
  },
  attrsList(state) {
    return state.searchList.attrsList || []
  },
}

//对外导出
export default {
  state,
  mutations,
  actions,
  getters,
}