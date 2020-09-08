import axios, { AxiosRequestConfig, AxiosError } from 'axios'

interface BetterAxiosError extends AxiosError {
  originalMessage: string
}

const ERROR_MESSAGE_MAP: Record<string, string> = {
  'Network Error': '网络错误'
}

axios.defaults.baseURL = `${location.protocol}//${location.hostname}:7001/`
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true

const createAxios = (config?: AxiosRequestConfig) => {
  config = Object.assign(
    { xsrfCookieName: 'csrfToken', xsrfHeaderName: 'X-CSRF-Token' },
    config
  )
  const instance = axios.create(config)
  return instance
}

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

export async function get(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await createAxios().get(url, config)
    return response.data
  } catch (error) {
    betterError(error)
    printError(error)
    return Promise.reject(error)
  }
}

export async function post(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  try {
    const response = await createAxios().post(url, data, config)
    return response.data
  } catch (error) {
    betterError(error)
    printError(error)
    return Promise.reject(error)
  }
}

export async function del(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await createAxios().delete(url, config)
    return response.data
  } catch (error) {
    betterError(error)
    printError(error)
    return Promise.reject(error)
  }
}

export async function put(
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) {
  try {
    const response = await createAxios().put(url, data, config)
    return response.data
  } catch (error) {
    betterError(error)
    printError(error)
    return Promise.reject(error)
  }
}

export default createAxios
