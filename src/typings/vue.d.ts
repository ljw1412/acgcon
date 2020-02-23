import { AxiosStatic } from 'axios'

declare module 'vue/types/vue' {
  interface Vue {
    $axios: AxiosStatic
    $getACGLogger: (
      name: string
    ) => {
      log: (...args: any[]) => void
      error: (...args: any[]) => void
      warn: (...args: any[]) => void
    }
  }
}
