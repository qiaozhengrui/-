//登录与注册合并的模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
//引入token进行本地存储//获取token
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
  code: '',
  token: getToken(),//方法在utils下的token.js
  info: {},
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  },
  USERINFO(state, info) {
    state.info = info
  },
  //清除本地存储
  CLEAR(state) {
    //把仓库中相关用户信息清空
    state.token = '',
    state.info = {},
    //本地存储数据清空
    removeToken()
  }
}
const actions = { //action里面不能操作state，提交mutation修改state
  //获取验证码
  async getCode({commit}, phone) {
    //获取验证码的接口，并把验证码返回。正常情况下，后台把验证码发到用户手机上，这么做为了省钱
    let result = await reqGetCode(phone)
    //正常获取验证码到这里就结束了，由后端发给用户

    //这里往下都是为了自己操作获取验证码
    if (result.code == 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //用户注册
  async userRegister({commit}, data) {
    let result = await reqUserRegister(data)
    //等待用户注册成功
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error(result.message))
    }
  },
  //用户登录
  async userLogin({commit}, data) {
    let result = await reqUserLogin(data)
    //服务器下发token，用户唯一标识符（uuid），将来经常通过token找服务器要用户信息进行展示
    console.log(result)
    if (result.code == 200) {
      //用户登录成功且获取到token
      commit('USERLOGIN', result.data.token)
      //进行持久存储token，因为token放在vuex中不会持久存储，刷新数据就没了
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  //校验获取用户信息【】       [带着用户的token向服务器要用户信息]
  async userInfo({commit}) {
    let result = await reqUserInfo()
    if (result.code == 200) {
      commit('USERINFO', result.data)
    }
  },
  //退出登录
  async userLogout({commit}) {
    let result = await reqLogout()
    //action里面不能操作state，提交mutation修改state
    if (result.code == 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('faile,错误'))
    }
  }
}
const getters = {

}

export default {
  state,
  mutations,
  actions,
  getters,
}