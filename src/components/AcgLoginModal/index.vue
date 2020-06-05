<template>
  <transition name="mz-fade">
    <div v-show="visible"
      class="acg-login-modal">
      <mz-mask :visible="true"
        :z-index="0"></mz-mask>

      <div class="acg-login-modal__body">
        <span class="acg-login-modal__title">登录</span>
        <mz-button class="acg-login-modal__close-btn"
          flat
          icon
          width="60px"
          height="60px"
          radius="0"
          text-color="#fff"
          @click="$emit('visible:change',false)">
          <mz-icon name="close"
            size="32"></mz-icon>
        </mz-button>

        <mz-state :value="state">
          <template #username>
            <login-field v-model="user.name"
              placeholder="请输入用户名或邮箱"
              :loading="loading"
              :max-length="12"
              :error="error"
              :disabled="user.name.length < 6"
              @entry="onEntry('username',$event)"
              @focus="error = ''">
            </login-field>
          </template>
          <template #password>
            <login-field v-model="user.password"
              type="password"
              placeholder="请输入密码"
              :loading="loading"
              :error="error"
              :disabled="user.name.length < 6"
              @entry="onEntry('password',$event)"
              @focus="error = ''">
              <div slot="top"
                class="user-base">
                <div class="user-base__avatar">头像</div>
                <div class="user-base__username">{{user.name}}</div>
              </div>
            </login-field>
          </template>
          <template #success></template>
        </mz-state>
      </div>
    </div>
  </transition>

</template>

<script lang="ts">
import { Component, Vue, Model, Watch } from 'vue-property-decorator'
import LoginField from './LoginField.vue'

@Component({ components: { LoginField } })
export default class AcgLoginModal extends Vue {
  @Model('visible:change', Boolean)
  readonly visible!: boolean

  user = { name: '', password: '', avatar: '' }
  loading = false
  error = ''
  state = ''

  onEntry(type: string, value: string) {
    this.error = ''
    this.loading = true
    if (type === 'username') {
      this.fetchUsernameExists()
    } else if (type === 'password') {
      this.fetchLogin()
    }
  }

  async fetchUsernameExists() {
    try {
      const res = await this.$get('user/exists', {
        params: { loginName: this.user.name }
      })
      this.user.avatar = res.avatar || ''
      this.state = 'password'
      this.loading = false
    } catch (error) {
      this.error = error.data.message
      this.loading = false
    }
  }

  async fetchLogin() {
    try {
      const res = await this.$post('user/login', {
        loginName: this.user.name,
        password: this.user.password
      })
      this.state = 'success'
      this.$acg.user.set(res)
      this.loading = false
    } catch (error) {
      this.error = error.data.message
      this.loading = false
    }
  }

  @Watch('visible')
  onVisibleChange(visible: boolean) {
    if (visible) {
      this.state = 'username'
      this.user.password = ''
    } else {
      this.$emit('hide')
    }
  }
}
</script>

<style lang="scss">
.acg-login-modal {
  position: fixed;
  z-index: 10000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &__body {
    position: relative;
    z-index: 100;
    width: 100%;
    height: 100%;
  }

  &__title {
    font-size: 32px;
    line-height: 60px;
    padding-left: 20px;
    color: #fff;
    user-select: none;
  }

  &__close-btn {
    position: absolute;
    top: 0;
    right: 0;
  }

  .user-base {
    // position: absolute;
    // top: 0;
    // left: 0;
    width: 100%;
    // transform: translateY(-100%);
    color: #ffffff;
    &__avatar {
      width: 140px;
      height: 140px;
      margin: auto;
      border: 1px solid #fff;
      box-sizing: border-box;
    }
    &__username {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      line-height: 60px;
    }
  }
}
</style>
