<template>
  <div class="start-header">
    <div class="start-header__left">
      <div class="start-header__logo">ACG控</div>
    </div>
    <div class="start-header__right">
      <div class="start-header__user">
        <div>
          <div class="start-header__username">{{nickname}}</div>
          <div class="start-header__userinfo">
            <span class="start-header__user-level">LV.1</span>
          </div>
        </div>
        <acg-user-avatar class="start-header__avatar"
          :size="48" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, namespace } from 'vuex-class'
import AcgUserAvatar from '@/components/AcgUserAvatar/index.vue'

@Component({ components: { AcgUserAvatar } })
export default class StartHeader extends Vue {
  @State
  readonly user!: Record<string, any>
  @(namespace('user').Getter)
  readonly nickname!: string
}
</script>

<style lang="scss">
.start-header {
  display: flex;
  user-select: none;
  height: 48px;
  padding: 64px 0 48px 0;
  color: #ffffff;
  &__left,
  &__right {
    width: 50%;
  }
  &__right {
    text-align: right;
  }
  &__logo {
    font-size: 40px;
    height: 100%;
    line-height: 48px;
  }
  &__user {
    display: inline-flex;
  }
  &__username {
    font-size: 22px;
    line-height: 29px;
  }
  &__userinfo {
    font-size: 14px;
    line-height: 19px;
  }
  &__avatar {
    flex-shrink: 0;
    margin-left: 8px;
  }
}
</style>