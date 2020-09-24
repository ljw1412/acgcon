<template>
  <div class="acg-main">
    <acg-header :banner="config.banner"></acg-header>
    <navigation></navigation>
    <div class="acg-main-content m-auto pt-20">
      <router-view :name="currentRouteName"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import AcgVue from '@/mixins/AcgVue'
import Navigation from './Navigation.vue'
import { fetchBaseConfig } from '@/services/common'

@Component({ components: { Navigation } })
export default class AcgMain extends AcgVue {
  config = {}

  get currentRouteName() {
    return this.$route.name === 'SubHome' ? this.acgType : 'default'
  }

  async fetchConfig() {
    try {
      this.config = await fetchBaseConfig()
    } catch (error) {
      console.error('[Main]', '获取基础配置失败')
    }
  }

  created() {
    this.fetchConfig()
  }
}
</script>

<style lang="scss">
.acg-main-content {
  max-width: $screen-width-lg;
}
</style>
