<template>
  <mz-tooltip v-model="isDisplayDropdown"
    interactive
    arrow
    role="dropdown"
    theme="same"
    animation="shift-away"
    placement="bottom-end"
    class="acg-user-avatar"
    :disabled="!isLogined"
    :offset="[10, 10]"
    :hide-on-click="false">
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
    <div slot="content"
      style="width:180px;">
      <div v-if="innerInfo"
        style="text-align: center;padding: 10px 5px;">{{nickname}}</div>
      <mz-list clickable
        size="small"
        @item-click="onMenuClick">
        <mz-list-item title="个人中心"></mz-list-item>
        <mz-list-item title="消息"></mz-list-item>
        <mz-list-item title="登出"
          value="logout"></mz-list-item>
      </mz-list>
    </div>
  </mz-tooltip>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { namespace, State } from 'vuex-class'

@Component
export default class AcgUserDropdown extends Vue {
  @Prop({ type: Number, default: 36 })
  readonly size!: number
  @Prop(String)
  readonly radius!: string
  @Prop(Boolean)
  readonly innerInfo!: boolean

  @State
  readonly user!: Record<string, any>
  @(namespace('user').Getter('isLogined'))
  readonly isLogined!: boolean
  @(namespace('user').Getter)
  readonly nickname!: string
  @(namespace('user').Action)
  readonly logout!: Function

  isDisplayDropdown = false

  onMenuClick(action: string) {
    switch (action) {
      case 'logout':
        this.logout()
        break
    }
    this.isDisplayDropdown = false
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
