import { AxiosStatic, AxiosRequestConfig } from 'axios'
import Controllers from '@/controllers/index'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic
    $get: (url: string, config?: AxiosRequestConfig) => any
    $post: (url: string, data?: any, config?: AxiosRequestConfig) => any
    $del: (url: string, config?: AxiosRequestConfig) => any
    $getAcgLogger: (
      name: string
    ) => {
      log: (...args: any[]) => void
      error: (...args: any[]) => void
      warn: (...args: any[]) => void
    }
    $acg: typeof Controllers
  }
}
