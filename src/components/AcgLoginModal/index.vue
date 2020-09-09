<template>
  <transition name="mz-fade">
    <div v-show="visible"
      class="acg-login-modal">
      <mz-mask :visible="true"
        :z-index="0"></mz-mask>

      <div class="acg-login-modal__body">
        <template v-if="state !== 'success'">
          <span class="acg-login-modal__title">登录</span>
          <mz-button class="acg-login-modal__close-btn"
            icon
            width="60px"
            height="60px"
            radius="0"
            text-color="#fff"
            @click="$emit('visible:change',false)">
            <mz-icon name="close"
              size="32"></mz-icon>
          </mz-button>
        </template>

        <mz-state :value="state">
          <template #username>
            <login-field v-model="user.name"
              ref="usernameField"
              placeholder="请输入用户名或邮箱"
              :loading="loading"
              :max-length="12"
              :error="error"
              :disabled="user.name.length < 6"
              @entry="onEntry('username',$event)"
              @change="error = ''">
            </login-field>
          </template>
          <template #password>
            <login-field v-model="user.password"
              ref="passwordField"
              type="password"
              placeholder="请输入密码"
              :loading="loading"
              :error="error"
              :disabled="user.password.length < 6"
              @entry="onEntry('password',$event)"
              @change="error = ''">
              <div slot="top"
                class="user-base">
                <div class="user-base__avatar">
                  <mz-image v-if="user.avatar"
                    width="100%"
                    height="100%"
                    fit="cover"
                    :src="user.avatar"></mz-image>
                </div>
                <div class="user-base__username">
                  <input readonly
                    class="hidden-input"
                    :value="user.name" />
                  <span>{{user.name}}</span>
                </div>
              </div>
            </login-field>
          </template>
          <template #success>
            <div class="login-success">
              <user-card animation
                :user="finalUser"></user-card>
              <div style="text-align: right;">
                <mz-button size="large"
                  width="100px"
                  height="40px"
                  text-color="#fff"
                  @click="$emit('visible:change',false)">进入</mz-button>
              </div>
            </div>
          </template>
        </mz-state>
      </div>
    </div>
  </transition>

</template>

<script lang="ts">
import { Component, Vue, Model, Watch } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import LoginField from './LoginField.vue'
import UserCard from './UserCard.vue'
import { exists, login } from '@/services/user'

@Component({ components: { LoginField, UserCard } })
export default class AcgLoginModal extends Vue {
  @Model('visible:change', Boolean)
  readonly visible!: boolean
  @(namespace('user').Action)
  readonly fetchCurrentUser!: Function

  user: Record<string, string> = { name: '', password: '', avatar: '' }
  finalUser = {}
  loading = false
  error = ''
  state = ''

  clearUser() {
    for (const key in this.user) {
      this.user[key] = ''
    }
  }

  fieldFocus(name: string) {
    this.$nextTick(() => {
      const field = this.$refs[name] as LoginField
      field && field.focus()
    })
  }

  setFieldError(error: string) {
    this.error = error
    this.loading = false
    this.fieldFocus(this.state + 'Field')
  }

  onEntry(type: string) {
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
      const res = await exists(this.user.name)
      this.user.avatar = res.avatar || ''
      this.state = 'password'
      this.loading = false
    } catch (error) {
      this.setFieldError(error.message)
    }
  }

  async fetchLogin() {
    try {
      const res = await login(this.user.name, this.user.password)

      this.state = 'success'
      this.finalUser = res
      this.loading = false
      this.fetchCurrentUser(res)
    } catch (error) {
      this.setFieldError(error.message)
    }
  }

  @Watch('visible')
  onVisibleChange(visible: boolean) {
    if (visible) {
      this.clearUser()
      this.state = 'username'
    } else {
      this.state = ''
      this.$emit('hide')
    }
  }

  @Watch('state')
  onStateChange(state: string) {
    if (['username', 'password'].includes(state)) {
      this.fieldFocus(state + 'Field')
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
  backdrop-filter: blur(5px);

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
    width: 100%;
    color: #ffffff;
    user-select: none;
    &__avatar {
      width: 140px;
      height: 140px;
      margin: auto;
      box-sizing: border-box;
    }
    &__username {
      text-align: center;
      font-size: 24px;
      font-weight: 500;
      line-height: 60px;
      text-shadow: 1px 1px 2px rgba($color: #000000, $alpha: 0.75);
    }
  }

  .login-success {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>
