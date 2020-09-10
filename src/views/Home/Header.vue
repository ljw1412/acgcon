<template>
  <div class="acg-home-header d-flex justify-content-between align-items-center m-auto">
    <div class="title text-white clear-text">ACG控</div>
    <div class="user d-flex align-items-center">
      <div class="userinfo text-white clear-text">
        <div class="nickname fs-22 lh-29">{{nickname}}</div>
        <div class="level fs-14 lh-19 text-right">LV.1</div>
      </div>
      <acg-user-avatar class="flex-shrink-0 ml-8"
        :size="48"></acg-user-avatar>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

@Component
export default class AcgHomeHeader extends Vue {
  @(namespace('user').Getter)
  readonly nickname!: string
}
</script>

<style lang="scss">
.acg-home-header {
  padding-top: 64px;
  padding-bottom: 48px;

  .title {
    font-size: 40px;
    line-height: 48px;
  }

  .clear-text {
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.75);
  }
}
</style>
