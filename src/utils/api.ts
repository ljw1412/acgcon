import axios, { AxiosRequestConfig, AxiosError, Method } from 'axios'

interface BetterAxiosError extends AxiosError {
  originalMessage: string
}

const ERROR_MESSAGE_MAP: Record<string, string> = {
  'Network Error': '网络错误'
}

export const instance = axios.create({
  baseURL: `${location.protocol}//${location.hostname}:7001/`,
  timeout: 60000,
  withCredentials: true,
  xsrfCookieName: 'csrfToken',
  xsrfHeaderName: 'X-CSRF-Token'
})

function betterError(error: BetterAxiosError) {
  // 保留旧报错消息
  error.originalMessage = error.message
  // 自定义处理报错
  if (error.response) {
    const { data } = error.response
    if (typeof data === 'string') {
      error.message = data
    } else if (typeof data === 'object' && data.message) {
      error.message = data.message
    }
  }
  if (ERROR_MESSAGE_MAP[error.message]) {
    error.message = ERROR_MESSAGE_MAP[error.message]
  }
}

function printError(error: BetterAxiosError) {
  console.groupCollapsed(
    `%c[${error.message}] ${error.config.url}`,
    'color: red; font-size: 14px'
  )
  if (process.env.NODE_ENV === 'development') console.log(error.config)
  console.error(error)
  console.groupEnd()
}

function request(method: Method) {
  return async function(
    url: string,
    data?: any,
    config: AxiosRequestConfig = {}
  ) {
    const baseConfig: AxiosRequestConfig = { method, url }

    if (data) {
      const useData = ['PUT', 'POST', 'PATCH'].includes(method.toUpperCase())
      baseConfig[useData ? 'data' : 'params'] = data
    }

    try {
      const response = await instance.request(Object.assign(baseConfig, config))
      return response.data
    } catch (error) {
      betterError(error)
      printError(error)
      return Promise.reject(error)
    }
  }
}

export const get = request('get')
export const put = request('put')
export const post = request('post')
export const del = request('delete')

export default { instance, get, put, post, del }
