//登录与注册合并的模块
import { reqGetCode, reqUserRegister, reqUserLogin } from '@/api'

const state = {
  code: '',
  token: '',
}
const mutations = {
  GETCODE(state, code) {
    state.code = code
  },
  USERLOGIN(state, token) {
    state.token = token
  }
}
const actions = {
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
    console.log(result.message)
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
      commit('USERLOGIN', result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
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