import Controllers from '@/controllers/index'

declare module 'vue/types/vue' {
  interface Vue {
    $acg: typeof Controllers
  }
}
