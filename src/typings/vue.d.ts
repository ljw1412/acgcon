import {
  AxiosStatic,
  AxiosResponse,
  AxiosRequestConfig,
  AxiosInstance,
  AxiosPromise
} from 'axios'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic
    $get: (url: string, config?: AxiosRequestConfig) => any
    $post: (url: string, config?: AxiosRequestConfig) => any
    $getAcgLogger: (
      name: string
    ) => {
      log: (...args: any[]) => void
      error: (...args: any[]) => void
      warn: (...args: any[]) => void
    }
  }
}
