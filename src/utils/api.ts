import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = `${location.protocol}//${location.hostname}:7001/`
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true

const createAxios = (config?: AxiosRequestConfig) => {
  const instance = axios.create(config)
  return instance
}

export default createAxios

export async function get(url: string, config?: AxiosRequestConfig) {
  try {
    const response = await createAxios().get(url, config)
    return response.data
  } catch (error) {
    throw error
  }
}

export function post(url: string, data?: any, config?: AxiosRequestConfig) {
  return createAxios().post(url, data, config)
}
