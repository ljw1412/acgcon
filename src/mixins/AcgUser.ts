import { Component, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'

@Component
export default class StartHeader extends Vue {
  @State
  readonly user!: Record<string, any>
  @(namespace('user').Getter('isLogined'))
  readonly isLogined!: boolean
  @(namespace('user').Action)
  readonly logout!: Function

  get nickname() {
    return this.isLogined ? this.user.nickname : '未登录'
  }

  onUserClick() {
    if (!this.isLogined) {
      this.$acg.user.login.show()
    } else {
      this.logout()
    }
  }
}
