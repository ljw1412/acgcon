<template>
  <mz-dropdown-menu arrow
    placement="bottom-end"
    class="acg-user-avatar"
    width="180px"
    trigger="hover"
    :data="actionList"
    :disabled="!isLogined"
    :hide-on-click="false"
    @action="onMenuClick">
    <div class="acg-user-avatar__image"
      :style="{
        width: this.size + 'px',
        height: this.size + 'px',
        'border-radius': this.radius
      }"
      @click="onUserClick">
      <mz-image v-if="user.avatar"
        width="100%"
        height="100%"
        fit="cover"
        :src="user.avatar"></mz-image>
    </div>

    <template #header>
      <div v-if="isLogined && innerInfo"
        style="text-align: center;padding: 10px 5px;">{{nickname}}</div>
    </template>
  </mz-dropdown-menu>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace, State } from 'vuex-class'

@Component
export default class AcgUserDropdown extends Vue {
  @Prop({ type: Number, default: 36 })
  readonly size!: number
  @Prop({ type: String, default: '2px' })
  readonly radius!: string
  @Prop(Boolean)
  readonly innerInfo!: boolean
  @Prop(Boolean)
  readonly inBackStage!: boolean

  @State
  readonly user!: Record<string, any>
  @(namespace('user').Getter)
  readonly isLogined!: boolean
  @(namespace('user').Getter)
  readonly isAdmin!: boolean
  @(namespace('user').Getter)
  readonly nickname!: string
  @(namespace('user').Action)
  readonly logout!: Function

  isDisplayDropdown = false
  get actionList() {
    const list: Record<string, any> = [
      { title: '个人中心', value: 'personal' },
      { title: '消息', value: 'message' },
      { title: '登出', value: 'logout' }
    ]
    if (this.isAdmin && !this.inBackStage) {
      list.unshift({ title: '后台管理', value: 'management' })
    }

    return list
  }

  onMenuClick(action: string) {
    this.isDisplayDropdown = false
    this.$nextTick(() => {
      const resolve = this.$router.resolve.bind(this.$router)
      switch (action) {
        case 'logout':
          this.logout()
          if (this.inBackStage) this.$router.push({ name: 'home' })
          break
        case 'management':
          // this.$router.push({ name: 'admin' })
          const { href } = resolve({ name: 'admin' })
          window.open(href)
          break
      }
    })
  }
  onUserClick() {
    if (!this.isLogined) {
      this.$acg.user.login.show()
    }
  }
}
</script>

<style lang="scss">
.acg-user-avatar__image {
  overflow: hidden;
  background-color: #c8c8c8;
}
</style>
