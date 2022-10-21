import { v4 as uuidv4 } from 'uuid'
//生成随机的一个字符串(uuidv4)，且每次执行不在变化，游客身份持久存储
export const getUUID = () => {
  //先看本地存储有无uuid(看下本地是否存储)
  let uuid_token = localStorage.getItem('UUIDTOKEN')
  //没存就生成uuid存储
  if (!uuid_token) {
    uuid_token = uuidv4()
    //且本地存储一次
    localStorage.setItem('UUIDTOKEN', uuid_token)
  }
  //需要返回，没有返回值是undefined
  return uuid_token
}