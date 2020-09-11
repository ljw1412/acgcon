<template>
  <div class="admin-header d-flex justify-content-between align-items-center h-100 px-16">
    <div class="d-flex justify-content-between align-items-center">
      <mz-button v-tooltip.arrow="'返回主站'"
        icon
        circle
        size="large"
        class="mr-16">
        <mz-icon name="home-outline"
          size="22"
          @click="$router.push({ name: 'Home' })"></mz-icon>
      </mz-button>

      <span class="text-gray-900 fs-22">ACG控管理</span>
      <span v-text="title"></span>
    </div>
    <div class="d-flex justify-content-between align-items-center">
      <acg-user-avatar inner-info
        in-back-stage
        :size="44" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class AdminHeader extends Vue {
  @State readonly title!: string
}
</script>

<style lang="scss">
</style>
