<template>
  <mz-modal class="acg-login-modal"
    v-model="mVisible"
    title="登录"
    @open="state = 'loginName'"
    @closed="afterClose">
    <mz-state v-model="state">
      <template #loginName>
        <div class="acg-login-modal__login-name">
          <mz-input v-model="loginName"
            outlined
            label="用户名"
            key="loginName"></mz-input>
          <mz-button flat
            :ripple="false"
            color="primary"
            size="small">忘记了自己的用户名？</mz-button>
        </div>
      </template>

      <template #password>
        <div class="acg-login-modal__password">
          <div>{{loginName}}</div>
          <mz-input v-model="password"
            outlined
            type="password"
            label="密码"
            key="password"></mz-input>
        </div>
      </template>
    </mz-state>

    <template #footer>
      <mz-button flat
        color="primary"
        size="medium"
        @click="onNeutralButtonClick">{{config.neutral}}</mz-button>
      <mz-button color="primary"
        size="medium"
        @click="onPositiveButtonClick">{{config.positive}}</mz-button>
    </template>
  </mz-modal>
</template>

<script lang="ts">
import { Component, Vue, Prop, Model } from 'vue-property-decorator'

const footerButtons = {
  loginName: { neutral: '创建账号', positive: '下一步' },
  password: { neutral: '忘记密码', positive: '下一步' }
}

@Component
export default class AcgLoginModal extends Vue {
  @Model('input', { type: Boolean })
  readonly visible!: boolean
  @Prop({ type: Function, default: () => {} })
  readonly afterClose!: Function

  loginName = ''
  password = ''
  state: keyof typeof footerButtons = 'loginName'

  get mVisible() {
    return this.visible
  }

  set mVisible(val: boolean) {
    this.$emit('input', val)
  }

  get config() {
    return footerButtons[this.state]
  }

  onNeutralButtonClick() {}

  onPositiveButtonClick() {
    this.state = 'password'
  }
}
</script>

<style lang="scss">
.acg-login-modal {
  &__login-name,
  &__password {
    padding-top: 50px;
  }

  .mz-state {
    height: 200px;
  }

  .mz-button {
    font-weight: 500;
  }
  .mz-modal__footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>
