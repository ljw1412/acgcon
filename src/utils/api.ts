import axios, { AxiosRequestConfig } from 'axios'

axios.defaults.baseURL = `${location.protocol}//${location.hostname}:7001/`
axios.defaults.timeout = 20000
axios.defaults.withCredentials = true

const createAxios = (config?: AxiosRequestConfig) => {
  const instance = axios.create(config)
  return instance
}

export default createAxios
