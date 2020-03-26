<template>
  <mz-modal class="acg-login-modal"
    v-model="mVisible"
    title="登录"
    @open="state = 'loginName'"
    @closed="afterClose">
    <mz-state v-model="state">
      <template #loginName>
        <div class="acg-login-modal__login-name">
          <mz-input v-model="loginName.value"
            label="用户名"
            outlined
            :error="!!loginName.error"
            :errorMessage="loginName.error"></mz-input>
          <mz-button flat
            :ripple="false"
            color="primary"
            size="small">忘记了自己的用户名？</mz-button>
        </div>
      </template>

      <template #password>
        <div class="acg-login-modal__password">
          <div>{{loginName.value}}</div>
          <mz-input v-model="password.value"
            label="密码"
            type="password"
            outlined
            :error="!!password.error"
            :errorMessage="password.error"></mz-input>
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
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'

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

  loginName = { value: '', error: '', label: '用户名' }
  password = { value: '', error: '', label: '密码' }
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

  reset() {
    Object.keys(footerButtons).forEach(key => {
      const data = this[key as keyof typeof footerButtons]
      Object.assign(data, { value: '', error: '' })
    })
  }

  onNeutralButtonClick() {}

  onPositiveButtonClick() {
    // this.state = 'password'
    const data = this[this.state]

    if (!data.value.trim()) {
      data.error = `请输入${data.label}`
      return
    }

    data.error = '用户名不存在'
  }

  @Watch('visible')
  onVisible(visible: boolean) {
    visible && this.reset()
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

  .mz-input__helper-line {
    height: 20px;
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
