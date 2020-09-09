import { get, post, del, put } from '@/utils/api'

const API = {
  WHO_AM_I: 'user/whoami',
  EXISTS: 'user/exists',
  LOGIN: 'user/login',
  LOGOUT: 'user/logout'
}

// 获取当前用户身份
export function whoami() {
  return get(API.WHO_AM_I)
}

// 查看用户名或邮箱是否存在
export function exists(loginName: string) {
  return get(API.EXISTS, { loginName })
}

// 登录
export function login(loginName: string, password: string) {
  return post(API.LOGIN, { loginName, password })
}

// 登出
export function logout() {
  return post(API.LOGOUT)
}
