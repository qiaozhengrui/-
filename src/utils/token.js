//拿出来写，为了考虑工程化方便管理，同时可以在其他地方直接调方法进行复用


//存储token
export const setToken = (token) => {
  //将token存储在本地 因为token放在vuex中不会持久存储，刷新数据就没了
  localStorage.setItem('TOKEN', token)
}

//获取token
export const getToken = () => {
  //这种起始状态也相当于空字符串。但下次页面刷新时，就可以拿到已经在本地存储过的token(一次了)
  return localStorage.getItem('TOKEN')
}